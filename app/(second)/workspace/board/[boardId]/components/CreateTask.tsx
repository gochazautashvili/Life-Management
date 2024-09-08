"use client";
import { Button, Form, FormProps, Input } from "antd";
import useCreateTask from "../hooks/useCreateTask";

interface Props {
  tableId: string;
  boardId: string;
  workspaceId: string;
  onFinished?: () => void;
}

type TaskType = {
  title: string;
  description: string;
};

const CreateTask = ({ tableId, onFinished, boardId, workspaceId }: Props) => {
  const { mutate, isPending, notificationHolder } = useCreateTask(boardId);

  const onFinish: FormProps<TaskType>["onFinish"] = (values) => {
    mutate(
      { tableId, values, workspaceId },
      {
        onSuccess() {
          onFinished?.();
        },
      }
    );
  };

  return (
    <>
      {notificationHolder}
      <Form
        name="create new task"
        layout="vertical"
        style={{
          width: "100%",
          background: "#fff",
          padding: "10px 20px 0",
          borderRadius: 10,
          border: "1px solid black",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<TaskType>
          layout="vertical"
          label="Task Title"
          name="title"
          rules={[{ required: true, message: "Type New Task Title!" }]}
        >
          <Input placeholder="Type New Task Title" />
        </Form.Item>

        <Form.Item<TaskType>
          layout="vertical"
          label="Task Description"
          name="description"
          rules={[{ required: true, message: "Type New Task Description!" }]}
        >
          <Input placeholder="Type New Task Description" />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isPending}
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateTask;
