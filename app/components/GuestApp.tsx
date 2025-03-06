import { SignInButton } from '@clerk/nextjs';
import { TransactionProvider } from '@/context/TransactionContext';
import LocalBalanceContainer from './LoggedOut/LocalBalanceContainer';
import LocalIncomeExpense from './LoggedOut/LocalIncomeExpense';
import LocalIncomeExpenseChart from './LoggedOut/LocalIncomeExpenseChart';
import LocalAddTransaction from './LoggedOut/LocalAddTransaction';
import LocalTransactionList from './LoggedOut/LocalTransactionList';
import { ChatButton } from './ChatButton';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/motion/magnetic';

const GuestApp = () => {
  return (
    <TransactionProvider>
      <div className="guest">
        <div className="flex items-center justify-between gap-4 my-8">
          <div className="flex items-center gap-4">
            <p>Please</p>
            <div>
              <Magnetic>
                <SignInButton>
                  <Button>Sign In</Button>
                </SignInButton>
              </Magnetic>
            </div>
          </div>
          <LocalAddTransaction />
        </div>
        <LocalBalanceContainer />
        <LocalIncomeExpense />
        <LocalIncomeExpenseChart />
        <LocalTransactionList />
        <ChatButton />
      </div>
    </TransactionProvider>
  );
};

export default GuestApp;
