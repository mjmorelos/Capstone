"use client";

import React from "react";
import Image from "next/image";
import styles from "@/app/ui/dashborad/reportlist/reportlist.module.css";
import { useState, useEffect } from "react";
import defaultAvatar from "@/public/noavatar.png";

const Reportlist = () => {
  const [users, setUsers] = useState([]);

  // Helper function to generate a random date between two dates
  const randomDate = (start, end) => {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };

  // Helper function to format date to a readable string
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

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

        let data = await response.json();
        const currentDate = new Date();

        // Add dummy data to each user
        data = data.map((user) => {
          const randomEventDate = randomDate(
            new Date(2024, 0, 1),
            new Date(2024, 11, 31)
          );
          const eventStatus =
            randomEventDate < currentDate ? "Completed" : "Pending";
          return {
            ...user,
            hoursCurrentMonth: Math.floor(Math.random() * 30) + 1,
            hoursTotalMonth: 30,
            nextEventDate: formatDate(randomEventDate),
            eventStatus,
          };
        });

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
                    src={user.image || defaultAvatar} // Adjust the path to your default avatar image if different
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
              <td>{user.nextEventDate}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    styles[user.eventStatus.toLowerCase().replace(" ", "")]
                  }`}
                >
                  {user.eventStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reportlist;
