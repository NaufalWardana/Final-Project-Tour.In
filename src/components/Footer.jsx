import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

// Komponen footer
function Footer() {
  const currentYear = new Date().getFullYear(); // Mendapatkan tahun saat ini

  const socialLinks = [
    { icon: Facebook, url: "#" },
    { icon: Twitter, url: "#" },
    { icon: Instagram, url: "#" },
    { icon: Linkedin, url: "#" },
  ];

  const quickLinks = [
    "Home",
    "Destinations",
    "Activities",
    "About Us",
    "Contact",
  ];

  return (
    <footer className="bg-gray-900 text-white py-16 ">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-teal-400">
              Tour Indonesia
            </h3>
            <p className="text-gray-400 mb-4">
              Discover the world, create memories that last a lifetime.
            </p>

            {/* Tautan Sosial */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Kolom Kontak */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <MapPin className="w-5 h-5 mr-3 text-teal-400" />
                <span>Pamulang, Tangerang Selatan</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-3 text-teal-400" />
                <span>tour.indonesia@tour.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-3 text-teal-400" />
                <span>+62 (812) 888-6415</span>
              </div>
            </div>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers and travel updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button className="bg-teal-400 text-white px-4 py-2 rounded-r-xl hover:bg-teal-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Hak Cipta */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            &copy; {currentYear} TourIn. In All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
