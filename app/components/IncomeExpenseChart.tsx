import { Card, CardContent } from '@/components/ui/card';
import getIncomeExpenseChartData from '../actions/getIncomeExpenseChartData';
import SimpleChart from './SimpleChart';

const IncomeExpenseChart = async () => {
  const { chartData } = await getIncomeExpenseChartData();
  if (!chartData) return null;

  return (
    <Card>
      <CardContent>
        <SimpleChart chartData={chartData} />
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseChart;
