"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Search, 
  DollarSign, 
  Home, 
  MapPin, 
  Bed, 
  Bath, 
  Filter, 
  X, 
  AlertTriangle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { propertyTypes, neighborhoods } from "@/lib/utils";

const PropertyFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [minPrice, setMinPrice] = useState<number>(100000);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [propertyType, setPropertyType] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<string>("");
  const [isOffMarket, setIsOffMarket] = useState<boolean>(false);
  const [isDistressed, setIsDistressed] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    // Initialize filter values from URL params
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const propertyTypeParam = searchParams.get("propertyType");
    const neighborhoodParam = searchParams.get("neighborhood");
    const bedroomsParam = searchParams.get("bedrooms");
    const bathroomsParam = searchParams.get("bathrooms");
    const isOffMarketParam = searchParams.get("isOffMarket");
    const isDistressedParam = searchParams.get("isDistressed");

    if (minPriceParam) setMinPrice(parseInt(minPriceParam));
    if (maxPriceParam) setMaxPrice(parseInt(maxPriceParam));
    if (propertyTypeParam) setPropertyType(propertyTypeParam);
    if (neighborhoodParam) setNeighborhood(neighborhoodParam);
    if (bedroomsParam) setBedrooms(bedroomsParam);
    if (bathroomsParam) setBathrooms(bathroomsParam);
    if (isOffMarketParam) setIsOffMarket(isOffMarketParam === "true");
    if (isDistressedParam) setIsDistressed(isDistressedParam === "true");
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (minPrice) params.set("minPrice", minPrice.toString());
    if (maxPrice) params.set("maxPrice", maxPrice.toString());
    if (propertyType) params.set("propertyType", propertyType);
    if (neighborhood) params.set("neighborhood", neighborhood);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (bathrooms) params.set("bathrooms", bathrooms);
    if (isOffMarket) params.set("isOffMarket", isOffMarket.toString());
    if (isDistressed) params.set("isDistressed", isDistressed.toString());

    router.push(`/properties?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setMinPrice(100000);
    setMaxPrice(1000000);
    setPropertyType("");
    setNeighborhood("");
    setBedrooms("");
    setBathrooms("");
    setIsOffMarket(false);
    setIsDistressed(false);
    router.push("/properties");
    setIsFilterOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-4 md:mb-0 flex items-center">
          <Search className="h-5 w-5 mr-2 text-[#003366]" />
          Find Your Investment Property
        </h2>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {isFilterOpen ? <X className="h-4 w-4 mr-2" /> : <Filter className="h-4 w-4 mr-2" />}
            {isFilterOpen ? "Close Filters" : "Advanced Filters"}
          </Button>
          
          <Button variant="primary" onClick={handleSearch}>
            Search Properties
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
            Price Range
          </label>
          <div className="px-2">
            <Slider
              value={[minPrice, maxPrice]}
              min={50000}
              max={2000000}
              step={10000}
              onValueChange={(value) => {
                setMinPrice(value[0]);
                setMaxPrice(value[1]);
              }}
              className="my-4"
            />
          </div>
          <div className="flex justify-between text-sm">
            <span>{formatCurrency(minPrice)}</span>
            <span>{formatCurrency(maxPrice)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Home className="h-4 w-4 mr-1 text-gray-500" />
            Property Type
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder="Any Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Property Type</SelectItem>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-gray-500" />
            Neighborhood
          </label>
          <Select value={neighborhood} onValueChange={setNeighborhood}>
            <SelectTrigger>
              <SelectValue placeholder="Any Neighborhood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Neighborhood</SelectItem>
              {neighborhoods.map((hood) => (
                <SelectItem key={hood} value={hood}>
                  {hood}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t pt-4 mt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Bed className="h-4 w-4 mr-1 text-gray-500" />
                Bedrooms
              </label>
              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Bedrooms</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Bath className="h-4 w-4 mr-1 text-gray-500" />
                Bathrooms
              </label>
              <Select value={bathrooms} onValueChange={setBathrooms}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Bathrooms</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="1.5">1.5+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="2.5">2.5+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOffMarket}
                  onChange={() => setIsOffMarket(!isOffMarket)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0066CC]"></div>
                <span className="ms-3 text-sm font-medium">
                  Off-Market Properties
                </span>
              </label>
            </div>

            <div className="space-y-2 flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDistressed}
                  onChange={() => setIsDistressed(!isDistressed)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF5722]"></div>
                <span className="ms-3 text-sm font-medium flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-[#FF5722]" />
                  Distressed Properties
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={resetFilters} className="mr-2">
              Reset Filters
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PropertyFilter;