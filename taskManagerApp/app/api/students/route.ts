// app/api/students/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/app/utility/prismadb";

type UserData = {
    id: string;
    name: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserData[] | { error: string; message?: string }>
) {
  try {
    // Retrieve student users who are not admins
    const users = await prisma.users.findMany({
      where: { isAdmin: false },
      select: {
        id: true, 
        name: true, 
        // other fields you need
      },
    });

    // Send the retrieved users as a JSON response
    res.status(200).json(users);
} catch (error: any) {
    // If there's an error, log it and return a 500 error response
    console.error("Request error", error);
    res.status(500).json({ error: "Error fetching users", message: error.message });
}};