"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  HomeIcon, 
  Building, 
  BookOpen, 
  MessageSquare, 
  User, 
  LogIn, 
  Menu, 
  X,
  Search,
  Heart,
  BellRing
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "/", icon: <HomeIcon className="h-4 w-4 mr-2" /> },
    { name: "Properties", href: "/properties", icon: <Building className="h-4 w-4 mr-2" /> },
    { name: "Resources", href: "/resources", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: "Contact", href: "/contact", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-40">
                <Image
                  src={isScrolled || pathname !== "/" ? "https://cdn.abacus.ai/images/c1bd5c65-3930-4238-8375-c7e605c3d3fa.png" : "https://cdn.abacus.ai/images/e465d849-341b-4994-acc8-28a975895fe1.png"}
                  alt="Cash Home Buyers Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link href={item.href} key={item.name}>
                <Button
                  variant="ghost"
                  className={`flex items-center ${
                    pathname === item.href
                      ? "text-[#003366] dark:text-[#0066CC]"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            ))}

            {session ? (
              <div className="flex items-center space-x-1">
                <Link href="/dashboard">
                  <Button variant="ghost" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/saved-properties">
                  <Button variant="ghost" className="flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    Saved
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" className="flex items-center">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" className="flex items-center">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link href={item.href} key={item.name}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    pathname === item.href
                      ? "text-[#003366] dark:text-[#0066CC]"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            ))}

            {session ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/saved-properties">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Saved Properties
                  </Button>
                </Link>
                <Link href="/search-alerts">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BellRing className="h-4 w-4 mr-2" />
                    Search Alerts
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="primary"
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;