"use client";
import type { FormProps } from "antd";
import { Button, Checkbox, Flex, Form, Input, notification } from "antd";
import { SignInValuesType } from "../type";
import { sign_in, sign_in_with_demo_user } from "../actions";
import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const SignInForm = () => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [isPending, startTransition] = useTransition();
  const [isPendingDemo, startDemo] = useTransition();

  const onFinish: FormProps<SignInValuesType>["onFinish"] = (values) => {
    startTransition(() => {
      sign_in(values).then((res) => {
        if (res?.error) {
          api.error({
            message: "Error while sign in",
            description: res.error,
            showProgress: true,
            pauseOnHover: true,
          });
        }

        if (res?.success) {
          router.push("/");
        }
      });
    });
  };

  const handleSignInWithDemoUser = () => {
    startDemo(() => {
      sign_in_with_demo_user().then((res) => {
        if (res?.error) {
          api.error({
            message: "Error while sign in",
            description: res.error,
            showProgress: true,
            pauseOnHover: true,
          });
        }

        if (res?.success) {
          router.push("/");
        }
      });
    });
  };

  return (
    <>
      {contextHolder}
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 400, width: "100%" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button
            disabled={isPendingDemo}
            loading={isPending}
            block
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
          <Button
            block
            onClick={handleSignInWithDemoUser}
            className="mt-2"
            disabled={isPending}
            loading={isPendingDemo}
            type="dashed"
            htmlType="button"
          >
            Log in with demo user
          </Button>
          or <Link href="/auth/sign-up">Register now!</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignInForm;
