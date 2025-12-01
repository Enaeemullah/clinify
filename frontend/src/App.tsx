import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProviders } from './AppProviders';
import { AppLayout } from './layout/AppLayout';
import { Dashboard } from './modules/dashboard/Dashboard';
import { PatientsTable } from './modules/patients/components/PatientsTable';
import { DoctorsList } from './modules/doctors/DoctorsList';
import { AppointmentForm } from './modules/appointments/components/AppointmentForm';
import { AppointmentsTable } from './modules/appointments/AppointmentsTable';
import { QueueScreen } from './modules/queue/components/QueueScreen';
import { BillingPanel } from './modules/billing/BillingPanel';
import { SettingsForm } from './modules/settings/SettingsForm';
import { LoginView } from './auth/LoginView';
import { authStore } from './auth/store';
import { useMe } from './auth/hooks';
import { LoadingOverlay } from './components/LoadingOverlay';
import { Col, Row } from 'antd';

function ProtectedApp() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<PatientsTable />} />
          <Route
            path="/doctors"
            element={
              <Row gutter={16}>
                <Col span={12}>
                  <DoctorsList />
                </Col>
                <Col span={12}>
                  <QueueScreen />
                </Col>
              </Row>
            }
          />
          <Route
            path="/appointments"
            element={
              <Row gutter={16}>
                <Col span={12}>
                  <AppointmentForm />
                </Col>
                <Col span={12}>
                  <AppointmentsTable />
                </Col>
              </Row>
            }
          />
          <Route path="/queue" element={<QueueScreen />} />
          <Route path="/billing" element={<BillingPanel />} />
          <Route path="/settings" element={<SettingsForm />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default function App() {
  const accessToken = authStore(state => state.accessToken);
  const { isLoading } = useMe();

  return (
    <AppProviders>
      {!accessToken ? (
        <LoginView />
      ) : isLoading ? (
        <LoadingOverlay />
      ) : (
        <ProtectedApp />
      )}
    </AppProviders>
  );
}
