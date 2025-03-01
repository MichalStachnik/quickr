import { currentUser } from '@clerk/nextjs/server';
import Guest from './components/Guest';
import AddTransaction from './components/AddTransaction';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import TransactionList from './components/TransactionList';
// import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import { ChatButton } from './components/ChatButton';
// import AppSidebar from './components/AppSidebar';
// import { SidebarInset } from '@/components/ui/sidebar';

const HomePage = async () => {
  const user = await currentUser();

  return (
    <>
      {user ? (
        <>
          <Balance />
          <IncomeExpense />
          <AddTransaction />
          <TransactionList />
          <ChatButton />
        </>
      ) : (
        <Guest />
      )}
      <ToastContainer theme="dark" />
    </>
  );
};

export default HomePage;
