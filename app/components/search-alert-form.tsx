"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { BellRing, DollarSign, Home, MapPin, Bed, Bath } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { formatCurrency, propertyTypes, neighborhoods } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "Alert name must be at least 2 characters" }),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  propertyType: z.string().optional(),
  neighborhood: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
});

interface SearchAlertFormProps {
  onSuccess?: () => void;
  className?: string;
}

const SearchAlertForm = ({ onSuccess, className = "" }: SearchAlertFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([100000, 1000000]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      minPrice: 100000,
      maxPrice: 1000000,
      propertyType: "",
      neighborhood: "",
      bedrooms: "",
      bathrooms: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Update price range from slider
      values.minPrice = priceRange[0];
      values.maxPrice = priceRange[1];

      const response = await fetch("/api/search-alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create search alert");
      }

      form.reset();
      toast.success("Search alert created successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Search alert creation error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#003366] dark:text-[#0066CC] flex items-center justify-center">
          <BellRing className="h-6 w-6 mr-2 text-[#FFC107]" />
          Create Property Alert
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Get notified when new properties matching your criteria become available.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alert Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., My Dream Investment Property" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
              Price Range
            </FormLabel>
            <div className="px-2">
              <Slider
                value={priceRange}
                min={50000}
                max={2000000}
                step={10000}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                className="my-4"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span>{formatCurrency(priceRange[0])}</span>
              <span>{formatCurrency(priceRange[1])}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Home className="h-4 w-4 mr-1 text-gray-500" />
                    Property Type
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Property Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Any Property Type</SelectItem>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    Neighborhood
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Neighborhood" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Any Neighborhood</SelectItem>
                      {neighborhoods.map((hood) => (
                        <SelectItem key={hood} value={hood}>
                          {hood}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Bed className="h-4 w-4 mr-1 text-gray-500" />
                    Bedrooms
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Bedrooms" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Any Bedrooms</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Bath className="h-4 w-4 mr-1 text-gray-500" />
                    Bathrooms
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Bathrooms" />
                      </SelectTrigger>
                    </FormControl>
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
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full mt-6" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Creating Alert..."
            ) : (
              <>
                <BellRing className="h-4 w-4 mr-2" />
                Create Alert
              </>
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default SearchAlertForm;