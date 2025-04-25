
import { Navigate } from 'react-router-dom';

// Redirect the index page to the dashboard
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
