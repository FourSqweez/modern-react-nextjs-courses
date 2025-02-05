import { useItemsContext } from "../lib/hooks"
import AddItemForm from "./AddItemForm"
import ButtonGroup from "./ButtonGroup"

export default function Sidebar() {
  const { handleAddItem } = useItemsContext()
  return (
    <div className="sidebar">
      <AddItemForm onAddItem={handleAddItem} />
      <ButtonGroup />
    </div>
  )
}
