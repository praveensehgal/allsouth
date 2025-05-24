import { Suspense } from "react";
import PropertiesClient from "@/components/properties-client";
import { Badge } from "@/components/ui/badge";

export default function PropertiesPage() {
  return (
    <div className="pt-8 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge variant="default" className="mb-4">Investment Properties</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Exclusive Richmond <span className="text-[#003366] dark:text-[#0066CC]">Investment Properties</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Browse our curated selection of off-market and distressed properties in Richmond's 
            most desirable neighborhoods. Filter by your investment criteria to find the perfect opportunity.
          </p>
        </div>

        <Suspense fallback={<PropertiesLoading />}>
          <PropertiesClient />
        </Suspense>
      </div>
    </div>
  );
}

function PropertiesLoading() {
  return (
    <div className="text-center py-12">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Loading properties...</p>
    </div>
  );
}