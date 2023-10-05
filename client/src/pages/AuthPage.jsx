import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AppContext from '../components/AppContext';
import RegistrationForm from './RegistrationForm';

export default function AuthPage({ action }) {
  const navigate = useNavigate();
  const { user, handleSignIn } = useContext(AppContext);
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const welcomeMessage =
    action === 'sign-in'
      ? 'Please sign-in to continue'
      : 'Create an account to get started.';

  return (
    <div className="row pt-5">
      <div className="col-12 offset-0 col-sm-10">
        <header className="text-center">
          <h2 mb-2>GameFuze</h2>
          <p className="text-muted mb-4">{welcomeMessage}</p>
        </header>
        <div className="card p-3">
          <RegistrationForm
            key={action}
            action={action}
            onSignIn={handleSignIn}
          />
        </div>
      </div>
    </div>
  );
}
