export default function Title({ locked }) {
  return (
    <h1 className="title">
      {locked ? (
        <span>
          Limit! <b>Buy</b> Pro for &gt;5
        </span>
      ) : (
        "Fancy Counter"
      )}
    </h1>
  )
}
