import React from 'react';
import { Button, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const TaskFilters = ({
  onAddTask,
  statusFilter,
  onStatusFilterChange,
  createTaskLoading,
}) => {
  return (
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
          onClick={onAddTask}
          loading={createTaskLoading}
        >
          Add Task
        </Button>
        <Select
          placeholder='Filter by status'
          style={{ width: 150 }}
          allowClear
          value={statusFilter || undefined}
          onChange={onStatusFilterChange}
        >
          <Option value='Pending'>Pending</Option>
          <Option value='In Progress'>In Progress</Option>
          <Option value='Completed'>Completed</Option>
        </Select>
      </Space>
    </div>
  );
};

export default TaskFilters;
