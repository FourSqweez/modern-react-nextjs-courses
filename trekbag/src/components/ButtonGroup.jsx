import Button from "./Button"

const secondaryButtons = [
  "Mark all as complete",
  "Mark all as incomplete",
  "Reset to initial",
  "Remove all items",
]

export default function ButtonGroup() {
  return (
    <section className="button-group">
      {secondaryButtons.map((text) => (
        <Button key={text} type="secondary">
          {text}
        </Button>
      ))}
    </section>
  )
}
