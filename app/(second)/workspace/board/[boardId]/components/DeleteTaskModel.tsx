"use client";
import { Button, Modal } from "antd";
import { useState } from "react";
import useDeleteTask from "../hooks/useDeleteTask";

interface Props {
  boardId: string;
  taskId: string;
  workspaceId: string;
}

const DeleteTaskModel = ({ boardId, taskId, workspaceId }: Props) => {
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const { mutate, isPending, notificationHolder } = useDeleteTask(boardId);

  const handleDelete = () => {
    mutate({ taskId, workspaceId });
  };

  const showModal = () => {
    setOpenDeleteModel(true);
  };

  const handleClose = () => {
    setOpenDeleteModel(false);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ background: "red", width: "100%" }}
        onClick={showModal}
      >
        Delete
      </Button>
      <Modal
        title="Delete Table"
        open={openDeleteModel}
        onOk={handleDelete}
        confirmLoading={isPending}
        onCancel={handleClose}
        okButtonProps={{ style: { background: "red" } }}
        okText="Delete"
      >
        If you confirm to delete it will delete all data on this task
      </Modal>
      {notificationHolder}
    </>
  );
};

export default DeleteTaskModel;
