"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    role?: string;
    content: string;
    rating: number;
    image?: string;
  };
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
              <Image
                src={testimonial.image || "https://i.pravatar.cc/150?img=" + (index + 10)}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold text-lg">{testimonial.name}</h4>
              {testimonial.role && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              )}
            </div>
          </div>

          <div className="flex mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < testimonial.rating
                    ? "text-[#FFC107] fill-[#FFC107]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;