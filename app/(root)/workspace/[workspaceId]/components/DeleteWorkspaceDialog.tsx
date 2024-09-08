"use client";
import { Button, Modal, notification } from "antd";
import { useState, useTransition } from "react";
import { delete_workspace } from "@/actions/workspace";
import { useRouter } from "next/navigation";

interface Props {
  workspaceId: string;
}

const DeleteWorkspaceDialog = ({ workspaceId }: Props) => {
  const [isDeleting, startDeleting] = useTransition();
  const [api, notificationHolder] = notification.useNotification();
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    startDeleting(() => {
      delete_workspace(workspaceId).then((res) => {
        if (res.error) {
          api.error({
            message: "Error while delete Workspace",
            description: res.error,
            showProgress: true,
            pauseOnHover: true,
          });
        }

        if (res.success) {
          router.push("/");

          api.success({
            message: "Workspace Successfully deleted",
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
      <Button
        style={{ background: "red", width: "100%" }}
        type="primary"
        onClick={showModal}
      >
        Delete
      </Button>
      <Modal
        title="Delete Workspace"
        open={openDeleteModel}
        onOk={handleDelete}
        confirmLoading={isDeleting}
        onCancel={handleClose}
        okButtonProps={{ style: { background: "red" } }}
        okText="Delete"
      >
        If you confirm to delete it will delete all data on this workspace
      </Modal>
      {notificationHolder}
    </>
  );
};

export default DeleteWorkspaceDialog;
