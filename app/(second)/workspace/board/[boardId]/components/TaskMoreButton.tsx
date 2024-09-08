import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import DeleteTaskModel from "./DeleteTaskModel";

interface Props {
  boardId: string;
  taskId: string;
  workspaceId: string;
}

const TaskMoreButton = ({ boardId, taskId, workspaceId }: Props) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <DeleteTaskModel
          workspaceId={workspaceId}
          boardId={boardId}
          taskId={taskId}
        />
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
      <MoreOutlined
        size={40}
        style={{ fontSize: 22 }}
        className="absolute top-3 right-3 cursor-pointer opacity-0 group-hover:opacity-100"
      />
    </Dropdown>
  );
};

export default TaskMoreButton;
