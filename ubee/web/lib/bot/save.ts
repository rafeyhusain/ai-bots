import { Bot } from "@prisma/client";

export async function save(botId: string | null, botData: Partial<Bot>): Promise<Bot | null> {
    const apiUrl = `/api/bot/save${botId ? `?botId=${botId}` : ''}`;
  
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(botData),
    });
  
    if (response.ok) {
      const savedBot = await response.json();
      return savedBot;
    } else {
      throw new Error('Failed to save bot');
    }
  }
  