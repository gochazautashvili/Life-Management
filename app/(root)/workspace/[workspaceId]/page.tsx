import { Suspense } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import Boards from "./components/Boards";

interface Props {
  params: {
    workspaceId: string;
  };
}

const WorkspacePage = ({ params: { workspaceId } }: Props) => {
  return (
    <section>
      <Suspense
        key={workspaceId}
        fallback={
          <div className="flex items-center justify-center w-full my-20">
            <Loading3QuartersOutlined style={{ fontSize: 40 }} spin />
          </div>
        }
      >
        <Boards workspaceId={workspaceId} />
      </Suspense>
    </section>
  );
};

export default WorkspacePage;
