import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import DeleteBoardConfirm from "./DeleteBoardConfirm";
import EditBoardModel from "./EditBoard";
import { Board } from "@prisma/client";

interface Props {
  board: Board;
}

const BorderMoreButton = ({ board }: Props) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <EditBoardModel
          image={board.background}
          title={board.title}
          boardId={board.id}
          workspaceId={board.workspaceId}
        />
      ),
    },
    {
      key: "2",
      label: (
        <DeleteBoardConfirm
          boardId={board.id}
          workspaceId={board.workspaceId}
        />
      ),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} placement="bottomLeft" arrow>
        <MoreOutlined
          className="absolute top-3 right-3 group-hover:opacity-100 opacity-0 z-10 text-xl"
          size={40}
        />
      </Dropdown>
    </>
  );
};

export default BorderMoreButton;
