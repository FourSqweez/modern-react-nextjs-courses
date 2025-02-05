import { useEffect, useState } from "react"
import { initialItems } from "../lib/constants"
import AddItemForm from "./AddItemForm"
import BackgroundHeading from "./BackgroundHeading"
import ButtonGroup from "./ButtonGroup"
import Counter from "./Counter"
import Footer from "./Footer"
import Header from "./Header"
import ItemList from "./ItemList"
import Logo from "./Logo"
import Sidebar from "./Sidebar"

function App() {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem("items")) || initialItems
  )

  const handleAddItem = (newItemText) => {
    const newItem = {
      id: new Date().getTime(),
      name: newItemText,
      packed: false,
    }

    const newItems = [...items, newItem]
    setItems(newItems)
  }

  const handleDeleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
  }

  const handleToggleItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, packed: !item.packed }
      }

      return item
    })

    setItems(newItems)
  }

  const handleRemoveAllItems = () => {
    setItems([])
  }

  const handleResetToInitial = () => {
    setItems(initialItems)
  }

  const handleMarkAllAsComplete = () => {
    const newItems = items.map((item) => {
      return { ...item, packed: true }
    })

    setItems(newItems)
  }

  const handleMarkAllAsIncomplete = () => {
    const newItems = items.map((item) => {
      return { ...item, packed: false }
    })

    setItems(newItems)
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

  return (
    <>
      <BackgroundHeading />
      <main>
        <Header>
          <Logo />
          <Counter
            numberOfItemsPacked={items.filter((item) => item.packed).length}
            totalNumberOfItems={items.length}
          />
        </Header>

        <ItemList
          items={items}
          handleDeleteItem={handleDeleteItem}
          handleToggleItem={handleToggleItem}
        />

        <Sidebar>
          <AddItemForm onAddItem={handleAddItem} />
          <ButtonGroup
            handleRemoveAllItems={handleRemoveAllItems}
            handleResetToInitial={handleResetToInitial}
            handleMarkAllAsComplete={handleMarkAllAsComplete}
            handleMarkAllAsIncomplete={handleMarkAllAsIncomplete}
          />
        </Sidebar>
      </main>
      <Footer />
    </>
  )
}

export default App
