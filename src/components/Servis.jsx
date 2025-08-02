import { useEffect, useState } from "react";
import axios from "axios";
import { FaPen, FaTrash } from "react-icons/fa";

const apiUrl = `${import.meta.env.VITE_SERVICE_CONTEND_URL}/api/services`;

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    kecepatan: "",
    harga: "",
    harga_instalasi: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(apiUrl);
      setServices(response.data);
    } catch (error) {
      alert("Gagal mengambil data layanan");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title.trim(),
      kecepatan: formData.kecepatan.trim(),
      harga: String(formData.harga).trim(),
      harga_instalasi: String(formData.harga_instalasi).trim(),
      description: formData.description.trim(),
    };

    try {
      if (editingId) {
        await axios.put(`${apiUrl}/${editingId}`, payload);
        setEditingId(null);
      } else {
        await axios.post(apiUrl, payload);
      }
      setFormData({
        title: "",
        kecepatan: "",
        harga: "",
        harga_instalasi: "",
        description: "",
      });
      fetchServices();
    } catch (error) {
      const msg = error?.response?.data || "Gagal menyimpan data.";
      alert(JSON.stringify(msg, null, 2));
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      kecepatan: service.kecepatan,
      harga: service.harga,
      harga_instalasi: service.harga_instalasi,
      description: service.description,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchServices();
    } catch (error) {
      alert(`Gagal menghapus data: ${error.message}`);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Manajemen Layanan Internet
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white shadow-md p-6 rounded-xl mb-8"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Judul"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          name="kecepatan"
          value={formData.kecepatan}
          onChange={handleChange}
          placeholder="Kecepatan"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          name="harga"
          value={formData.harga}
          onChange={handleChange}
          placeholder="Harga"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          name="harga_instalasi"
          value={formData.harga_instalasi}
          onChange={handleChange}
          placeholder="Harga Instalasi"
          className="border border-gray-300 p-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Deskripsi"
          className="border border-gray-300 p-2 rounded col-span-1 sm:col-span-2 h-24"
        ></textarea>

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded"
        >
          {editingId ? "Update Layanan" : "Tambah Layanan"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm shadow-md bg-white rounded-lg overflow-hidden">
          <thead className="bg-orange-100 text-gray-700">
            <tr>
              <th className="p-3 border">Judul</th>
              <th className="p-3 border">Kecepatan</th>
              <th className="p-3 border">Harga</th>
              <th className="p-3 border">Instalasi</th>
              <th className="p-3 border">Deskripsi</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-orange-50 transition duration-150"
              >
                <td className="p-3 border">{s.title}</td>
                <td className="p-3 border">{s.kecepatan}</td>
                <td className="p-3 border">{s.harga}</td>
                <td className="p-3 border">{s.harga_instalasi}</td>
                <td className="p-3 border">{s.description}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                  >
                    <FaPen size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                  >
                    <FaTrash size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Tidak ada data layanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminServices;
