import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session?.user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error("LEADS_GET_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, propertyId, source } = body;

    if (!name || !email) {
      return new NextResponse("Name and email are required", { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        message,
        propertyId,
        source,
        userId
      }
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error("LEAD_CREATE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}