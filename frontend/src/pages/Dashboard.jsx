import { useState, useEffect } from 'react';
import { Button, Select, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TaskTable from '../components/TaskTable';
import TaskModal from '../components/TaskModal';
import api from '../services/api';

const { Option } = Select;

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = statusFilter ? { status: statusFilter } : {};
      const response = await api.get('/tasks', { params });
      setTasks(response.data);
    } catch (error) {
      message.error('Failed to fetch tasks');
    }
    setLoading(false);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setModalVisible(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      message.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      message.error('Failed to delete task');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      message.success('Task status updated');
      fetchTasks();
    } catch (error) {
      message.error('Failed to update task status');
    }
  };

  const handleModalSubmit = async (taskData, isEdit) => {
    try {
      if (isEdit) {
        await api.put(`/tasks/${editingTask._id}`, taskData);
        message.success('Task updated successfully');
      } else {
        await api.post('/tasks', taskData);
        message.success('Task created successfully');
      }
      setModalVisible(false);
      fetchTasks();
    } catch (error) {
      message.error('Failed to save task');
    }
  };

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Space>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={handleAddTask}
          >
            Add Task
          </Button>
          <Select
            placeholder='Filter by status'
            style={{ width: 150 }}
            allowClear
            value={statusFilter || undefined}
            onChange={setStatusFilter}
          >
            <Option value='Pending'>Pending</Option>
            <Option value='In Progress'>In Progress</Option>
            <Option value='Completed'>Completed</Option>
          </Select>
        </Space>
      </div>

      <TaskTable
        tasks={tasks}
        loading={loading}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
      />

      <TaskModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleModalSubmit}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Dashboard;
