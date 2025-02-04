import CountButtons from "./CountButton"

export default function ButtonContainer({ setCount, locked }) {
  return (
    <div className="button-container">
      <CountButtons type="minus" setCount={setCount} locked={locked} />
      <CountButtons type="plus" setCount={setCount} locked={locked} />
    </div>
  )
}
