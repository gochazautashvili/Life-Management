import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import DeleteTableModel from "./DeleteTableModel";
import AddTaskModel from "./AddTaskModel";

interface Props {
  tableId: string;
  boardId: string;
  workspaceId: string;
}
const TableMoreButton = ({ tableId, boardId, workspaceId }: Props) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <AddTaskModel
          boardId={boardId}
          tableId={tableId}
          workspaceId={workspaceId}
        />
      ),
    },
    {
      key: "2",
      label: (
        <DeleteTableModel
          workspaceId={workspaceId}
          boardId={boardId}
          tableId={tableId}
        />
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
      <MoreOutlined size={40} style={{ fontSize: 22 }} />
    </Dropdown>
  );
};

export default TableMoreButton;
