import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import IncomeExpenseChart from '../components/IncomeExpenseChart';

const ExpensesPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your expenses</CardTitle>
        <CardDescription>at a glance</CardDescription>
      </CardHeader>
      <CardContent>
        <IncomeExpenseChart />
      </CardContent>
    </Card>
  );
};

export default ExpensesPage;
