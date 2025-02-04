import { useEffect, useState } from "react"
import ButtonContainer from "./ButtonContainer"
import Count from "./Count"
import ResetButton from "./ResetButton"
import Title from "./Title"

export default function Card() {
  const [count, setCount] = useState(0)
  const locked = count === 5 ? true : false

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.code === "Space") {
        const newCount = count + 1
        if (newCount > 5) {
          setCount(5)
          return
        }
        setCount(newCount)
      }
    }

    window.addEventListener("keydown", handleKeydown)

    // cleanup function: clean the old event first before add it again to prevent the app slowdown because it has too may events
    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [count])

  return (
    <div className={`card ${locked ? "card--limit" : ""}`}>
      <Title locked={locked} />
      <Count count={count} />
      <ResetButton setCount={setCount} />
      <ButtonContainer setCount={setCount} locked={locked} />
    </div>
  )
}
