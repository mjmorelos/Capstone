import React from "react";
import Image from "next/image";
import styles from "@/app/ui/dashborad/reportlist/reportlist.module.css";
import { fetchUsersPrint } from "@/app/utility/data";


const Reportlist = async () => {

  const { users } = await fetchUsersPrint();

  return (
    <div>
      <h1>Students List</h1>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <td>Image</td>
            <td>Name</td>
            <td>Phone</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Image
                  src={user.image || "/noavatar.png"}
                  width={40}
                  height={40}
                  className={styles.userImage}
                  alt="user1"
                />
              </td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default Reportlist;