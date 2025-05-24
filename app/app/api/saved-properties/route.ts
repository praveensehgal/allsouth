import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const savedProperties = await prisma.savedProperty.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        property: true
      }
    });

    return NextResponse.json(savedProperties);
  } catch (error) {
    console.error("SAVED_PROPERTIES_GET_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { propertyId } = body;

    if (!propertyId) {
      return new NextResponse("Property ID is required", { status: 400 });
    }

    const savedProperty = await prisma.savedProperty.create({
      data: {
        userId: session.user.id,
        propertyId
      }
    });

    return NextResponse.json(savedProperty);
  } catch (error) {
    console.error("SAVED_PROPERTY_CREATE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}