'use client';

import { Modal, Form, Input, Select } from 'antd';
const { Option } = Select;

export default function TaskModal({
  visible,
  onCancel,
  onSubmit,
  initialValues,
}) {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible) {
      form.setFieldsValue(
        initialValues || { title: '', description: '', status: 'pending' }
      );
    }
  }, [visible, initialValues, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={initialValues ? 'Edit Task' : 'Add Task'}
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      okText={initialValues ? 'Update' : 'Create'}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='title'
          label='Title'
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder='Enter task title' />
        </Form.Item>

        <Form.Item name='description' label='Description'>
          <Input.TextArea placeholder='Enter task description' />
        </Form.Item>

        <Form.Item name='status' label='Status' initialValue='pending'>
          <Select>
            <Option value='pending'>Pending</Option>
            <Option value='completed'>Completed</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
