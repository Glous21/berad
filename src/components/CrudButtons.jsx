import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

const CrudButtons = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Paket Internet Murah' },
    { id: 2, name: 'Paket Bisnis Premium' },
  ])
  const [newItem, setNewItem] = useState('')
  const [editingId, setEditingId] = useState(null)

  const handleAdd = () => {
    if (!newItem.trim()) return
    const id = items.length ? items[items.length - 1].id + 1 : 1
    setItems([...items, { id, name: newItem }])
    setNewItem('')
  }

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleEdit = (id, name) => {
    setEditingId(id)
    setNewItem(name)
  }

  const handleUpdate = () => {
    setItems(items.map(item => (item.id === editingId ? { ...item, name: newItem } : item)))
    setEditingId(null)
    setNewItem('')
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Manajemen Paket Layanan</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          placeholder="Nama paket..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        {editingId ? (
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleAdd}
          >
            <FaPlus />
          </button>
        )}
      </div>

      <ul className="space-y-3">
        {items.map(item => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded border"
          >
            <span>{item.name}</span>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(item.id, item.name)}
                className="text-yellow-500 hover:text-yellow-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CrudButtons
