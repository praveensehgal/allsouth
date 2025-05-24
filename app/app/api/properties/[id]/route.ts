import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id: params.id
      }
    });

    if (!property) {
      return new NextResponse("Property not found", { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("PROPERTY_GET_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const property = await prisma.property.update({
      where: {
        id: params.id
      },
      data: body
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("PROPERTY_UPDATE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.property.delete({
      where: {
        id: params.id
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("PROPERTY_DELETE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}