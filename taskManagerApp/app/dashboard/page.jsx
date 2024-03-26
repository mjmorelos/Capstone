import { useSession } from "next-auth/react";
import Card1 from "../ui/dashboard/card/card1";
import Reportlist from "../ui/dashboard/reportlist/reportlist";
import styles from "../ui/dashboard/dashboard.module.css";
import Card2 from "../ui/dashboard/card/card2";
import Card3 from "../ui/dashboard/card/card3";
import Chart from "../ui/dashboard/chart/chart";

const Dashboard = () => {

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
