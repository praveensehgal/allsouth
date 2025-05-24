"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Building, Filter, AlertTriangle } from "lucide-react";
import PropertyFilter from "@/components/property-filter";
import PropertyCard from "@/components/property-card";
import LeadForm from "@/components/lead-form";
import { toast } from "react-hot-toast";

interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: string;
  isOffMarket: boolean;
  isDistressed: boolean;
  distressedType?: string;
  discountPercentage?: number;
  images: string[];
}

export default function PropertiesClient() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        // Build query string from search params
        const queryParams = new URLSearchParams();
        
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const propertyType = searchParams.get("propertyType");
        const neighborhood = searchParams.get("neighborhood");
        const bedrooms = searchParams.get("bedrooms");
        const bathrooms = searchParams.get("bathrooms");
        const isOffMarket = searchParams.get("isOffMarket");
        const isDistressed = searchParams.get("isDistressed");
        
        if (minPrice) queryParams.append("minPrice", minPrice);
        if (maxPrice) queryParams.append("maxPrice", maxPrice);
        if (propertyType) queryParams.append("propertyType", propertyType);
        if (neighborhood) queryParams.append("neighborhood", neighborhood);
        if (bedrooms) queryParams.append("bedrooms", bedrooms);
        if (bathrooms) queryParams.append("bathrooms", bathrooms);
        if (isOffMarket) queryParams.append("isOffMarket", isOffMarket);
        if (isDistressed) queryParams.append("isDistressed", isDistressed);
        
        const response = await fetch(`/api/properties?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to load properties. Please try again.");
        // Fallback to sample data for demo purposes
        setProperties([
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
          },
          {
            id: "4",
            title: "Church Hill Historic Renovation",
            price: 299000,
            address: "2512 E Grace St, Richmond, VA 23223",
            neighborhood: "Church Hill",
            bedrooms: 3,
            bathrooms: 2,
            squareFeet: 1800,
            propertyType: "Single-Family Home",
            isOffMarket: true,
            isDistressed: true,
            distressedType: "Fixer-Upper",
            discountPercentage: 18,
            images: ["https://whyrichmondisawesome.com/wp-content/uploads/church-hill-bricks.jpg"]
          },
          {
            id: "5",
            title: "Shockoe Bottom Luxury Loft",
            price: 385000,
            address: "1815 E Main St, Richmond, VA 23223",
            neighborhood: "Shockoe Bottom",
            bedrooms: 2,
            bathrooms: 2,
            squareFeet: 1350,
            propertyType: "Condo",
            isOffMarket: true,
            isDistressed: false,
            images: ["https://live.staticflickr.com/32/35527763_628d1165e3_z.jpg"]
          },
          {
            id: "6",
            title: "Jackson Ward Investment Package",
            price: 450000,
            address: "412 N 2nd St, Richmond, VA 23219",
            neighborhood: "Jackson Ward",
            bedrooms: 5,
            bathrooms: 3,
            squareFeet: 3200,
            propertyType: "Multi-Family",
            isOffMarket: true,
            isDistressed: false,
            discountPercentage: 10,
            images: ["https://www.tclf.org/sites/default/files/thumbnails/image/VA_Richmond_JacksonWard_BarrettDoherty_2018_01.jpg"]
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchSavedProperties = async () => {
      try {
        const response = await fetch("/api/saved-properties");
        
        if (response.ok) {
          const data = await response.json();
          setSavedProperties(data.map((item: any) => item.propertyId));
        }
      } catch (error) {
        console.error("Error fetching saved properties:", error);
      }
    };

    fetchProperties();
    fetchSavedProperties();
  }, [searchParams]);

  const handleSaveProperty = async (propertyId: string) => {
    try {
      const response = await fetch("/api/saved-properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId }),
      });

      if (!response.ok) {
        throw new Error("Failed to save property");
      }

      setSavedProperties([...savedProperties, propertyId]);
      return Promise.resolve();
    } catch (error) {
      console.error("Error saving property:", error);
      return Promise.reject(error);
    }
  };

  const handleRemoveProperty = async (propertyId: string) => {
    try {
      // Find the saved property entry
      const response = await fetch("/api/saved-properties");
      if (!response.ok) {
        throw new Error("Failed to fetch saved properties");
      }
      
      const data = await response.json();
      const savedProperty = data.find((item: any) => item.propertyId === propertyId);
      
      if (!savedProperty) {
        throw new Error("Saved property not found");
      }

      const deleteResponse = await fetch(`/api/saved-properties/${savedProperty.id}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        throw new Error("Failed to remove property");
      }

      setSavedProperties(savedProperties.filter(id => id !== propertyId));
      return Promise.resolve();
    } catch (error) {
      console.error("Error removing property:", error);
      return Promise.reject(error);
    }
  };

  // Filter applied message
  const getFilterMessage = () => {
    const filters = [];
    
    if (searchParams.get("propertyType")) {
      filters.push(`Property Type: ${searchParams.get("propertyType")}`);
    }
    
    if (searchParams.get("neighborhood")) {
      filters.push(`Neighborhood: ${searchParams.get("neighborhood")}`);
    }
    
    if (searchParams.get("minPrice") || searchParams.get("maxPrice")) {
      const min = searchParams.get("minPrice") ? `$${parseInt(searchParams.get("minPrice")!).toLocaleString()}` : "$0";
      const max = searchParams.get("maxPrice") ? `$${parseInt(searchParams.get("maxPrice")!).toLocaleString()}` : "Any";
      filters.push(`Price: ${min} - ${max}`);
    }
    
    if (searchParams.get("bedrooms")) {
      filters.push(`Bedrooms: ${searchParams.get("bedrooms")}+`);
    }
    
    if (searchParams.get("bathrooms")) {
      filters.push(`Bathrooms: ${searchParams.get("bathrooms")}+`);
    }
    
    if (searchParams.get("isOffMarket") === "true") {
      filters.push("Off-Market Only");
    }
    
    if (searchParams.get("isDistressed") === "true") {
      filters.push("Distressed Properties");
    }
    
    return filters.length > 0 ? `Filters: ${filters.join(" | ")}` : "";
  };

  return (
    <>
      <PropertyFilter />

      {getFilterMessage() && (
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md mb-6 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-[#003366]" />
          <p className="text-sm font-medium">{getFilterMessage()}</p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Loading properties...</p>
        </div>
      ) : properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                isSaved={savedProperties.includes(property.id)}
                onSave={() => handleSaveProperty(property.id)}
                onRemove={() => handleRemoveProperty(property.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <AlertTriangle className="h-12 w-12 mx-auto text-[#FFC107] mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We couldn't find any properties matching your current filters. 
            Try adjusting your search criteria or contact us for personalized assistance.
          </p>
        </div>
      )}

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 bg-[#003366]/10 dark:bg-[#0066CC]/20 rounded-full flex items-center justify-center mr-4">
              <Building className="h-6 w-6 text-[#003366] dark:text-[#0066CC]" />
            </div>
            <h3 className="text-2xl font-bold">Looking for Something Specific?</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We regularly source new off-market properties that may not be listed on our website yet. 
            Tell us what you're looking for, and our team will help you find the perfect investment property.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
              <span>Describe your ideal investment property (location, type, budget)</span>
            </li>
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
              <span>Our team will search our off-market inventory for matches</span>
            </li>
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
              <span>Receive personalized property recommendations</span>
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
            source="properties-page" 
            title="Request Property Recommendations" 
            subtitle="Tell us what you're looking for, and we'll help you find it."
          />
        </motion.div>
      </div>
    </>
  );
}