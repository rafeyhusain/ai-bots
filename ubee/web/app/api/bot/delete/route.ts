import { prisma } from "@/lib/prisma";
import { Response } from '@/lib/Response/Response';
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams;
  const botId = params.get('botId') as string;

  try {
    await prisma.bot.delete({
      where: {
        id: botId,
      },
    });
    
    return NextResponse.json({"status": "success"});
  } catch (error: any) {
    const response = Response.send(500, error); 

    return response;
  }
}
