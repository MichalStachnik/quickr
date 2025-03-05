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

const ExpensesPage = async () => {
  const user = await currentUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your expenses</CardTitle>
        <CardDescription>at a glance</CardDescription>
      </CardHeader>
      <CardContent>
        {user ? <IncomeExpenseChart /> : <LocalIncomeExpenseChart />}
      </CardContent>
    </Card>
  );
};

export default ExpensesPage;
