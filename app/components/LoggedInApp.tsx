import AddTransaction from './AddTransaction';
import IncomeExpense from './IncomeExpense';
import TransactionList from './TransactionList';
import { ChatButton } from './ChatButton';
import BalanceContainer from './BalanceContainer';
import IncomeExpenseChart from './IncomeExpenseChart';

const LoggedInApp = async () => {
  return (
    <>
      <AddTransaction />
      <BalanceContainer />
      <IncomeExpense />
      <IncomeExpenseChart />
      <TransactionList />
      <ChatButton />
    </>
  );
};

export default LoggedInApp;
