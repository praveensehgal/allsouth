"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { 
  Building, 
  HomeIcon, 
  MapPin, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Search, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/property-card";
import LeadForm from "@/components/lead-form";
import TestimonialCard from "@/components/testimonial-card";

// Sample featured properties
const featuredProperties = [
  {
    id: "1",
    title: "Historic Fan District Victorian",
    price: 425000,
    address: "2145 Park Avenue, Richmond, VA 23220",
    neighborhood: "The Fan District",
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 2800,
    propertyType: "Single-Family Home",
    isOffMarket: true,
    isDistressed: false,
    discountPercentage: 12,
    images: ["https://live.staticflickr.com/65535/47824230542_6584c5ce84_b.jpg"]
  },
  {
    id: "2",
    title: "Scott's Addition Modern Condo",
    price: 350000,
    address: "3015 W Broad St, Richmond, VA 23230",
    neighborhood: "Scott's Addition",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    propertyType: "Condo",
    isOffMarket: true,
    isDistressed: false,
    images: ["https://sightdoing.net/wp-content/uploads/2021/06/scotts-addition-richmond.jpg"]
  },
  {
    id: "3",
    title: "Manchester Distressed Duplex",
    price: 275000,
    address: "1234 Hull St, Richmond, VA 23224",
    neighborhood: "Manchester",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2400,
    propertyType: "Multi-Family",
    isOffMarket: true,
    isDistressed: true,
    distressedType: "Pre-Foreclosure",
    discountPercentage: 25,
    images: ["https://i.pinimg.com/originals/e8/08/64/e80864f08110c1d316324af38e5d4604.png"]
  }
];

// Sample testimonials
const testimonials = [
  {
    id: "1",
    name: "Michael Johnson",
    role: "Real Estate Investor",
    content: "Cash Home Buyers has been instrumental in helping me build my investment portfolio in Richmond. Their off-market deals have consistently outperformed my other investments.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "First-time Investor",
    content: "As a newcomer to real estate investing, I was nervous about making my first purchase. The team at Cash Home Buyers guided me through the entire process and found me a property with excellent ROI potential.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "3",
    name: "David Chen",
    role: "Property Developer",
    content: "I've been working with Cash Home Buyers for over 3 years now. Their knowledge of the Richmond market is unparalleled, and they consistently find distressed properties with great renovation potential.",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=3"
  }
];

