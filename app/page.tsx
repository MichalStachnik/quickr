import { currentUser } from '@clerk/nextjs/server';
import Guest from './components/Guest';
import AddTransaction from './components/AddTransaction';
import IncomeExpense from './components/IncomeExpense';
import TransactionList from './components/TransactionList';
import { ToastContainer } from 'react-toastify';
import { ChatButton } from './components/ChatButton';
import BalanceContainer from './components/BalanceContainer';

const HomePage = async () => {
  const user = await currentUser();

  return (
    <>
      {user ? (
        <>
          <BalanceContainer />
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
