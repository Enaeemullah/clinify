import { Layout, Menu, Typography, theme, Button } from 'antd';
import { ReactNode } from 'react';
import {
  CalendarOutlined,
  DollarOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  ProfileOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { authStore } from '@/auth/store';
import { useLogout } from '@/auth/hooks';

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/patients', icon: <UserOutlined />, label: 'Patients' },
  { key: '/doctors', icon: <TeamOutlined />, label: 'Doctors' },
  { key: '/appointments', icon: <CalendarOutlined />, label: 'Appointments' },
  { key: '/queue', icon: <ProfileOutlined />, label: 'Queue' },
  { key: '/billing', icon: <DollarOutlined />, label: 'Billing' },
  { key: '/settings', icon: <SettingOutlined />, label: 'Settings' },
];

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { token } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const user = authStore(state => state.user);
  const logoutMutation = useLogout();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ padding: 16, color: 'white', fontWeight: 700, fontSize: 18 }}>Clinify</div>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            paddingInline: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            {menuItems.find(item => item.key === location.pathname)?.label ?? 'Dashboard'}
          </Typography.Title>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Typography.Text>
              {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
            </Typography.Text>
            <Button loading={logoutMutation.isPending} onClick={() => logoutMutation.mutate()}>
              Logout
            </Button>
          </div>
        </Header>
        <Content style={{ margin: 24, padding: 24, background: token.colorBgContainer, borderRadius: 16 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
