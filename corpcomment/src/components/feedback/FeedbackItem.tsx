import { TriangleUpIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { TFeedbackItem } from "../../lib/types"

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem
}

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount)

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUpvoteCount((prev) => ++prev)
    e.stopPropagation()
  }

  return (
    <li
      onClick={() => setOpen((prev) => !prev)}
      className={`feedback ${open ? "feedback--expand" : ""}`}>
      <button onClick={(e) => handleUpvote(e)}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>

      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>
      <p>{feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  )
}
