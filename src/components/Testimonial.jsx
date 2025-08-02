import { useEffect, useState } from "react";
import axios from "axios";
import { FaPen, FaTrash } from "react-icons/fa";

const apiUrl = `${import.meta.env.VITE_SERVICE_CONTEND_URL}/api/testimonials`;

const Testimoni = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Ambil data dari server
  const fetchData = async () => {
    try {
      const res = await axios.get(apiUrl);
      setTestimonials(res.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${apiUrl}/${editId}`, form);
        setIsEditing(false);
        setEditId(null);
      } else {
        const response = await axios.post(apiUrl, form);
        if (response.status === 201 || response.status === 200) {
          console.log("Respons POST:", response.data);
        } else {
          alert("Gagal menambahkan data. Cek server.");
        }
      }
      setForm({ name: "", message: "" });
      fetchData();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, message: item.message });
    setIsEditing(true);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus testimoni ini?")) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchData();
      } catch (error) {
        console.error("Gagal menghapus data:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
        Kelola Testimoni
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-10 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium mb-2">Nama</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Pesan</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            {isEditing ? "Update" : "Tambah"}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-sm text-sm">
          <thead className="bg-green-100 text-left">
            <tr>
              <th className="border px-4 py-3">Nama</th>
              <th className="border px-4 py-3">Pesan</th>
              <th className="border px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-5 text-gray-500">
                  Belum ada testimoni
                </td>
              </tr>
            ) : (
              testimonials.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="border px-4 py-3 align-top">{item.name}</td>
                  <td className="border px-4 py-3 align-top">
                    {item.message || "Tidak ada pesan"}
                  </td>
                  <td className="border px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded"
                        title="Edit"
                      >
                        <FaPen size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 flex items-center justify-center rounded"
                        title="Hapus"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-auto pt-10 text-center">
        <a href="/" className="text-blue-600 hover:underline">
          ← Kembali ke menu utama
        </a>
      </div>
    </div>
  );
};

export default Testimoni;
