import client from "@/app/utility/prismadb";

async function getStudentUsers() {
  const studentUsers = await client.users.findMany({
    where: {
      isAdmin: false,
    },
    select: {
      id: true, 
      name: true, 
    },
  });
  return studentUsers;
}
export default getStudentUsers;