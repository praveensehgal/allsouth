"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ResourceCardProps {
  resource: {
    id: string;
    title: string;
    description: string;
    category: string;
    image?: string;
    downloadUrl?: string;
    createdAt: Date | string;
  };
  index: number;
}

const ResourceCard = ({ resource, index }: ResourceCardProps) => {
  const date = new Date(resource.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={resource.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"}
            alt={resource.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 bg-[#003366] text-white text-xs px-2 py-1 rounded">
            {resource.category}
          </div>
        </div>

        <CardContent className="flex-grow p-5">
          <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{resource.description}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex justify-between">
          <Link href={`/resources/${resource.id}`}>
            <Button variant="outline" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Read More
            </Button>
          </Link>
          
          {resource.downloadUrl && (
            <a href={resource.downloadUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </a>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ResourceCard;