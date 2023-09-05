import { Bot } from "@prisma/client";

export async function fetchBots(page: number): Promise<Bot[]> {
  const apiUrl = `/api/bot/fetch?page=${page}`;

  const response = await fetch(apiUrl, {
    method: 'GET',
  });

  if (response.ok) {
    const bots = await response.json();
    return bots;
  } else {
    throw new Error('Failed to fetch bots');
  }
}
