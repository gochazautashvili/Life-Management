"use client";
import { Button, Modal, notification } from "antd";
import { useState, useTransition } from "react";
import { delete_board } from "../actions";

interface Props {
  boardId: string;
  workspaceId: string;
}

const DeleteBoardConfirm = ({ boardId, workspaceId }: Props) => {
  const [isDeleting, startDeleting] = useTransition();
  const [api, notificationHolder] = notification.useNotification();
  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const handleDelete = () => {
    startDeleting(() => {
      delete_board(boardId, workspaceId).then((res) => {
        if (res.error) {
          api.error({
            message: "Error while delete board",
            description: res.error,
            showProgress: true,
            pauseOnHover: true,
          });
        }

        if (res.success) {
          api.success({
            message: "Board Successfully deleted",
            showProgress: true,
            pauseOnHover: true,
          });
        }

        setOpenDeleteModel(false);
      });
    });
  };

  const showModal = () => {
    setOpenDeleteModel(true);
  };

  const handleClose = () => {
    setOpenDeleteModel(false);
  };

  return (
    <>
      <Button style={{ background: "red" }} type="primary" onClick={showModal}>
        Delete
      </Button>
      <Modal
        title="Delete Board"
        open={openDeleteModel}
        onOk={handleDelete}
        confirmLoading={isDeleting}
        onCancel={handleClose}
        okButtonProps={{ style: { background: "red" } }}
        okText="Delete"
      >
        If you confirm to delete it will delete all data on this board
      </Modal>
      {notificationHolder}
    </>
  );
};

export default DeleteBoardConfirm;
