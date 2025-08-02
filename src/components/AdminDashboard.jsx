import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Benefit from './Benefit'
import Servis from './Servis'
import Testimoni from './Testimonial'
import {
  LayoutDashboard,
  Package,
  MessageSquareQuote,
  LogOut,
  ArrowLeft,
} from 'lucide-react'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(null)
  const navigate = useNavigate()

  const handleLogout = () => {
    // Jika kamu menyimpan token, bisa dihapus dulu di sini
    // localStorage.removeItem('token')
    navigate('/') // arahkan ke halaman login
  }

  return (
    <div className="p-8 max-w-5xl mx-auto relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-orange-600 text-center w-full">
          Admin Kapten Naratel
        </h1>
        <button
          onClick={handleLogout}
          className="absolute top-0 right-0 mt-4 mr-4 flex items-center gap-1 text-sm text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Menu Utama */}
      {!activeTab && (
        <>
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg">
              Silakan pilih salah satu menu di bawah untuk mulai mengelola konten.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <button
              onClick={() => setActiveTab('benefit')}
              className="flex flex-col items-center justify-center bg-orange-600 text-white p-6 rounded-xl shadow hover:bg-orange-700 transition-all"
            >
              <LayoutDashboard className="w-8 h-8 mb-2" />
              Kelola Benefit
            </button>
            <button
              onClick={() => setActiveTab('paket')}
              className="flex flex-col items-center justify-center bg-orange-600 text-white p-6 rounded-xl shadow hover:bg-orange-700 transition-all"
            >
              <Package className="w-8 h-8 mb-2" />
              Kelola Paket Layanan
            </button>
            <button
              onClick={() => setActiveTab('testimoni')}
              className="flex flex-col items-center justify-center bg-orange-600 text-white p-6 rounded-xl shadow hover:bg-orange-700 transition-all"
            >
              <MessageSquareQuote className="w-8 h-8 mb-2" />
              Kelola Testimoni
            </button>
          </div>
        </>
      )}

      {/* Tab Benefit */}
      {activeTab === 'benefit' && (
        <>
          <Benefit />
          <div className="text-center mt-10">
            <button
              onClick={() => setActiveTab(null)}
              className="flex items-center justify-center gap-1 text-sm text-gray-600 hover:underline"
            >
              
            </button>
          </div>
        </>
      )}

      {/* Tab Paket */}
      {activeTab === 'paket' && (
        <>
          <Servis />
          <div className="text-center mt-10">
            <button
              onClick={() => setActiveTab(null)}
              className="flex items-center justify-center gap-1 text-sm text-gray-600 hover:underline"
            >
              
            </button>
          </div>
        </>
      )}

      {/* Tab Testimoni */}
      {activeTab === 'testimoni' && (
        <>
          <Testimoni />
          {/* Jika tombol sudah ada di komponen Testimoni.jsx, hapus blok di bawah ini */}
          <div className="text-center mt-10">
            <button
              onClick={() => setActiveTab(null)}
              className="flex items-center justify-center gap-1 text-sm text-gray-600 hover:underline"
            >
              
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminDashboard
