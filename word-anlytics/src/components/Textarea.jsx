import { useState } from "react"
import Warning from "./Warning"

export default function Textarea() {
  const [text, setText] = useState("")
  const [showWarning, setShowWarning] = useState(false)

  const handleChange = (e) => {
    let newText = e.target.value
    if (newText.includes("<script>")) {
      setShowWarning(true)
      newText = newText.replace("<script>", "")
    }
    setText(newText)
  }

  return (
    <div className="textarea">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter your text"
        spellCheck={false}
      />
      {showWarning ? <Warning /> : null}
    </div>
  )
}
