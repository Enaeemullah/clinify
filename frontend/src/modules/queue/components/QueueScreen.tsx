import { Card, Typography } from 'antd';
import { useQueueSocket } from '../hooks/useQueueSocket';

export function QueueScreen() {
  const { entries } = useQueueSocket();

  return (
    <div className="queue-grid">
      {entries.map(entry => (
        <Card key={entry.doctorId} bordered>
          <Typography.Title level={4}>{entry.doctorName}</Typography.Title>
          <Typography.Text strong>Now serving: {entry.currentPatient ?? 'Waiting'}</Typography.Text>
          <Typography.Paragraph>Next: {entry.nextPatient ?? 'TBD'}</Typography.Paragraph>
        </Card>
      ))}
    </div>
  );
}
