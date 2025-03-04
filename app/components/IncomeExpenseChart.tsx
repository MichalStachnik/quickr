import getIncomeExpenseChartData from '../actions/getIncomeExpenseChartData';
import SimpleChart from './SimpleChart';

const IncomeExpenseChart = async () => {
  const { chartData } = await getIncomeExpenseChartData();
  if (!chartData) return null;
  return <SimpleChart chartData={chartData} />;
};

export default IncomeExpenseChart;
