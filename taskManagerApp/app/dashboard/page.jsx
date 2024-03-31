import Card1 from "../ui/dashborad/card/card1";
import Reportlist from "../ui/dashborad/reportlist/reportlist";
import styles from "../ui/dashborad/dashboard.module.css";
import Card2 from "../ui/dashborad/card/card2";
import Card3 from "../ui/dashborad/card/card3";
import Chart from "../ui/dashborad/chart/chart";

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
