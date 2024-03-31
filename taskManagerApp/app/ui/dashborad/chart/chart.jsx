"use client";
import styles from "./chart.module.css";
import { BsStarFill } from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

const data = [
  {
    name: "Sun",
    hours: 12,
  },
  {
    name: "Mon",
    hours: 6,
  },
  {
    name: "Tue",
    hours: 8,
  },
  {
    name: "Wed",
    hours: 4,
  },
  {
    name: "Thu",
    hours: 6,
  },
  {
    name: "Fri",
    hours: 11,
  },
  {
    name: "Sat",
    hours: 13,
  },
];

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const getRandomHours = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

//------------------------------------
const Chart = () => {
  const [userData, setUserData] = useState([]);

  const getIntroOfPage = (label, userData) => {
    const user = userData.find((user) => user.name === label);
    if (user) {
      return `${user.name} has completed ${user.Hours} hours this month.`;
    }
    return "";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Pass the userData state to getIntroOfPage function
      const intro = getIntroOfPage(label, userData);
      return (
        <div className={styles.customtooltip}>
          <p
            className={styles.label}
          >{`${label} : ${payload[0].value} Hours`}</p>
          <p className="intro">{intro}</p>
          <p className="desc">
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
          </p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    const fetchUserData = async () => {
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
        // Assign random hours to each user for dummy data
        data = data.map((user) => ({
          ...user,
          Hours: getRandomHours(20, 40), // Dummy data: random hours between 20 and 40
        }));
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <div className={styles.container2}>
        <h2 className={styles.title}>Monthly Hours Tracking</h2>
        <ResponsiveContainer width="90%" height="80%">
          <BarChart
            width={500}
            height={300}
            data={userData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip userData={userData} />} />
            <Legend />
            <Bar dataKey="Hours" barSize={40} fill="#3461FD" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.container1}>
        <h2 className={styles.title}>Weekly Events Recap</h2>
        <ResponsiveContainer width="90%" height="80%">
          <BarChart
            width={1000}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar
              dataKey="hours"
              fill="#FD4C34"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
