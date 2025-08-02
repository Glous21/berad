import logo from '../assets/logo-kapten.png' // Pastikan path sesuai
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo & Tagline */}
        <div>
          <img src={logo} alt="Kapten Naratel" className="h-14 mb-4" />
          <p className="text-sm leading-relaxed">
            INTERNET CEPAT UNTUK KELUARGA HEBAT
          </p>
          <div className="flex space-x-4 mt-4">
            <FaFacebookF className="w-6 h-6 p-1 bg-sky-800 rounded-full hover:bg-sky-600 cursor-pointer" />
            <FaTwitter className="w-6 h-6 p-1 bg-sky-800 rounded-full hover:bg-sky-600 cursor-pointer" />
            <FaInstagram className="w-6 h-6 p-1 bg-sky-800 rounded-full hover:bg-sky-600 cursor-pointer" />
            <FaPinterestP className="w-6 h-6 p-1 bg-sky-800 rounded-full hover:bg-sky-600 cursor-pointer" />
          </div>
        </div>

        {/* Kebijakan Privasi */}
        <div>
          <h3 className="text-lg font-bold mb-4">KEBIJAKAN PRIVASI</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">News</a></li>
            <li><a href="#" className="hover:underline">Career</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Panduan</a></li>
            <li><a href="#" className="hover:underline">Pembayaran</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-4">CONTACT</h3>
          <p className="text-sm mb-2">PT NARAYA TELEMATIKA</p>
          <p className="text-sm">
            RUKO TAMAN BOROBUDUR INDAH KAVLING 33<br />
            JL. PUNCAK BOROBUDUR NO.1<br />
            MALANG, Desa/Kelurahan Mojolangu, Kec. Lowokwaru,<br />
            Kota Malang, Provinsi Jawa Timur,<br />
            Kode Pos: 65141
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4">NEWSLETTER</h3>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded mb-4 text-gray-800"
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 w-full py-3 font-bold text-gray-900 rounded shadow-lg uppercase">
            Register Now
          </button>
        </div>
      </div>

      {/* Copyright bawah */}
      <div className="mt-10 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Kapten Naratel. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
