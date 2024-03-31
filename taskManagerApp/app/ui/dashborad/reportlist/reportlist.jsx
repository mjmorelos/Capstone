"use client";

import React from "react";
import Image from "next/image";
import styles from "@/app/ui/dashborad/reportlist/reportlist.module.css";
import { useState, useEffect } from "react";
import defaultAvatar from "@/public/noavatar.png";

const Reportlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("../../api/students", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Hours Tracking</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Hours (Feb)</td>
            <td>Next Event</td>
            <td>Event Status</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.avatar || defaultAvatar}
                    width={40}
                    height={40}
                    className={styles.userImage}
                    alt={user.name}
                  />
                  {user.name}
                </div>
              </td>
              <td>
                <span className={styles.hour}>{user.hoursCurrentMonth} </span>/{" "}
                {user.hoursTotalMonth}
              </td>
              <td>
                <span className={styles.hour}>{user.hoursYearToDate} </span>/{" "}
                {user.hoursTotalYear}
              </td>
              <td>{user.hourBank}</td>
              <td>{user.nextEventDate}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reportlist;
