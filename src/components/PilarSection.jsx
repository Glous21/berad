// src/components/PilarSection.jsx
import { motion } from 'framer-motion'
import { FaBolt, FaMoneyBillWave, FaNetworkWired, FaTools } from 'react-icons/fa'

const pilar = [
  {
    title: 'Pelayanan Cepat',
    desc: 'Kami merespon pelanggan tanpa menunggu lama.',
    icon: <FaBolt className="text-4xl text-orange-600 mb-4" />
  },
  {
    title: 'Harga Terjangkau',
    desc: 'Paket internet yang sesuai dengan kantong masyarakat.',
    icon: <FaMoneyBillWave className="text-4xl text-orange-600 mb-4" />
  },
  {
    title: 'Jaringan Stabil',
    desc: 'Minim gangguan dan koneksi tetap lancar.',
    icon: <FaNetworkWired className="text-4xl text-orange-600 mb-4" />
  },
  {
    title: 'Teknisi Siaga',
    desc: 'Tim teknisi siap datang kapan pun dibutuhkan.',
    icon: <FaTools className="text-4xl text-orange-600 mb-4" />
  },
]

const PilarSection = () => {
  return (
    <section className="relative py-20 bg-white text-center overflow-hidden">
      {/* Background wave atas */}
      <div className="absolute top-0 left-0 w-full -z-10">
        <svg viewBox="0 0 1440 320">
          <path
            fill="#fff7ed"
            fillOpacity="1"
            d="M0,64L48,58.7C96,53,192,43,288,69.3C384,96,480,160,576,181.3C672,203,768,181,864,160C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <h2 className="text-3xl font-bold text-orange-800 mb-12 z-10 relative">
        4 Pilar Perjuangan Kapten Naratel
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 z-10 relative">
        {pilar.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-md border border-orange-200 hover:shadow-xl hover:bg-orange-50 transition-all"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center">
              {item.icon}
              <h3 className="text-xl font-bold text-orange-800 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default PilarSection
