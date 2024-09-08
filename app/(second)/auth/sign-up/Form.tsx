"use client";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { SignUpValuesType } from "../type";
import { sign_up } from "../actions";
import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [isPending, startTransition] = useTransition();

  const onFinish: FormProps<SignUpValuesType>["onFinish"] = (values) => {
    startTransition(() => {
      sign_up(values).then((res) => {
        if (res?.error) {
          api.error({
            message: "Error while sign up",
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
        name="basic"
        layout="vertical"
        style={{ width: "100%", maxWidth: 400 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<SignUpValuesType>
          layout="vertical"
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<SignUpValuesType>
          layout="vertical"
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<SignUpValuesType>
          layout="vertical"
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<SignUpValuesType>
          layout="horizontal"
          name="remember"
          valuePropName="checked"
        >
          <div className="flex items-center justify-between">
            <Checkbox>Remember me</Checkbox>
            <Link href="/auth/sign-in">Already have an account?</Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            loading={isPending}
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUpForm;
