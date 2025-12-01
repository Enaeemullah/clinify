import { Button, Card, Form, Input, InputNumber, Modal, Space } from 'antd';
import { useState } from 'react';
import { useCreateInvoice, useInvoice } from './hooks';

export function BillingPanel() {
  const [form] = Form.useForm();
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const createInvoice = useCreateInvoice();
  const { data: invoice } = useInvoice(invoiceId);

  const handleFinish = (values: any) => {
    createInvoice.mutate(values, {
      onSuccess: data => {
        setInvoiceId(data.id);
        form.resetFields();
      },
    });
  };

  return (
    <>
      <Card title="Generate invoice">
        <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{ items: [{ description: '', quantity: 1, unitPrice: 0 }] }}>
          <Form.Item label="Patient ID" name="patientId" rules={[{ required: true }]}>
            <Input placeholder="Patient UUID" />
          </Form.Item>
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <Space key={field.key} align="baseline">
                    <Form.Item {...field} name={[field.name, 'description']} rules={[{ required: true }]} label="Description">
                      <Input placeholder="Consultation" />
                    </Form.Item>
                    <Form.Item {...field} name={[field.name, 'quantity']} rules={[{ required: true }]} label="Qty">
                      <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item {...field} name={[field.name, 'unitPrice']} rules={[{ required: true }]} label="Unit price">
                      <InputNumber min={0} prefix="$" />
                    </Form.Item>
                    <Button onClick={() => remove(field.name)} danger>
                      Remove
                    </Button>
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()}>
                  Add item
                </Button>
              </>
            )}
          </Form.List>
          <Button type="primary" htmlType="submit" loading={createInvoice.isPending}>
            Create invoice
          </Button>
        </Form>
      </Card>
      <Modal open={Boolean(invoice)} title="Invoice preview" footer={null} onCancel={() => setInvoiceId(null)}>
        {invoice && (
          <>
            <p>
              <strong>Patient:</strong> {invoice.patient.fullName}
            </p>
            <p>
              <strong>Total:</strong> ${invoice.total}
            </p>
            {invoice.items.map(item => (
              <p key={item.id}>
                {item.description} — {item.quantity} × ${item.unitPrice}
              </p>
            ))}
          </>
        )}
      </Modal>
    </>
  );
}
