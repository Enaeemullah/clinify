import { Button, Card, Form, Input, Typography } from 'antd';
import { useLogin } from './hooks';

export function LoginView() {
  const login = useLogin();

  const handleFinish = (values: any) => {
    login.mutate(values);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <Card style={{ width: 380 }}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          Clinify
        </Typography.Title>
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={login.isPending}>
            Sign in
          </Button>
        </Form>
      </Card>
    </div>
  );
}
