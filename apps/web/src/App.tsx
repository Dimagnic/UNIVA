import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { RequireAuth } from './features/auth/RequireAuth';
import { AccountPage } from './pages/AccountPage';
import { HomePage } from './pages/HomePage';
import { LegalPage } from './pages/LegalPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecoverPage } from './pages/RecoverPage';
import { RegisterPage } from './pages/RegisterPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="iniciar-sesion" element={<LoginPage />} />
        <Route path="registro" element={<RegisterPage />} />
        <Route path="recuperar" element={<RecoverPage />} />
        <Route path="restablecer" element={<ResetPasswordPage />} />
        <Route
          path="cuenta"
          element={
            <RequireAuth>
              <AccountPage />
            </RequireAuth>
          }
        />
        <Route path="legal/:slug" element={<LegalPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
