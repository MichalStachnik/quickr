import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import { currentUser } from '@clerk/nextjs/server';
import LocalIncomeExpenseChart from '../components/LoggedOut/LocalIncomeExpenseChart';
import { TransactionProvider } from '@/context/TransactionContext';
import CategoryPieChart from '../components/CategoryPieChart';

const TransactionsPage = async () => {
  const user = await currentUser();

  return (
    <div className="h-screen grid grid-rows-2 gap-4">
      {user ? (
        <>
          <IncomeExpenseChart />
          <CategoryPieChart />
        </>
      ) : (
        <TransactionProvider>
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Your transactions</CardTitle>
              <CardDescription>at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <LocalIncomeExpenseChart />
            </CardContent>
          </Card>
        </TransactionProvider>
      )}
    </div>
  );
};

export default TransactionsPage;
