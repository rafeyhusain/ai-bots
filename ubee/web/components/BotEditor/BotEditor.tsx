import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bot } from '@prisma/client';
import { save } from '@/lib/bot/save'

interface BotEditorProps {
  botId: string;
}

const BotEditor: React.FC<BotEditorProps> = ({ botId }) => {
  const [botData, setBotData] = useState<Partial<Bot>>({
    name: '',
    description: '',
    // Add other fields from your Bot model here
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBotData({
      ...botData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      // Add validation logic here and update errors state if validation fails
      // Example: if (!botData.name) setErrors({ ...errors, name: 'Name is required' });

      if (Object.keys(errors).length === 0) {
        await save(botId, botData); // Save bot data to the API
        // Handle successful save and possibly navigate back to BotList
        router.push('/bot-list');
      }
    } catch (error) {
      // Handle API request error
    }
  };

  const handleUpload = async (files: FileList | null) => {
    if (files) {
      try {
        // Handle file upload and call uploadPersonaFiles API function
        //await uploadPersonaFiles(botId, files);
      } catch (error) {
        // Handle file upload error
      }
    }
  };

  const handleCancel = () => {
    // Navigate back to the BotList component
    // You can use next/link for this
    router.push('/bot-list');
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Edit Bot</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={botData.name || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
          {errors.name && <p className="text-red-500 mt-2">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            name="description"
            value={botData.description || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
          {errors.description && <p className="text-red-500 mt-2">{errors.description}</p>}
        </div>
        {/* Add more fields here */}
        <div className="mb-4">
          <label className="block text-gray-700">Persona Files:</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleUpload(e.target.files)}
            className="w-full"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        >
          Save
        </button>
        <Link href="/bot-list">
          <a className="text-blue-500 hover:underline">Cancel</a>
        </Link>
      </form>
    </div>
  );
};

export default BotEditor;
