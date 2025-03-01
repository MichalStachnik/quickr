import { currentUser } from '@clerk/nextjs/server';
import Guest from './components/Guest';
import AddTransaction from './components/AddTransaction';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import TransactionList from './components/TransactionList';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import { ChatButton } from './components/ChatButton';
import AppSidebar from './components/AppSidebar';
import { SidebarInset } from '@/components/ui/sidebar';

const HomePage = async () => {
  const user = await currentUser();

  if (!user) return <Guest />;

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <main className="bg-background text-foreground min-h-screen mx-auto px-4 w-full">
          <Header />
          <div className="max-w-3xl mx-auto space-y-8 my-4">
            <Balance />
            <IncomeExpense />
            <AddTransaction />
            <TransactionList />
            <ChatButton />
          </div>
        </main>
      </SidebarInset>
      <ToastContainer theme="dark" />
    </>
  );
};

export default HomePage;
