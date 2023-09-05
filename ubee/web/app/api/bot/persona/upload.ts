import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/lib/prisma";
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const botId = req.query.botId as string | undefined;

    if (!botId) {
      res.status(400).json({ error: 'Bot ID is required' });
      return;
    }

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'File upload failed' });
        return;
      }

      const uploadDir = path.join(process.cwd(), 'uploads', botId);

      try {
        await fs.mkdir(uploadDir, { recursive: true });

        const fileNames: string[] = [];

        for (const key of Object.keys(files)) {
          const file = files[key] as formidable.File[];

          const fileName = `${Date.now()}_${file[0].originalFilename}`;
          const filePath = path.join(uploadDir, fileName);

          //await fs.writeFile(filePath, file[0].);

          const newPersona = await prisma.persona.create({
            data: {
              botId: botId,
              fileName: fileName,
            },
          });

          fileNames.push(newPersona.fileName);
        }

        res.status(200).json({ fileNames });
      } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
