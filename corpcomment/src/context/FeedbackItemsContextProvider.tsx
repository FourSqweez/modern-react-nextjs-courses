import { createContext, useEffect, useMemo, useState } from "react"
import { TFeedbackItem } from "../lib/types"

type TFeedbackItemsContext = {
  feedbackItems: TFeedbackItem[]
  isLoading: boolean
  errorMessage: string
  companyList: string[]
  filteredFeedbackItems: TFeedbackItem[]
  handleAddToList: (text: string) => void
  handleSelectCompany: (company: string) => void
}

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode
}

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
)

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("")

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index
        }),
    [feedbackItems]
  )

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === selectedCompany
          )
        : feedbackItems,
    [feedbackItems, selectedCompany]
  )

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1)

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    }

    // Optimistic UI
    //display the data from state first and then display data from server later
    setFeedbackItems([...feedbackItems, newItem])

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
  }

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company)
  }

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        )

        if (!response.ok) {
          throw new Error()
        }

        const data = await response.json()
        setFeedbackItems(data.feedbacks)
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again later.")
      }
      setIsLoading(false)
    }

    fetchFeedbackItems()
  }, [])

  return (
    <FeedbackItemsContext.Provider
      value={{
        feedbackItems,
        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        filteredFeedbackItems,
        handleSelectCompany,
      }}>
      {children}
    </FeedbackItemsContext.Provider>
  )
}
