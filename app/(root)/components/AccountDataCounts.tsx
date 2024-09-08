"use client";
interface Props {
  data: {
    count: number;
    name: string;
  }[];
}

const AccountDataCounts = ({ data }: Props) => {
  return (
    <>
      <h1 className="text-base font-semibold mb-2">Your Account Data:</h1>
      <ol className="flex items-center flex-wrap gap-4 justify-between">
        {data.map((item, i) => (
          <li
            className="flex items-center justify-center gap-2 h-[40px] bg-white/20 shadow-md font-semibold px-5 flex-1"
            key={i}
          >
            {item.name}: <span className="font-medium"> {item.count}</span>
          </li>
        ))}
      </ol>
    </>
  );
};

export default AccountDataCounts;
