import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchBots } from '@/lib/bot/fetch';
import { deleteBot } from '@/lib/bot/delete';

interface Bot {
  id: string;
  name: string;
  description: string;
}

const BotList: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [selectedBots, setSelectedBots] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    // Fetch bots data from your API
    const fetchData = async () => {
      const data = await fetchBots(currentPage);
      setBots(data);
    };
    fetchData();
  }, [currentPage]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete selected bots?')) {
      await Promise.all(selectedBots.map(botId => deleteBot(botId)));
      // Refresh the bot list after deletion
      const data = await fetchBots(currentPage);
      setBots(data);
      setSelectedBots([]);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Bot List</h1>
      <Link href="/bot-editor" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Bot
      </Link>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleDelete}
      >
        Delete Selected
      </button>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="py-2"></th>
            <th className="py-2">Name</th>
            <th className="py-2">Description</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {bots.map((bot) => (
            <tr key={bot.id}>
              <td className="py-2">
                <input
                  type="checkbox"
                  onChange={() => {
                    if (selectedBots.includes(bot.id)) {
                      setSelectedBots(selectedBots.filter((id) => id !== bot.id));
                    } else {
                      setSelectedBots([...selectedBots, bot.id]);
                    }
                  }}
                />
              </td>
              <td className="py-2">{bot.name}</td>
              <td className="py-2">{bot.description}</td>
              <td className="py-2">
                <Link href={`/edit-bot/${bot.id}`} className="text-blue-500 hover:underline">
                Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add pagination controls */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ml-2"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default BotList;
