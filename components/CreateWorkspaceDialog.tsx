import React, { useRef, useState, useTransition } from "react";
import { Button, GetRef, Input, Modal, notification } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import { create_workspace } from "@/actions/workspace";

type InputRefType = GetRef<typeof Input>;

const CreateWorkspaceDialog = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const [api, contextHolder] = notification.useNotification();
  const inputRef = useRef<InputRefType>(null);

  const showModal = () => {
    setOpen(true);
    inputRef.current?.focus();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = () => {
    startTransition(() => {
      create_workspace(inputRef.current?.input?.value).then((res) => {
        if (res.success) {
          handleCancel();
        }

        if (res.error) {
          api.error({
            message: "Error while creating workspace",
            description: res.error,
            showProgress: true,
            pauseOnHover: true,
          });
        }
      });
    });
  };

  return (
    <>
      {contextHolder}
      <Button
        onClick={showModal}
        title="create new workspaces"
        style={{
          width: "100%",
          margin: "15px 0 25px",
          fontWeight: 600,
          borderRadius: 0,
          height: 40,
        }}
      >
        <FolderAddOutlined style={{ fontSize: 18 }} marginWidth={10} />
        Create Workspaces
      </Button>
      <Modal
        title="Create workspace"
        confirmLoading={isLoading}
        onCancel={handleCancel}
        okText="Create"
        onOk={onFinish}
        open={open}
        destroyOnClose
      >
        <Input ref={inputRef} placeholder="Type workspace title" autoFocus />
      </Modal>
    </>
  );
};

export default CreateWorkspaceDialog;
