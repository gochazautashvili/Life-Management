import Activity from "./Activity";

interface Props {
  params: { workspaceId: string };
}

const ActivityPage = ({ params: { workspaceId } }: Props) => {
  return <Activity workspaceId={workspaceId} />;
};

export default ActivityPage;
