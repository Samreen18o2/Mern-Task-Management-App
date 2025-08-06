import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import api from '../services/api';

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/auth/signup', values);
      onSignup(response.data.user, response.data.token);
    } catch (error) {
      message.error(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Card title='Sign Up' style={{ width: '100%' }}>
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
          rules={[
            {
              required: true,
              min: 6,
              message: 'Password must be at least 6 characters',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder='Password' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Sign Up
          </Button>
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Button type='link' onClick={onSwitchToLogin}>
            Login
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default Signup;
