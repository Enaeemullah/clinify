import { Button, DatePicker, Form, Input, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { appointmentSchema, AppointmentInput } from '../schemas';
import { useCreateAppointment } from '../hooks';
import { useDoctorsOptions, usePatientsOptions } from '../hooks/options';

interface Props {
  onSuccess?: () => void;
}

export function AppointmentForm({ onSuccess }: Props) {
  const form = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      scheduledAt: dayjs().toISOString(),
    },
  });
  const createMutation = useCreateAppointment();
  const doctorOptions = useDoctorsOptions();
  const patientOptions = usePatientsOptions();

  const handleSubmit = form.handleSubmit(values => {
    createMutation.mutate(values, {
      onSuccess,
    });
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Patient" required>
        <Controller
          name="patientId"
          control={form.control}
          render={({ field }) => <Select {...field} placeholder="Select patient" options={patientOptions} />}
        />
      </Form.Item>
      <Form.Item label="Doctor" required>
        <Controller
          name="doctorId"
          control={form.control}
          render={({ field }) => <Select {...field} placeholder="Select doctor" options={doctorOptions} />}
        />
      </Form.Item>
      <Form.Item label="Scheduled At" required>
        <Controller
          name="scheduledAt"
          control={form.control}
          render={({ field }) => (
            <DatePicker
              showTime
              style={{ width: '100%' }}
              value={dayjs(field.value)}
              onChange={value => field.onChange(value?.toISOString())}
            />
          )}
        />
      </Form.Item>
      <Form.Item label="Notes">
        <Controller name="notes" control={form.control} render={({ field }) => <Input.TextArea rows={3} {...field} />} />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={createMutation.isPending}>
        Book appointment
      </Button>
    </Form>
  );
}
