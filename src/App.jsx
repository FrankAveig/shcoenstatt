// =============================================
// App Principal - Schoenstatt
// =============================================

import { CountryProvider } from './context/CountryContext';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import ToastContainer from './components/Toast';

const App = () => {
  return (
    <CountryProvider>
      <AuthProvider>
        <AppRouter />
        <ToastContainer />
      </AuthProvider>
    </CountryProvider>
  );
};

export default App;
