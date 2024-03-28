import { useSession } from "next-auth/react";
import Card1 from "../ui/dashborad/card/card1";
import Reportlist from "../ui/dashborad/reportlist/reportlist";
import styles from "../ui/dashborad/dashboard.module.css";
import Card2 from "../ui/dashborad/card/card2";
import Card3 from "../ui/dashborad/card/card3";
import Chart from "../ui/dashborad/chart/chart";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied. Please log in.</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <div className={styles.card1}>
            <Card1 />
          </div>
          <div className={styles.card2}>
            <Card2 />
          </div>
          <div className={styles.card3}>
            <Card3 />
          </div>
        </div>
        <Reportlist />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
