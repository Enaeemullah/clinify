import { Button, Drawer, Table, Tag } from 'antd';
import { useState } from 'react';
import { usePatients } from '../hooks';
import PatientForm from './PatientForm';
import { Can } from '@/components/Can';
import { LoadingOverlay } from '@/components/LoadingOverlay';

export function PatientsTable() {
  const { data, isLoading } = usePatients();
  const [open, setOpen] = useState(false);

  if (isLoading) return <LoadingOverlay />;

  return (
    <>
      <div className="table-toolbar">
        <Can permission="patient.create">
          <Button type="primary" onClick={() => setOpen(true)}>
            Add Patient
          </Button>
        </Can>
      </div>
      <Table
        dataSource={data ?? []}
        rowKey="id"
        columns={[
          { title: 'Name', dataIndex: 'fullName' },
          {
            title: 'Age',
            dataIndex: 'dateOfBirth',
            render: value => new Date().getFullYear() - new Date(value).getFullYear(),
          },
          { title: 'Phone', dataIndex: 'phone' },
          {
            title: 'Tags',
            dataIndex: 'notes',
            render: notes => (notes ? <Tag color="blue">Notes</Tag> : null),
          },
        ]}
      />
      <Drawer title="New Patient" open={open} onClose={() => setOpen(false)} destroyOnClose width={480}>
        <PatientForm onSuccess={() => setOpen(false)} />
      </Drawer>
    </>
  );
}
