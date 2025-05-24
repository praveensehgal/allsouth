import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const searchAlert = await prisma.searchAlert.findUnique({
      where: {
        id: params.id
      }
    });

    if (!searchAlert) {
      return new NextResponse("Search alert not found", { status: 404 });
    }

    if (searchAlert.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await request.json();
    
    const updatedSearchAlert = await prisma.searchAlert.update({
      where: {
        id: params.id
      },
      data: body
    });

    return NextResponse.json(updatedSearchAlert);
  } catch (error) {
    console.error("SEARCH_ALERT_UPDATE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const searchAlert = await prisma.searchAlert.findUnique({
      where: {
        id: params.id
      }
    });

    if (!searchAlert) {
      return new NextResponse("Search alert not found", { status: 404 });
    }

    if (searchAlert.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.searchAlert.delete({
      where: {
        id: params.id
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("SEARCH_ALERT_DELETE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}