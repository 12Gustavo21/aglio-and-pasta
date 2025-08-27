// src/components/Footer.jsx
import Link from 'next/link';
import { FaTwitter, FaPinterest, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 italic mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Aglio & Pasta
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              "La cucina italiana non è solo cibo, è un modo di vivere. Ogni
              piatto racconta una storia, ogni ricetta è una tradizione che
              passa di generazione in generazione."
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Aglio & Pasta</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Homepage</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Categories</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Products</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Terms</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Conditions</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Cookies</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Copyright</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2020 Aglio & Pasta - All rights reserved
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-gray-600"><FaTwitter /></Link>
            <Link href="#" className="text-gray-400 hover:text-gray-600"><FaPinterest /></Link>
            <Link href="#" className="text-gray-400 hover:text-gray-600"><FaYoutube /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;