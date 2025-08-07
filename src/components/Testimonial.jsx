import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const apiUrl = `${import.meta.env.VITE_SERVICE_CONTEND_URL}/api/testimonials`;

const AdminTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(apiUrl);
      setTestimonials(response.data || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${apiUrl}/${editingId}`, form);
      } else {
        await axios.post(apiUrl, form);
      }
      setForm({ name: "", message: "" });
      setEditingId(null);
      fetchTestimonials();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus testimoni ini?")) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchTestimonials();
      } catch (error) {
        console.error("Gagal menghapus data:", error);
      }
    }
  };

  const handleEdit = (testi) => {
    setForm({ name: testi.name, message: testi.message });
    setEditingId(testi.id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
        Kelola Testimoni
      </h2>

      {/* Form Input */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md mb-6 max-w-3xl mx-auto space-y-6 border"
      >
        <div>
          <label htmlFor="name" className="block text-center font-semibold mb-2">
            Nama
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Masukkan nama"
            className="p-3 border rounded w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-center font-semibold mb-2">
            Pesan
          </label>
          <textarea
            name="message"
            id="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tulis testimoni..."
            className="p-3 border rounded w-full"
            rows={4}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded"
          >
            {editingId ? "Update" : "Tambah"}
          </button>
        </div>
      </form>

      {/* Tabel Testimoni */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm text-center">
          <thead>
            <tr className="bg-green-100 text-gray-800">
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Pesan</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length > 0 ? (
              testimonials.map((testi) => (
                <tr key={testi.id}>
                  <td className="border px-4 py-2 font-semibold">{testi.name}</td>
                  <td className="border px-4 py-2">{testi.message}</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(testi)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(testi.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="border py-4 text-gray-500">
                  Belum ada testimoni
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tombol Kembali */}
      <div className="text-center mt-6">
        <a href="/admin" className="text-blue-500 hover:underline">
          ← Kembali ke menu utama
        </a>
      </div>
    </div>
  );
};

export default AdminTestimonial;
