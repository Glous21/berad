// src/components/PromoSection.jsx
import { motion } from 'framer-motion'

const PromoSection = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 text-center" id="promo">
      <div className="max-w-4xl mx-auto">

        {/* Judul Utama */}
        <motion.div
          className="text-5xl font-extrabold text-yellow-500 mb-4 flex justify-center items-center gap-2"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span>🚀</span>
          <h2>Internet Cepat, Tanpa Drama!</h2>
        </motion.div>

        {/* Subjudul */}
        <motion.h3
          className="text-2xl text-red-700 font-semibold mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Hanya Rp. 120 Ribu/Bulan – Real Speed 5 Mbps!
        </motion.h3>

        {/* Daftar Fitur */}
        <motion.ul
          className="text-left text-lg text-gray-800 mb-10 space-y-3 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.15 }}
          viewport={{ once: true }}
        >
          {[
            '✅ Gratis Instalasi Rp. 220.000 untuk 100 pelanggan pertama!',
            '✅ REAL SPEED (bukan sekadar Up-To!)',
            '✅ Unlimited tanpa FUP – Nikmati internet bebas batas!',
            '✅ Tanpa biaya siluman: No Deposit, No Denda, No Sewa',
            '✅ Upload & Download seimbang, cocok untuk WFH, meeting, gaming & hiburan',
          ].map((text, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              {text.includes('Gratis') ? (
                <span className="font-bold text-green-600">{text}</span>
              ) : (
                text
              )}
            </motion.li>
          ))}
        </motion.ul>

        {/* Statistik */}
        <motion.p
          className="text-lg text-gray-700 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          🎯 Dipercaya oleh <span className="font-bold">10.000+</span> pelanggan dengan tingkat kepuasan <span className="font-bold">95,31%</span>
        </motion.p>

        {/* Tombol CTA */}
        <motion.a
          href="https://wa.me/6288212022222"
          className="inline-block bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          📞 Pasang Sekarang: 0882-1202-2222
        </motion.a>
      </div>
    </section>
  )
}

export default PromoSection
