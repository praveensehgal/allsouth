import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const savedProperty = await prisma.savedProperty.findUnique({
      where: {
        id: params.id
      }
    });

    if (!savedProperty) {
      return new NextResponse("Saved property not found", { status: 404 });
    }

    if (savedProperty.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.savedProperty.delete({
      where: {
        id: params.id
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("SAVED_PROPERTY_DELETE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}