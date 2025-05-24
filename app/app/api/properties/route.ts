import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice') as string) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice') as string) : undefined;
    const propertyType = searchParams.get('propertyType') || undefined;
    const neighborhood = searchParams.get('neighborhood') || undefined;
    const bedrooms = searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms') as string) : undefined;
    const bathrooms = searchParams.get('bathrooms') ? parseFloat(searchParams.get('bathrooms') as string) : undefined;
    const isOffMarket = searchParams.get('isOffMarket') === 'true' ? true : undefined;
    const isDistressed = searchParams.get('isDistressed') === 'true' ? true : undefined;

    const properties = await prisma.property.findMany({
      where: {
        ...(minPrice && { price: { gte: minPrice } }),
        ...(maxPrice && { price: { lte: maxPrice } }),
        ...(propertyType && { propertyType }),
        ...(neighborhood && { neighborhood }),
        ...(bedrooms && { bedrooms }),
        ...(bathrooms && { bathrooms }),
        ...(isOffMarket !== undefined && { isOffMarket }),
        ...(isDistressed !== undefined && { isDistressed }),
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("PROPERTIES_GET_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const property = await prisma.property.create({
      data: body
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("PROPERTY_CREATE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}