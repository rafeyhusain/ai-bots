import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const botData = req.body; // Assuming you send bot data in the request body
    const botId = req.query.botId as string | undefined;

    try {
      const bot = await prisma.bot.upsert({
        where: {
          id: botId,
        },
        create: botData,
        update: botData,
      });
      res.status(200).json(bot);
    } catch (error) {
      console.error('Error saving bot:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
