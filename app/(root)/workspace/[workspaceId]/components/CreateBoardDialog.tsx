"use client";
import React, { useRef, useState, useTransition } from "react";
import { Button, GetRef, Input, Modal, notification } from "antd";
import { create_board } from "../actions";

interface Props {
  workspaceId: string;
}

type InputRefType = GetRef<typeof Input>;

const CreateBoardDialog = ({ workspaceId }: Props) => {
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

  const handleOk = () => {
    startTransition(() => {
      create_board(inputRef.current?.input?.value, workspaceId).then((res) => {
        if (res.error) {
          api.error({
            message: "Error while creating board",
            description: res.error,
            showProgress: true,
            pauseOnHover: true,
          });
        }

        if (res.success) {
          handleCancel();
        }
      });
    });
  };

  return (
    <>
      {contextHolder}
      <Button
        onClick={showModal}
        title="create new board"
        className="bg-cyan-500 text-white"
      >
        Create Board
      </Button>
      <Modal
        confirmLoading={isLoading}
        onCancel={handleCancel}
        title="Create Board"
        onOk={handleOk}
        okText="Create"
        open={open}
        destroyOnClose
      >
        <Input ref={inputRef} placeholder="Type board title" autoFocus />
      </Modal>
    </>
  );
};

export default CreateBoardDialog;
