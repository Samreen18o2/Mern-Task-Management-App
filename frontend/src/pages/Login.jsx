import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import api from '../services/api';

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/auth/login', values);
      onLogin(response.data.user, response.data.token);
    } catch (error) {
      message.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Card title='Login' style={{ width: '100%' }}>
      <Form form={form} onFinish={handleSubmit} layout='vertical'>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please enter a valid email',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder='Email' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder='Password' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Login
          </Button>
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Button type='link' onClick={onSwitchToSignup}>
            Sign up
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default Login;
