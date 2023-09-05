import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Response } from '@/lib/Response/Response';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams;
  const page = Number(params.get('page')) || 1;
  const perPage = 10;

  try {
    const bots = await prisma.bot.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return NextResponse.json(bots);
  } catch (error: any) {
    const response = Response.error(error); 

    return response;
  }
}

