// src/components/Header.jsx
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <section className="bg-gradient-to-b from-orange-100 to-white py-24 text-center">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-orange-700 drop-shadow-sm"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Kapten Naratel
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl mt-6 text-gray-700"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
      >
        Internet cepat untuk keluarga hebat
      </motion.p>
    </section>
  );
};

export default Header;
