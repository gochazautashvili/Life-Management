import { getTasksCount } from "@/actions/account";
import AccountDataCounts from "./components/AccountDataCounts";
import ActivityTable from "./components/ActivityTable";

const Home = async () => {
  const data = await getTasksCount();

  return (
    <div>
      <AccountDataCounts data={data} />
      <ActivityTable />
    </div>
  );
};

export default Home;
