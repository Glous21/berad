// src/components/AdminServis.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPen, FaTrash } from "react-icons/fa";

const apiUrl = `${import.meta.env.VITE_SERVICE_CONTEND_URL}/api/services`;

const AdminServis = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    kecepatan: "",
    harga: "",
    harga_instalasi: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await axios.get(apiUrl);
      setServices(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title.trim(),
      kecepatan: form.kecepatan.trim(),
      harga: form.harga.trim(),
      harga_instalasi: form.harga_instalasi.trim(),
      description: form.description.trim(),
    };

    if (
      !payload.title ||
      !payload.kecepatan ||
      !payload.harga ||
      !payload.harga_instalasi ||
      !payload.description
    ) {
      alert("Semua kolom wajib diisi!");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${apiUrl}/${editId}`, payload);
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post(apiUrl, payload);
      }

      setForm({
        title: "",
        kecepatan: "",
        harga: "",
        harga_instalasi: "",
        description: "",
      });

      fetchServices();
    } catch (error) {
      console.error("Gagal menyimpan data:", error.response?.data || error.message);

      if (error.response?.data?.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("\n");
        alert("Validasi gagal:\n" + errorMessages);
      } else {
        alert("Gagal menyimpan data: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title || "",
      kecepatan: item.kecepatan || "",
      harga: item.harga || "",
      harga_instalasi: item.harga_instalasi || "",
      description: item.description || "",
    });
    setIsEditing(true);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Gagal menghapus data!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">

      <h2 className="text-2xl font-semibold text-green-700 text-center mb-6">Kelola Paket Layanan</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Judul"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="kecepatan"
          placeholder="Kecepatan"
          value={form.kecepatan}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="harga"
          placeholder="Harga"
          value={form.harga}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="harga_instalasi"
          placeholder="Biaya Instalasi"
          value={form.harga_instalasi}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Deskripsi"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded md:col-span-2"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 md:col-span-2"
        >
          {isEditing ? "Simpan Perubahan" : "Tambah"}
        </button>
      </form>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Judul</th>
            <th className="border px-2 py-1">Kecepatan</th>
            <th className="border px-2 py-1">Harga</th>
            <th className="border px-2 py-1">Instalasi</th>
            <th className="border px-2 py-1">Deskripsi</th>
            <th className="border px-2 py-1">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {services.map((item) => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.title}</td>
              <td className="border px-2 py-1">{item.kecepatan}</td>
              <td className="border px-2 py-1">{item.harga}</td>
              <td className="border px-2 py-1">{item.harga_instalasi}</td>
              <td className="border px-2 py-1">{item.description}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaPen />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-6">
        <a href="/admin" className="text-blue-500 hover:underline">
          ← Kembali ke menu utama
        </a>
      </div>
    </div>
  );
};

export default AdminServis;
