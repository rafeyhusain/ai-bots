export async function deleteBot(botId: string): Promise<void> {
  const apiUrl = `/api/bot/delete?botId=${botId}`;

  const response = await fetch(apiUrl, {
    method: 'DELETE',
  });

  if (response.ok) {
    return;
  } else {
    throw new Error('Failed to delete bot');
  }
}
