import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import DeleteWorkspaceDialog from "./DeleteWorkspaceDialog";
import EditWorkspaceModel from "./EditWorkspace";
import CreateBoardDialog from "./CreateBoardDialog";

interface Props {
  workspaceId: string;
  title: string;
}
const MoreButton = ({ workspaceId, title }: Props) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <CreateBoardDialog workspaceId={workspaceId} />,
    },
    {
      key: "2",
      label: <EditWorkspaceModel title={title} workspaceId={workspaceId} />,
    },
    {
      key: "3",
      label: <DeleteWorkspaceDialog workspaceId={workspaceId} />,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
      <MoreOutlined size={40} style={{ fontSize: 25 }} />
    </Dropdown>
  );
};

export default MoreButton;
