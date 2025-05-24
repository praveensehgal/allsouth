import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(resources);
  } catch (error) {
    console.error("RESOURCES_GET_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const resource = await prisma.resource.create({
      data: body
    });

    return NextResponse.json(resource);
  } catch (error) {
    console.error("RESOURCE_CREATE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}