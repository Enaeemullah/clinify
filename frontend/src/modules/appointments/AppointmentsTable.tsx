import { Card, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { useAppointments } from './hooks';
import { LoadingOverlay } from '@/components/LoadingOverlay';

export function AppointmentsTable() {
  const { data, isLoading } = useAppointments();
  if (isLoading) return <LoadingOverlay />;

  return (
    <Card title="Appointments">
      <Table
        dataSource={data ?? []}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        columns={[
          { title: 'Patient', dataIndex: ['patient', 'fullName'] },
          { title: 'Doctor', dataIndex: ['doctor', 'fullName'] },
          {
            title: 'Scheduled',
            dataIndex: 'scheduledAt',
            render: value => dayjs(value).format('MMM D, HH:mm'),
          },
          {
            title: 'Status',
            dataIndex: 'status',
            render: status => <Tag color="green">{status}</Tag>,
          },
        ]}
      />
    </Card>
  );
}
