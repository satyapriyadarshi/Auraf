import { AppProvider, useApp } from '@/context/AppContext';
import { AppShell } from '@/components/layout/AppShell';
import { ToastContainer } from '@/components/ui/Toast';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';
import { RoleSelectionPage } from '@/pages/auth/RoleSelectionPage';
import { FarmerDashboard } from '@/pages/farmer/FarmerDashboard';
import { AddProducePage } from '@/pages/farmer/AddProducePage';
import { MyProducePage } from '@/pages/farmer/MyProducePage';
import { FarmerOrdersPage } from '@/pages/farmer/FarmerOrdersPage';
import { FarmerInsightsPage } from '@/pages/farmer/FarmerInsightsPage';
import { BuyerDashboard } from '@/pages/buyer/BuyerDashboard';
import { MarketplacePage } from '@/pages/buyer/MarketplacePage';
import { ProductDetailsPage } from '@/pages/buyer/ProductDetailsPage';
import { CheckoutPage } from '@/pages/buyer/CheckoutPage';
import { PaymentPage } from '@/pages/buyer/PaymentPage';
import { OrderTrackingPage } from '@/pages/buyer/OrderTrackingPage';
import { BuyerOrdersPage } from '@/pages/buyer/BuyerOrdersPage';
import { BuyerInsightsPage } from '@/pages/buyer/BuyerInsightsPage';
import { TransporterDashboard } from '@/pages/transporter/TransporterDashboard';
import { TransporterJobPage } from '@/pages/transporter/TransporterJobPage';
import { TransporterMapPage } from '@/pages/transporter/TransporterMapPage';
import { TransporterEarningsPage } from '@/pages/transporter/TransporterEarningsPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { ProfilePage } from '@/pages/ProfilePage';

function Router() {
  const { route, user } = useApp();

  switch (route.name) {
    case 'landing':
      return <LandingPage />;
    case 'login':
      return <LoginPage />;
    case 'signup':
      return <SignupPage />;
    case 'roleSelection':
      return <RoleSelectionPage />;
    case 'farmerDashboard':
      return <AppShell title="Dashboard"><FarmerDashboard /></AppShell>;
    case 'addProduce':
      return <AppShell title="Add Produce" showBack><AddProducePage /></AppShell>;
    case 'myProduce':
      return <AppShell title="My Produce"><MyProducePage /></AppShell>;
    case 'farmerOrders':
      return <AppShell title="Orders"><FarmerOrdersPage /></AppShell>;
    case 'farmerInsights':
      return <AppShell title="AI Insights"><FarmerInsightsPage /></AppShell>;
    case 'buyerDashboard':
      return <AppShell title="Dashboard"><BuyerDashboard /></AppShell>;
    case 'marketplace':
      return <AppShell title="Marketplace"><MarketplacePage /></AppShell>;
    case 'productDetails':
      return <AppShell title="Product Details" showBack><ProductDetailsPage productId={route.productId} /></AppShell>;
    case 'checkout':
      return <AppShell title="Checkout" showBack><CheckoutPage productId={route.productId} quantity={route.quantity} /></AppShell>;
    case 'payment':
      return <AppShell title="Payment" showBack><PaymentPage orderId={route.orderId} /></AppShell>;
    case 'orderTracking':
      return <AppShell title="Track Order" showBack><OrderTrackingPage orderId={route.orderId} /></AppShell>;
    case 'buyerOrders':
      return <AppShell title="My Orders"><BuyerOrdersPage /></AppShell>;
    case 'buyerInsights':
      return <AppShell title="Insights"><BuyerInsightsPage /></AppShell>;
    case 'transporterDashboard':
      return <AppShell title="Dashboard"><TransporterDashboard /></AppShell>;
    case 'transporterJob':
      return <AppShell title="Job Details" showBack><TransporterJobPage jobId={route.jobId} /></AppShell>;
    case 'transporterMap':
      return <AppShell title="Logistics Map"><TransporterMapPage /></AppShell>;
    case 'transporterEarnings':
      return <AppShell title="Earnings"><TransporterEarningsPage /></AppShell>;
    case 'notifications':
      return <AppShell title="Notifications"><NotificationsPage /></AppShell>;
    case 'profile':
      return <AppShell title="Profile"><ProfilePage /></AppShell>;
    default:
      return <LandingPage />;
  }
}

function AppContent() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
