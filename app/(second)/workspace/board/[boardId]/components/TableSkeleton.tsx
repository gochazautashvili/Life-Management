const TableSkeleton = () => {
  return (
    <>
      <div className="w-full flex flex-col p-4 rounded bg-slate-500 animate-pulse">
        <div className="w-full max-w-[240px] h-3 rounded bg-slate-300 animate-pulse"></div>
        <div className="w-full h-5 rounded bg-slate-300 animate-pulse mt-3 mb-5"></div>
        <div className="w-full max-w-[80px] h-3 rounded bg-slate-300 animate-pulse"></div>
      </div>
      <div className="w-full flex flex-col p-4 rounded bg-slate-500 animate-pulse">
        <div className="w-full max-w-[140px] h-3 rounded bg-slate-300 animate-pulse"></div>
        <div className="w-full h-7 rounded bg-slate-300 animate-pulse mt-3 mb-5"></div>
        <div className="w-full max-w-[80px] h-3 rounded bg-slate-300 animate-pulse"></div>
      </div>
      <div className="w-full flex flex-col p-4 rounded bg-slate-500 animate-pulse">
        <div className="w-full max-w-[200px] h-3 rounded bg-slate-300 animate-pulse"></div>
        <div className="w-full h-3 rounded bg-slate-300 animate-pulse mt-3 mb-5"></div>
        <div className="w-full max-w-[80px] h-3 rounded bg-slate-300 animate-pulse"></div>
      </div>
    </>
  );
};

export default TableSkeleton;