export default function HomePage() {
  const [animatedStats, setAnimatedStats] = useState({
    properties: 0,
    investors: 0,
    savings: 0
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (statsInView) {
      const interval = setInterval(() => {
        setAnimatedStats(prev => ({
          properties: Math.min(prev.properties + 5, 250),
          investors: Math.min(prev.investors + 3, 150),
          savings: Math.min(prev.savings + 1, 25)
        }));
      }, 30);

      return () => clearInterval(interval);
    }
  }, [statsInView]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://cdn.abacus.ai/images/43daf33e-a578-47cc-ac08-bead3d12ea38.png"
            alt="Richmond real estate"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">
              Exclusive Off-Market Property Deals in <span className="text-[#FFC107]">Richmond, VA</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-shadow">
              Access discounted investment properties not available on the open market.
              Build your real estate portfolio with Cash Home Buyers.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link href="/properties">
                <Button variant="primary" size="xl" className="w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Properties
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="accent" size="xl" className="w-full sm:w-auto">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Start Investing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="accent" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Richmond's Premier Source for <span className="text-[#003366] dark:text-[#0066CC]">Off-Market Properties</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cash Home Buyers specializes in finding exclusive investment opportunities 
              with higher returns than traditional market listings.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-14 w-14 bg-[#003366]/10 dark:bg-[#0066CC]/20 rounded-full flex items-center justify-center mb-6">
                <Building className="h-7 w-7 text-[#003366] dark:text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Diverse Property Types</h3>
              <p className="text-gray-600 dark:text-gray-300">
                From single-family homes to multi-family buildings and commercial properties,
                we offer a wide range of investment opportunities to suit your strategy.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-[#2E7D32] mr-2" />
                  Single-Family Homes
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-[#2E7D32] mr-2" />
                  Multi-Family Properties
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-[#2E7D32] mr-2" />
                  Condos & Townhouses
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-14 w-14 bg-[#003366]/10 dark:bg-[#0066CC]/20 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-7 w-7 text-[#003366] dark:text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Prime Richmond Locations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We focus on high-demand neighborhoods throughout Richmond with strong 
                appreciation potential and rental yields.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-[#2E7D32] mr-2" />
                  The Fan District
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-[#2E7D32] mr-2" />
                  Scott's Addition
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-[#2E7D32] mr-2" />
                  Manchester & Church Hill
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-14 w-14 bg-[#003366]/10 dark:bg-[#0066CC]/20 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-[#003366] dark:text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Superior Investment Returns</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our off-market properties typically offer higher ROI potential through 
                below-market acquisition prices and strong appreciation.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-[#2E7D32] mr-2" />
                  15-40% Below Market Value
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-[#2E7D32] mr-2" />
                  6-10% Potential Rental Yields
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-[#2E7D32] mr-2" />
                  Strong Appreciation Potential
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-20 bg-[#003366] text-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2 text-[#FFC107]">
                {animatedStats.properties}+
              </div>
              <p className="text-xl">Properties Sold</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2 text-[#FFC107]">
                {animatedStats.investors}+
              </div>
              <p className="text-xl">Satisfied Investors</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2 text-[#FFC107]">
                {animatedStats.savings}%
              </div>
              <p className="text-xl">Average Discount</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="default" className="mb-4">Featured Listings</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Exclusive Investment <span className="text-[#003366] dark:text-[#0066CC]">Opportunities</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Browse our selection of off-market properties with strong investment potential
              in Richmond's most desirable neighborhoods.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/properties">
              <Button variant="primary" size="lg">
                View All Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge variant="success" className="mb-4">Why Invest With Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Cash Home Buyers <span className="text-[#2E7D32]">Advantage</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We provide serious investors with exclusive access to off-market and distressed 
                properties in Richmond, offering higher returns than traditional investments.
              </p>

              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-10 w-10 bg-[#2E7D32]/10 rounded-full flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-[#2E7D32]" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Below-Market Pricing</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our properties are typically priced 15-40% below market value, 
                      creating instant equity and higher potential returns.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-10 w-10 bg-[#2E7D32]/10 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-[#2E7D32]" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Distressed Property Expertise</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We specialize in finding and evaluating pre-foreclosures, bank-owned 
                      properties, and other distressed assets with renovation potential.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-10 w-10 bg-[#2E7D32]/10 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-[#2E7D32]" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">First Access to Deals</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our investors get priority access to new properties before they hit 
                      the market, giving you a competitive edge in a hot market.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://dividendsdiversify.com/wp-content/uploads/2022/10/richmond-va-skyline.jpg"
                  alt="Richmond skyline"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-2/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#003366] dark:text-[#0066CC]">
                  Richmond Market Growth
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  The Richmond real estate market has seen a <span className="font-semibold">114.76% appreciation</span> over the past decade, averaging <span className="font-semibold">10% annually</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="accent" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-[#003366] dark:text-[#0066CC]">Investors Say</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from investors who have successfully built their real estate portfolios
              with Cash Home Buyers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#003366] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Investment Journey in Richmond?
              </h2>
              <p className="text-xl mb-8 text-gray-200">
                Join our network of successful investors and gain access to exclusive 
                off-market property deals with strong ROI potential.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-[#FFC107] mr-3" />
                  <span className="text-lg">Exclusive access to off-market properties</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-[#FFC107] mr-3" />
                  <span className="text-lg">Properties at 15-40% below market value</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-[#FFC107] mr-3" />
                  <span className="text-lg">Personalized investment strategy guidance</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-[#FFC107] mr-3" />
                  <span className="text-lg">First notification of new property listings</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <LeadForm 
                source="homepage-cta" 
                title="Get Started Today" 
                subtitle="Fill out the form below to join our investor network and receive exclusive property alerts."
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}