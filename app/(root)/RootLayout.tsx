"use client";
import { ReactNode, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, MenuProps } from "antd";
import Image from "next/image";
import { sign_out } from "../(second)/auth/actions";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import CreateWorkspaceDialog from "@/components/CreateWorkspaceDialog";
import { UserWorkspaceIncludeType } from "@/types";

const { Header, Sider, Content } = Layout;

interface Props {
  user: UserWorkspaceIncludeType;
  children: ReactNode;
}

const RootLayout = ({ children, user }: Props) => {
  const router = useRouter();
  const params: { workspaceId: string } = useParams();
  const pathname = usePathname();
  const activityPath = pathname.includes("/activity/");

  const defaultSelectedKey = activityPath
    ? `activity ${params.workspaceId}`
    : `board ${params.workspaceId}`;

  const logout = () => {
    sign_out().then((res) => {
      if (res.success) {
        router.push("/auth/sign-in");
      }
    });
  };

  const menu_item: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <Button style={{ width: "100%" }}>
          <LogoutOutlined /> Sign out
        </Button>
      ),
      onClick: logout,
    },
  ];

  const sidebar_item: MenuProps["items"] = user.workspaces.map(
    (workspace, i) => {
      return {
        key: workspace.id,
        label: (
          <div
            title={workspace.title}
            style={{ width: "100%", fontWeight: 600 }}
          >
            {workspace.title}
          </div>
        ),
        children: [
          {
            key: `board ${workspace.id}`,
            label: (
              <Link
                href={`/workspace/${workspace.id}`}
                title={workspace.title}
                style={{ width: "100%", fontWeight: 600 }}
              >
                Boards
              </Link>
            ),
          },
          {
            key: `activity ${workspace.id}`,
            label: (
              <Link
                href={`/workspace/activity/${workspace.id}`}
                title={workspace.title}
                style={{ width: "100%", fontWeight: 600 }}
              >
                Activities
              </Link>
            ),
          },
        ],
      };
    }
  );

  return (
    <Layout className="h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={260}
        style={{
          background: "white",
          borderRightWidth: 1,
          borderColor: "black",
          zIndex: 100,
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <Link
            href="/"
            className="text-black flex items-center gap-4 p-2 text-xl font-semibold"
          >
            <Image
              src="/logo_icon.png"
              alt="logo"
              width={64}
              height={64}
              className="size-10"
            />
            <p>Life Management</p>
          </Link>
          <CreateWorkspaceDialog />
          <h1 className="text-base font-semibold px-7 uppercase">
            My Workspaces
          </h1>
          <hr className="w-full h-px bg-black border-none my-3" />
          <Menu
            style={{ flex: 1, flexGrow: 1, flexShrink: 0, background: "white" }}
            theme="light"
            mode="inline"
            defaultSelectedKeys={[defaultSelectedKey]}
            defaultOpenKeys={[params.workspaceId]}
            items={sidebar_item}
          />
          <Dropdown menu={{ items: menu_item }} placement="topLeft">
            <Button
              style={{
                height: 50,
                borderWidth: 0,
                borderTopWidth: 1,
                borderRadius: 0,
                borderColor: "black",
                background: "none",
                color: "black",
                fontWeight: 700,
              }}
            >
              <UserOutlined style={{ marginRight: 12, fontSize: 16 }} />
              {user.email}
            </Button>
          </Dropdown>
        </div>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "white",
            borderRadius: 20,
            inset: 0,
          }}
          className="fixed md:static"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
