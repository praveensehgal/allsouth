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

    const searchAlerts = await prisma.searchAlert.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(searchAlerts);
  } catch (error) {
    console.error("SEARCH_ALERTS_GET_ERROR", error);
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
    
    const searchAlert = await prisma.searchAlert.create({
      data: {
        ...body,
        userId: session.user.id
      }
    });

    return NextResponse.json(searchAlert);
  } catch (error) {
    console.error("SEARCH_ALERT_CREATE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}