export default function ItemList({
  items,
  handleDeleteItem,
  handleToggleItem,
}) {
  return (
    <ul>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onDelete={handleDeleteItem}
          onToggle={handleToggleItem}
        />
      ))}
    </ul>
  )
}

function Item({ item, onDelete, onToggle }) {
  return (
    <li className="item">
      <label>
        <input
          onChange={() => onToggle(item.id)}
          checked={item.packed}
          type="checkbox"
        />{" "}
        {item.name}
      </label>

      <button
        onClick={() => {
          onDelete(item.id)
        }}>
        ❌
      </button>
    </li>
  )
}
