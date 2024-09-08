import { Loading3QuartersOutlined } from "@ant-design/icons";

const loading = () => {
  return (
    <div className="flex items-center justify-center w-full mt-24">
      <Loading3QuartersOutlined style={{ fontSize: 28 }} spin />
    </div>
  );
};

export default loading;
