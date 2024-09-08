"use client";
import { Button, Modal } from "antd";
import { useState } from "react";
import useDeleteTable from "../hooks/useDeleteTable";

interface Props {
  boardId: string;
  tableId: string;
  workspaceId: string;
}

const DeleteTableModel = ({ boardId, tableId, workspaceId }: Props) => {
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const { mutate, isPending, notificationHolder } = useDeleteTable(boardId);

  const handleDelete = () => {
    mutate(
      { workspaceId, tableId },
      {
        onSuccess: () => {
          setOpenDeleteModel(false);
        },
      }
    );
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
        If you confirm to delete it will delete all data on this table
      </Modal>
      {notificationHolder}
    </>
  );
};

export default DeleteTableModel;
