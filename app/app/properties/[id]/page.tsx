"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Heart, 
  Tag, 
  AlertTriangle, 
  Building, 
  ArrowLeft, 
  HomeIcon, 
  Calendar, 
  CheckCircle, 
  XCircle,
  Share2,
  TrendingUp,
  BellRing
} from "lucide-react";
import { toast } from "react-hot-toast";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadForm from "@/components/lead-form";
import MortgageCalculator from "@/components/mortgage-calculator";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  propertyType: string;
  features: string[];
  isOffMarket: boolean;
  isDistressed: boolean;
  distressedType?: string;
  discountPercentage?: number;
  rentalYield?: number;
  potentialROI?: number;
  images: string[];
}

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/properties/${params.id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch property");
        }
        
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
        toast.error("Failed to load property details. Please try again.");
        
        // Fallback to sample data for demo purposes
        setProperty({
          id: params.id as string,
          title: "Historic Fan District Victorian",
          description: "This stunning Victorian home in Richmond's historic Fan District offers a perfect blend of classic architecture and modern updates. With 4 bedrooms and 2.5 bathrooms spread across 2,800 square feet, this property provides ample space for comfortable living or a lucrative rental opportunity.\n\nThe property features original hardwood floors, high ceilings, and period details throughout, complemented by a renovated kitchen with stainless steel appliances and updated bathrooms. The spacious primary suite includes a walk-in closet and en-suite bathroom.\n\nLocated just steps from restaurants, shops, and parks, this home offers the perfect urban lifestyle in one of Richmond's most desirable neighborhoods. The property includes a detached garage and a beautifully landscaped backyard with a patio perfect for entertaining.\n\nThis off-market opportunity is priced 12% below comparable properties in the area, offering instant equity and strong appreciation potential. The Fan District consistently shows strong rental demand with potential yields of 6-7%.",
          price: 425000,
          address: "2145 Park Avenue",
          city: "Richmond",
          state: "VA",
          zipCode: "23220",
          neighborhood: "The Fan District",
          bedrooms: 4,
          bathrooms: 2.5,
          squareFeet: 2800,
          yearBuilt: 1915,
          propertyType: "Single-Family Home",
          features: [
            "Original hardwood floors",
            "High ceilings",
            "Updated kitchen with stainless steel appliances",
            "Renovated bathrooms",
            "Central heating and air conditioning",
            "Detached garage",
            "Fenced backyard with patio",
            "Walk-in closets",
            "Fireplace",
            "Close to restaurants and shops"
          ],
          isOffMarket: true,
          isDistressed: false,
          discountPercentage: 12,
          rentalYield: 6.5,
          potentialROI: 15.2,
          images: [
            "https://live.staticflickr.com/65535/47824230542_6584c5ce84_b.jpg",
            "https://whyrichmondisawesome.com/wp-content/uploads/021_Museum_District_104771_149325-640x427.jpg",
            "https://i.pinimg.com/736x/ab/9d/65/ab9d65468b388d789f26cc4ec17015e8.jpg"
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    const checkIfSaved = async () => {
      if (!session) return;
      
      try {
        const response = await fetch("/api/saved-properties");
        
        if (response.ok) {
          const data = await response.json();
          const isSavedProperty = data.some((item: any) => item.propertyId === params.id);
          setIsSaved(isSavedProperty);
        }
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };

    fetchProperty();
    checkIfSaved();
  }, [params.id, session]);

  const handleSaveProperty = async () => {
    if (!session) {
      toast.error("Please login to save properties");
      router.push("/login");
      return;
    }

    setIsSaving(true);
    try {
      if (isSaved) {
        // Find the saved property entry
        const response = await fetch("/api/saved-properties");
        if (!response.ok) {
          throw new Error("Failed to fetch saved properties");
        }
        
        const data = await response.json();
        const savedProperty = data.find((item: any) => item.propertyId === property?.id);
        
        if (!savedProperty) {
          throw new Error("Saved property not found");
        }

        const deleteResponse = await fetch(`/api/saved-properties/${savedProperty.id}`, {
          method: "DELETE",
        });

        if (!deleteResponse.ok) {
          throw new Error("Failed to remove property");
        }

        setIsSaved(false);
        toast.success("Property removed from saved list");
      } else {
        const response = await fetch("/api/saved-properties", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId: property?.id }),
        });

        if (!response.ok) {
          throw new Error("Failed to save property");
        }

        setIsSaved(true);
        toast.success("Property saved successfully");
      }
    } catch (error) {
      console.error("Error saving/removing property:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: `Check out this property: ${property?.title}`,
        url: window.location.href,
      })
      .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <AlertTriangle className="h-12 w-12 mx-auto text-[#FFC107] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Property Not Found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We couldn't find the property you're looking for. It may have been removed or sold.
          </p>
          <Link href="/properties">
            <Button variant="primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/properties">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{property.title}</h1>
            <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
              <MapPin className="h-5 w-5 mr-1" />
              <p>{property.address}, {property.city}, {property.state} {property.zipCode}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end">
            <p className="text-3xl font-bold text-[#003366] dark:text-[#0066CC]">
              {formatCurrency(property.price)}
            </p>
            {property.discountPercentage && (
              <Badge variant="accent" className="mt-1">
                <Tag className="h-3 w-3 mr-1" />
                {property.discountPercentage}% Below Market Value
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {property.isOffMarket && (
            <Badge variant="offMarket">Off-Market Property</Badge>
          )}
          {property.isDistressed && (
            <Badge variant="distressed">{property.distressedType || "Distressed Property"}</Badge>
          )}
          <Badge variant="secondary">{property.neighborhood}</Badge>
          <Badge variant="secondary">{property.propertyType}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
            <Image
              src={property.images[activeImageIndex] || "https://ufundinvestment.com/wp-content/uploads/2019/12/%E5%B0%81%E9%9D%A2.jpg"}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          
          {property.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mb-6">
              {property.images.map((image, index) => (
                <div 
                  key={index}
                  className={`relative aspect-[4/3] rounded-md overflow-hidden cursor-pointer border-2 ${
                    activeImageIndex === index ? "border-[#003366]" : "border-transparent"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={isSaved ? "accent" : "outline"} 
              className="flex items-center"
              onClick={handleSaveProperty}
              disabled={isSaving}
            >
              <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Saved" : "Save Property"}
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <Tabs defaultValue="details" className="mb-8">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">Property Details</TabsTrigger>
              <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
              <TabsTrigger value="investment" className="flex-1">Investment Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-1">
                    <Bed className="h-4 w-4 mr-1" />
                    Bedrooms
                  </div>
                  <p className="text-lg font-semibold">{property.bedrooms}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-1">
                    <Bath className="h-4 w-4 mr-1" />
                    Bathrooms
                  </div>
                  <p className="text-lg font-semibold">{property.bathrooms}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-1">
                    <Square className="h-4 w-4 mr-1" />
                    Square Feet
                  </div>
                  <p className="text-lg font-semibold">{property.squareFeet.toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Year Built
                  </div>
                  <p className="text-lg font-semibold">{property.yearBuilt}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Description</h3>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {property.description}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="pt-4">
              <h3 className="text-xl font-semibold mb-4">Property Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#2E7D32] mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="investment" className="pt-4">
              <h3 className="text-xl font-semibold mb-4">Investment Potential</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {property.discountPercentage && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <Tag className="h-4 w-4 mr-1" />
                      Below Market Value
                    </div>
                    <p className="text-2xl font-semibold text-[#FFC107]">{property.discountPercentage}%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Instant equity potential
                    </p>
                  </div>
                )}
                
                {property.rentalYield && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <Building className="h-4 w-4 mr-1" />
                      Potential Rental Yield
                    </div>
                    <p className="text-2xl font-semibold text-[#2E7D32]">{property.rentalYield}%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Annual gross rental yield
                    </p>
                  </div>
                )}
                
                {property.potentialROI && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Potential ROI (5yr)
                    </div>
                    <p className="text-2xl font-semibold text-[#0066CC]">{property.potentialROI}%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Estimated 5-year return
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mb-6">
                <h4 className="text-lg font-semibold mb-2">Richmond Market Insights</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The Richmond real estate market has seen a <span className="font-semibold">114.76% appreciation</span> over the past decade, 
                  averaging <span className="font-semibold">10% annually</span>. The {property.neighborhood} neighborhood is particularly 
                  desirable due to its {property.neighborhood === "The Fan District" || property.neighborhood === "Church Hill" ? 
                  "historic character and proximity to downtown" : 
                  property.neighborhood === "Scott's Addition" ? 
                  "trendy restaurants, breweries, and urban renewal" : 
                  "strong rental demand and growth potential"}.
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-[#003366]/10 rounded-full flex items-center justify-center mr-3">
                    <HomeIcon className="h-5 w-5 text-[#003366]" />
                  </div>
                  <div>
                    <p className="font-semibold">{property.neighborhood} Market Trend</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Strong appreciation potential with high rental demand
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <LeadForm 
            propertyId={property.id}
            source="property-detail"
            title="Interested in this property?"
            subtitle="Contact us for more information or to schedule a viewing."
          />
          
          <MortgageCalculator propertyPrice={property.price} />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Similar Properties You Might Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* This would typically fetch similar properties from the API */}
          {/* For demo purposes, we'll just show placeholder content */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
            <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Looking for Similar Properties?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We have more properties like this one that might interest you.
            </p>
            <Link href="/properties">
              <Button variant="primary" className="w-full">
                Browse More Properties
              </Button>
            </Link>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-[#FFC107] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Don't Miss Out</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Off-market properties like this one sell quickly. Contact us today to secure this investment.
            </p>
            <Button 
              variant="accent" 
              className="w-full"
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Us Now
            </Button>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
            <BellRing className="h-12 w-12 mx-auto text-[#2E7D32] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Get Property Alerts</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Sign up for alerts to be notified when similar properties become available.
            </p>
            <Link href="/register">
              <Button variant="success" className="w-full">
                Create Alert
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}