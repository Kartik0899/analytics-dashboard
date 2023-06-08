import React from 'react';
import { useSelector } from 'react-redux';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return <div>{user ? <Dashboard /> : <SignIn />}</div>;
};

export default App;
