"use client";
import { Button, Form, FormProps, Input } from "antd";
import useCreateTable from "../hooks/useCreateTable";

interface Props {
  boardId: string;
  workspaceId: string;
}

type TableType = {
  title: string;
};

const CreateTable = ({ boardId, workspaceId }: Props) => {
  const { mutate, isPending, notificationHolder } = useCreateTable(boardId);

  const onFinish: FormProps<TableType>["onFinish"] = (values) => {
    mutate({ boardId, title: values.title, workspaceId });
  };

  return (
    <>
      {notificationHolder}
      <Form
        name="create table"
        layout="vertical"
        style={{
          width: "300px",
          minWidth: "300px",
          padding: "10px 20px 0",
          borderRadius: 10,
        }}
        className="bg-white/30 backdrop-blur"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<TableType>
          layout="vertical"
          label="Table Title"
          name="title"
          rules={[{ required: true, message: "Type New Table Title!" }]}
        >
          <Input
            className="bg-transparent border-black text-black"
            placeholder="Type New Table Title"
          />
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

export default CreateTable;
