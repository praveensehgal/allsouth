import Link from "next/link";
import Image from "next/image";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#003366] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="relative h-12 w-48 mb-4">
              <Image
                src="https://cdn.abacus.ai/images/e465d849-341b-4994-acc8-28a975895fe1.png"
                alt="Cash Home Buyers Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="text-gray-300 text-sm">
              Cash Home Buyers specializes in off-market property deals in Richmond, Virginia, 
              providing investors with exclusive access to discounted properties.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?propertyType=Single-Family Home" className="text-gray-300 hover:text-white transition-colors">
                  Single-Family Homes
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=Multi-Family" className="text-gray-300 hover:text-white transition-colors">
                  Multi-Family Properties
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=Condo" className="text-gray-300 hover:text-white transition-colors">
                  Condos & Townhouses
                </Link>
              </li>
              <li>
                <Link href="/properties?isDistressed=true" className="text-gray-300 hover:text-white transition-colors">
                  Distressed Properties
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-[#FFC107]" />
                <span className="text-gray-300">
                  123 Main Street, Richmond, VA 23220
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-[#FFC107]" />
                <a href="tel:+18045551234" className="text-gray-300 hover:text-white transition-colors">
                  (804) 555-1234
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#FFC107]" />
                <a href="mailto:info@cashhomebuyers.com" className="text-gray-300 hover:text-white transition-colors">
                  info@cashhomebuyers.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Cash Home Buyers. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-sm text-gray-400 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;