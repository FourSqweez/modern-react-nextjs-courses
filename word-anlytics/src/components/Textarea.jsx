import { useState } from "react"

export default function Textarea() {
  const [text, setText] = useState("")

  return (
    <textarea
      value={text}
      onChange={(e) => {
        setText(e.target.value)
      }}
      className="textarea"
      placeholder="Enter your text"
      spellCheck={false}
    />
  )
}
