import { useEffect, useState } from "react"
import { TFeedbackItem } from "../lib/types"
import Container from "./Container"
import Footer from "./Footer"
import HashtagList from "./HashtagList"

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

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
    <div className="app">
      <Footer />

      <Container
        isLoading={isLoading}
        errorMessage={errorMessage}
        feedbackItems={feedbackItems}
        handleAddToList={handleAddToList}
      />

      <HashtagList />
    </div>
  )
}

export default App
