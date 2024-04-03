import { NextResponse } from "next/server";
import prisma from "@/app/utility/prismadb";
import { NextApiRequest, NextApiResponse } from 'next';

// import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      try {
        // Fetch all users who are not admins
        const nonAdminUsers = await prisma.users.findMany({
          where: {
            isAdmin: false,
          },
          select: {
            name: true,
            image: true,
          },
        });
  
        res.status(200).json(nonAdminUsers);
      } catch (error) {
        // Handle any errors
        res.status(500).json({ error: "Failed to fetch data" });
      }
    } else {
      // Method Not Allowed
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
