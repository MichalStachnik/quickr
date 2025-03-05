import { currentUser } from '@clerk/nextjs/server';
import { ToastContainer } from 'react-toastify';
import GuestApp from './components/GuestApp';
import LoggedInApp from './components/LoggedInApp';

const HomePage = async () => {
  const user = await currentUser();

  return (
    <>
      {user ? <LoggedInApp /> : <GuestApp />}
      <ToastContainer theme="dark" />
    </>
  );
};

export default HomePage;
