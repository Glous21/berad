import { useEffect, useState } from "react"
import axios from "axios"
import { FaEdit, FaTrash } from "react-icons/fa"

const apiUrl = `${import.meta.env.VITE_SERVICE_CONTEND_URL}/api/benefits`

const AdminBenefit = () => {
  const [benefits, setBenefits] = useState([])
  const [form, setForm] = useState({ title: "", description: "" })
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    fetchBenefits()
  }, [])

  const fetchBenefits = async () => {
    try {
      const res = await axios.get(apiUrl)
      setBenefits(res.data)
    } catch (err) {
      console.error("Gagal mengambil data benefit:", err)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await axios.put(`${apiUrl}/${editId}`, form)
      } else {
        await axios.post(apiUrl, form)
      }
      setForm({ title: "", description: "" })
      setIsEditing(false)
      setEditId(null)
      fetchBenefits()
    } catch (err) {
      console.error("Gagal menyimpan benefit:", err)
    }
  }

  const handleEdit = (benefit) => {
    setForm({ title: benefit.title, description: benefit.description })
    setIsEditing(true)
    setEditId(benefit.id)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`)
      fetchBenefits()
    } catch (err) {
      console.error("Gagal menghapus benefit:", err)
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black-700">Kelola Benefit</h2>


      {/* Form Tambah / Edit */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Judul"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <textarea
          name="description"
          placeholder="Deskripsi"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          {isEditing ? "Update" : "Tambah"}
        </button>
      </form>

      {/* Tabel Data */}
      <table className="w-full border text-center">
        <thead>
          <tr className="bg-orange-100">
            <th className="border p-2">Judul</th>
            <th className="border p-2">Deskripsi</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {benefits.map((benefit) => (
            <tr key={benefit.id}>
              <td className="border p-2">{benefit.title}</td>
              <td className="border p-2">{benefit.description}</td>
              <td className="border p-2">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(benefit)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md transition duration-200"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(benefit.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-md transition duration-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tambahan: Tombol kembali */}
      <div className="mt-8 text-center">
        <a
          href="/admin"
          className="text-blue-600 hover:underline text-base inline-block"
        >
          ← Kembali ke menu utama
        </a>
      </div>
    </div>
  )
}

export default AdminBenefit
