import { Form, Input, DatePicker, Select, Button } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { patientSchema, PatientInput } from '../schemas';
import { useCreatePatient } from '../hooks';

interface PatientFormProps {
  onSuccess?: () => void;
}

const genderOptions = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
  { label: 'Other', value: 'other' },
];

export default function PatientForm({ onSuccess }: PatientFormProps) {
  const form = useForm<PatientInput>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      fullName: '',
      dateOfBirth: dayjs().format('YYYY-MM-DD'),
    },
  });
  const createMutation = useCreatePatient();

  const handleSubmit = form.handleSubmit(values => {
    createMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    });
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Full name" required>
        <Controller name="fullName" control={form.control} render={({ field }) => <Input {...field} />} />
      </Form.Item>
      <Form.Item label="Date of birth" required>
        <Controller
          name="dateOfBirth"
          control={form.control}
          render={({ field }) => (
            <DatePicker
              style={{ width: '100%' }}
              value={dayjs(field.value)}
              onChange={value => field.onChange(value?.format('YYYY-MM-DD'))}
            />
          )}
        />
      </Form.Item>
      <Form.Item label="Gender">
        <Controller name="gender" control={form.control} render={({ field }) => <Select {...field} options={genderOptions} />} />
      </Form.Item>
      <Form.Item label="Phone">
        <Controller name="phone" control={form.control} render={({ field }) => <Input {...field} />} />
      </Form.Item>
      <Form.Item label="Email">
        <Controller name="email" control={form.control} render={({ field }) => <Input {...field} />} />
      </Form.Item>
      <Form.Item label="Notes">
        <Controller name="notes" control={form.control} render={({ field }) => <Input.TextArea rows={3} {...field} />} />
      </Form.Item>
      <Button type="primary" htmlType="submit" block loading={createMutation.isPending}>
        Save patient
      </Button>
    </Form>
  );
}
