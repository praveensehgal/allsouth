import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("TESTIMONIALS_GET_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const testimonial = await prisma.testimonial.create({
      data: body
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("TESTIMONIAL_CREATE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}