import { Spin } from 'antd';

export function LoadingOverlay() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '200px' }}>
      <Spin tip="Loading..." />
    </div>
  );
}
