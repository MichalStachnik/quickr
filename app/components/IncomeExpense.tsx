import getIncomeExpense from '../actions/getIncomeExpense';
import GlowingCard from './GlowingCard';

const IncomeExpense = async () => {
  const { income, expense } = await getIncomeExpense();
  return (
    <div className="grid grid-cols-2 gap-4">
      <GlowingCard title="Income" numberValue={income} />
      <GlowingCard title="Expenses" numberValue={expense} />
    </div>
  );
};

export default IncomeExpense;
