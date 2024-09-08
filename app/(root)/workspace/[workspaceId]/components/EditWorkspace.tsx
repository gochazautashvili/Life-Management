"use client";
import { Button, Form, Input, Modal, notification } from "antd";
import { useState, useTransition } from "react";
import { update_workspace } from "@/actions/workspace";

interface Props {
  workspaceId: string;
  title: string;
}

const EditWorkspaceModel = ({ workspaceId, title }: Props) => {
  const [isDeleting, startDeleting] = useTransition();
  const [api, notificationHolder] = notification.useNotification();
  const [open, setOpen] = useState(false);

  const handleEdit = (values: { title: string }) => {
    startDeleting(() => {
      update_workspace(values.title, workspaceId).then((res) => {
        if (res.error) {
          api.error({
            message: "Error while update workspace",
            description: res.error,
            showProgress: true,
            pauseOnHover: true,
          });
        }

        if (res.success) {
          api.success({
            message: "Workspace Successfully updated",
            showProgress: true,
            pauseOnHover: true,
          });
        }

        setOpen(false);
      });
    });
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} className="w-full font-medium">
        Edit
      </Button>
      <Modal
        open={open}
        title="Create a new collection"
        confirmLoading={isDeleting}
        cancelText="Cancel"
        okText="Edit"
        okButtonProps={{
          style: { background: "cyan", color: "black" },
          htmlType: "submit",
        }}
        onCancel={handleClose}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            name="form_in_modal"
            initialValues={{ title }}
            clearOnDestroy
            onFinish={handleEdit}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="title"
          label="You can change you'r workspace title"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input
            defaultValue={title}
            placeholder="Type workspace new title"
            className="mt-2"
          />
        </Form.Item>
      </Modal>
      {notificationHolder}
    </>
  );
};

export default EditWorkspaceModel;
