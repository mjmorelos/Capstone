import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/app/utility/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Extract the task details from the request body
      const { task, startDate, endDate, location, description, userId } = req.body;

      // Use Prisma client to add the new task to the database
    const newTask = await prisma.tasks.create({
        data: {
            task,
            startDate: new Date(startDate), // Assuming startDate is in a format that can be converted to a JavaScript Date object
            endDate: new Date(endDate),     // Same assumption as above
            location,
            description,
            // userId should be obtained from the session or auth context
            userId, // Ensure that you have the correct userId from the authenticated user
            v: 0, // Add the required property 'v'
            updatedAt: new Date(), // Add the required property 'updatedAt'
        },
    });

    // Respond with the newly created task data
    res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create task" });
    }
  } else {
    // Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}