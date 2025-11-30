import { Card, List, Tag } from 'antd';
import { useDoctors } from './hooks';
import { LoadingOverlay } from '@/components/LoadingOverlay';

export function DoctorsList() {
  const { data, isLoading } = useDoctors();
  if (isLoading) return <LoadingOverlay />;

  return (
    <Card title="Doctors">
      <List
        dataSource={data ?? []}
        renderItem={doctor => (
          <List.Item>
            <List.Item.Meta
              title={doctor.fullName}
              description={
                <>
                  <span>{doctor.specialization}</span>
                  {doctor.room && (
                    <Tag style={{ marginInlineStart: 8 }} color="blue">
                      Room {doctor.room}
                    </Tag>
                  )}
                </>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
