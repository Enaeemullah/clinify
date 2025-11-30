import { Button, Card, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useSettings, useUpdateSetting } from './hooks';

export function SettingsForm() {
  const [form] = Form.useForm();
  const { data } = useSettings();
  const updateSetting = useUpdateSetting();

  useEffect(() => {
    const clinicSetting = data?.find(setting => setting.key === 'clinicProfile');
    if (clinicSetting) {
      form.setFieldsValue(clinicSetting.value);
    }
  }, [data, form]);

  const handleSubmit = (values: any) => {
    updateSetting.mutate({ key: 'clinicProfile', value: values });
  };

  return (
    <Card title="Clinic profile">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item label="Clinic name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Timings" name="timings">
          <Input placeholder="Mon-Fri 8am-6pm" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={updateSetting.isPending}>
          Save changes
        </Button>
      </Form>
    </Card>
  );
}
