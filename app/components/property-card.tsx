"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Heart, 
  Tag, 
  AlertTriangle,
  Building
} from "lucide-react";
import { toast } from "react-hot-toast";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface PropertyCardProps {
  property: {
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
  };
  isSaved?: boolean;
  onSave?: () => void;
  onRemove?: () => void;
}

const PropertyCard = ({ 
  property, 
  isSaved = false, 
  onSave, 
  onRemove 
}: PropertyCardProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProperty = async () => {
    if (!session) {
      toast.error("Please login to save properties");
      router.push("/login");
      return;
    }

    if (isSaved && onRemove) {
      setIsSaving(true);
      try {
        await onRemove();
        toast.success("Property removed from saved list");
      } catch (error) {
        toast.error("Failed to remove property");
      } finally {
        setIsSaving(false);
      }
    } else if (onSave) {
      setIsSaving(true);
      try {
        await onSave();
        toast.success("Property saved successfully");
      } catch (error) {
        toast.error("Failed to save property");
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card 
        className="overflow-hidden h-full flex flex-col bg-white dark:bg-gray-800"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Link href={`/properties/${property.id}`}>
            <Image
              src={property.images[0] || "https://ufundinvestment.com/wp-content/uploads/2019/12/%E5%B0%81%E9%9D%A2.jpg"}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-300"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
          </Link>
          <div className="absolute top-2 right-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${
                isSaved ? "text-red-500" : "text-gray-600"
              }`}
              onClick={handleSaveProperty}
              disabled={isSaving}
            >
              <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            </Button>
          </div>
          <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
            {property.isOffMarket && (
              <Badge variant="offMarket" className="px-2 py-1">
                Off-Market
              </Badge>
            )}
            {property.isDistressed && (
              <Badge variant="distressed" className="px-2 py-1">
                {property.distressedType || "Distressed"}
              </Badge>
            )}
            {property.discountPercentage && (
              <Badge variant="accent" className="px-2 py-1">
                <Tag className="h-3 w-3 mr-1" />
                {property.discountPercentage}% Below Market
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="flex-grow p-4">
          <div className="mb-2 flex justify-between items-start">
            <h3 className="text-xl font-semibold line-clamp-1">{property.title}</h3>
            <p className="text-lg font-bold text-[#003366] dark:text-[#0066CC]">
              {formatCurrency(property.price)}
            </p>
          </div>
          
          <div className="flex items-center text-gray-500 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <p className="text-sm line-clamp-1">{property.address}</p>
          </div>
          
          <div className="flex items-center text-gray-500 mb-3">
            <Building className="h-4 w-4 mr-1" />
            <p className="text-sm">{property.neighborhood}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-sm">{property.squareFeet} sqft</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Link href={`/properties/${property.id}`} className="w-full">
            <Button variant="primary" className="w-full">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;