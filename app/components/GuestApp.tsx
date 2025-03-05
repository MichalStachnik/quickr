import { Button } from '@/components/ui/button';
import { TransactionProvider } from '@/context/TransactionContext';
import { SignInButton } from '@clerk/nextjs';
import LocalBalanceContainer from './LoggedOut/LocalBalanceContainer';
import LocalIncomeExpense from './LoggedOut/LocalIncomeExpense';
import LocalIncomeExpenseChart from './LoggedOut/LocalIncomeExpenseChart';
import LocalAddTransaction from './LoggedOut/LocalAddTransaction';
import LocalTransactionList from './LoggedOut/LocalTransactionList';
import { ChatButton } from './ChatButton';

const GuestApp = () => {
  return (
    <div className="guest">
      <p className="mb-4">Please Sign In</p>
      <div className="mb-8">
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </div>
      <TransactionProvider>
        <LocalBalanceContainer />
        <LocalIncomeExpense />
        <LocalIncomeExpenseChart />
        <LocalAddTransaction />
        <LocalTransactionList />
        <ChatButton />
      </TransactionProvider>
    </div>
  );
};

export default GuestApp;
