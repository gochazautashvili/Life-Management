"use client";
import { Activity as ActivityType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Table, TableProps } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import useDeleteMultipleActivity from "./useDeleteMultipleActivity";
import useDeleteActivity from "./useDeleteActivity";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface Props {
  workspaceId: string;
}

interface DataType {
  key: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface ActivityDataType {
  activities: ActivityType[];
  pageSize: number;
}

const Activity = ({ workspaceId }: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["activity", workspaceId, page],
    queryFn: () =>
      axios
        .get<ActivityDataType>(
          `/api/workspace/activity/${workspaceId}?page=${page}`
        )
        .then((res) => res.data),
  });

  const { mutate: delete_multiple, isPending: isDeletingMultiple } =
    useDeleteMultipleActivity(workspaceId);
  const { mutate, isPending } = useDeleteActivity(workspaceId);

  const Delete = (id: string) => {
    setDeletingId(id);

    mutate(id, {
      onSuccess: () => {
        setDeletingId("");
      },
    });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (event: DataType) => (
        <Button
          key={event.key}
          accessKey={event.key}
          className="bg-red-500 text-white font-medium"
          loading={isPending && deletingId === event.key}
          onClick={() => Delete(event.key)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const dataSource: DataType[] =
    data?.activities.map((activity) => ({
      key: activity.id,
      title: activity.title,
      description: activity.description,
      createdAt: dayjs(activity.createdAt).format("HH.mm - DD/MM/YYYY"),
    })) || [];

  const DeleteMultiple = () => {
    delete_multiple(selectedRowKeys as string[], {
      onSuccess: () => {
        setSelectedRowKeys([]);
      },
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <h1 className="font-semibold text-base">
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
        </h1>
        <Button
          className="ml-auto bg-red-500 text-white font-medium"
          type="primary"
          onClick={DeleteMultiple}
          disabled={!hasSelected}
          loading={isDeletingMultiple}
        >
          Delete All
        </Button>
      </Flex>
      <Table
        loading={isLoading}
        rowSelection={rowSelection}
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 1000 }}
        pagination={{
          onChange: handlePageChange,
          defaultCurrent: page,
          pageSize: 6,
          total: data?.pageSize,
        }}
      />
    </Flex>
  );
};

export default Activity;
