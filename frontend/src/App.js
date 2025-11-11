import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Properties from './pages/Properties';
import PropertyForm from './pages/PropertyForm';
import PropertyDetail from './pages/PropertyDetail';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SellerDashboard from './pages/SellerDashboard';
import Favorites from './pages/Favorites';
import PropertyEdit from './pages/PropertyEdit';
import Footer from './components/Footer';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import Events from './pages/Events';
import RegisterInvestor from './pages/RegisterInvestor';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';
import AIAssistant from './components/AIAssistant';
import ToolsIndex from './pages/tools/ToolsIndex';
import EMICalculator from './pages/tools/EMICalculator';
import BudgetCalculator from './pages/tools/BudgetCalculator';
import LoanEligibility from './pages/tools/LoanEligibility';
import AreaConverter from './pages/tools/AreaConverter';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/sell" element={<PrivateRoute><PropertyForm /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><PropertyEdit /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<PrivateRoute><SellerDashboard /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/register-investor" element={<RegisterInvestor />} />
          <Route path="/tools" element={<ToolsIndex />} />
          <Route path="/tools/emi" element={<EMICalculator />} />
          <Route path="/tools/budget" element={<BudgetCalculator />} />
          <Route path="/tools/eligibility" element={<LoanEligibility />} />
          <Route path="/tools/area" element={<AreaConverter />} />
        </Routes>
        <Footer />
        <AIAssistant />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
