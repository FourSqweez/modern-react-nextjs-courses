import { TFeedbackItem } from "../lib/types"
import ErrorMessage from "./ErrorMessage"
import FeedbackItem from "./FeedbackItem"
import Spinner from "./Spinner"

type FeedbackListProps = {
  isLoading: boolean
  errorMessage: string
  feedbackItems: TFeedbackItem[]
}

export default function FeedbackList({
  isLoading,
  errorMessage,
  feedbackItems,
}: FeedbackListProps) {
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  )
}
