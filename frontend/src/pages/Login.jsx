import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import api from '../services/api';

const { Title, Text } = Typography;

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
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Card
        bordered={false}
        style={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 20,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow:
            '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '20px 10px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
            }}
          >
            <LockOutlined style={{ fontSize: 32, color: 'white' }} />
          </div>
          <Title
            level={2}
            style={{
              margin: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}
          >
            Welcome Back
          </Title>
          <Text
            type='secondary'
            style={{ fontSize: 16, display: 'block', marginTop: 8 }}
          >
            Sign in to continue your journey
          </Text>
        </div>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout='vertical'
          size='large'
        >
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter a valid email',
              },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#667eea' }} />}
              placeholder='Enter your email'
              style={{
                borderRadius: 12,
                border: '2px solid #f0f2f5',
                padding: '12px 16px',
                fontSize: 16,
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#f0f2f5';
                e.target.style.boxShadow = 'none';
              }}
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please enter your password' }]}
            style={{ marginBottom: 32 }}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#667eea' }} />}
              placeholder='Enter your password'
              style={{
                borderRadius: 12,
                border: '2px solid #f0f2f5',
                padding: '12px 16px',
                fontSize: 16,
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.parentElement.style.borderColor = '#667eea';
                e.target.parentElement.style.boxShadow =
                  '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.parentElement.style.borderColor = '#f0f2f5';
                e.target.parentElement.style.boxShadow = 'none';
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              block
              style={{
                height: 50,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                fontSize: 16,
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow =
                  '0 6px 20px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow =
                  '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div
          style={{
            textAlign: 'center',
            marginTop: 24,
            padding: '20px 0 0',
            borderTop: '1px solid #f0f2f5',
          }}
        >
          <Text type='secondary' style={{ fontSize: 15 }}>
            Don't have an account?
          </Text>
          <Button
            type='link'
            onClick={onSwitchToSignup}
            style={{
              fontSize: 15,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              padding: '4px 8px',
              height: 'auto',
            }}
          >
            Create one here
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
