import getIncomeExpenseChartData from '../actions/getIncomeExpenseChartData';
import SimplePieChart from './SimplePieChart';

const CategoryPieChart = async () => {
  const { chartData } = await getIncomeExpenseChartData();
  console.log('chart data', chartData);
  if (!chartData) return null;
  return <SimplePieChart />;
};

export default CategoryPieChart;
