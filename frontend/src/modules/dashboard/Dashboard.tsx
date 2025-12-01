import { Card, Col, Progress, Row, Statistic, Typography } from 'antd';

export function Dashboard() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Card><Statistic title="Patients Today" value={42} /></Card>
      </Col>
      <Col span={6}>
        <Card><Statistic title="Appointments" value={68} /></Card>
      </Col>
      <Col span={6}>
        <Card><Statistic title="Queue Avg Wait (min)" value={12} /></Card>
      </Col>
      <Col span={6}>
        <Card><Statistic title="Revenue" value={12500} prefix="$" /></Card>
      </Col>
      <Col span={24}>
        <Card title="Capacity overview">
          <Typography.Paragraph>Week-over-week appointment growth</Typography.Paragraph>
          <Progress percent={72} status="active" />
        </Card>
      </Col>
    </Row>
  );
}
