"use client";
import { useState } from "react";
import { Button, Modal } from "antd";
import CreateTask from "./CreateTask";

interface Props {
  workspaceId: string;
  boardId: string;
  tableId: string;
}

const AddTaskModel = ({ boardId, tableId, workspaceId }: Props) => {
  const [open, setOpen] = useState(false);

  const onFinished = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ background: "blue", color: "white", width: "100%" }}
        onClick={() => setOpen(true)}
      >
        Add Task
      </Button>
      <Modal
        open={open}
        title="Create a new task"
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => setOpen(false)}
        destroyOnClose
      >
        <CreateTask
          workspaceId={workspaceId}
          boardId={boardId}
          onFinished={onFinished}
          tableId={tableId}
        />
      </Modal>
    </>
  );
};

export default AddTaskModel;
