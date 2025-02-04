import CountButtons from "./CountButton"

export default function ButtonContainer({ setCount }) {
  return (
    <div className="button-container">
      <CountButtons type="minus" setCount={setCount} />
      <CountButtons type="plus" setCount={setCount} />
    </div>
  )
}
