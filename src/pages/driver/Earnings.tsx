import { useEarningDetailsQuery } from "@/redux/features/driver/driver.api";

const Earnings = () => {
  const { data } = useEarningDetailsQuery(undefined);
  console.log(data);
  return <div>all earings</div>;
};

export default Earnings;
