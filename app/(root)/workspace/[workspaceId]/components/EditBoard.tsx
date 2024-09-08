"use client";
import { Button, Input, Modal, notification } from "antd";
import { useState, useTransition } from "react";
import { edit_board } from "../actions";
import { backgrounds } from "@/lib/utils";
import Image from "next/image";

interface Props {
  boardId: string;
  workspaceId: string;
  title: string;
  image: string;
}

const EditBoardModel = ({ boardId, workspaceId, title, image }: Props) => {
  const [isDeleting, startDeleting] = useTransition();
  const [api, notificationHolder] = notification.useNotification();
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [selectedBackground, setSelectedBackground] = useState(image || "");

  const handleEdit = () => {
    startDeleting(() => {
      edit_board(boardId, workspaceId, {
        title: newTitle,
        background: selectedBackground,
      }).then((res) => {
        if (res.error) {
          api.error({
            message: "Error while update board",
            description: res.error,
            showProgress: true,
            pauseOnHover: true,
          });
        }

        if (res.success) {
          api.success({
            message: "Board Successfully updated",
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
        width={800}
        title="Edit Board"
        open={open}
        onOk={handleEdit}
        confirmLoading={isDeleting}
        onCancel={handleClose}
        okButtonProps={{ style: { background: "cyan", color: "black" } }}
        okText="Edit"
        destroyOnClose
      >
        You can change you&apos;r board title or background
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Type board new title"
          className="mt-2"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4 max-h-[400px] overflow-y-auto">
          {backgrounds.map((background) => {
            const selected = selectedBackground === background.image;

            return (
              <Image
                key={background.image}
                src={background.image}
                alt="board background"
                onClick={() => setSelectedBackground(background.image)}
                className={`rounded bg-gray-400 object-cover h-[100px] cursor-pointer ${
                  selected && "border-4 border-green-400"
                }`}
                width={200}
                height={100}
              />
            );
          })}
        </div>
      </Modal>
      {notificationHolder}
    </>
  );
};

export default EditBoardModel;
