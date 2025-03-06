import getIncomeExpense from '../actions/getIncomeExpense';
import GlowingCard from './GlowingCard';

const IncomeExpense = async () => {
  const { income, expense, average } = await getIncomeExpense();
  return (
    <div className="grid grid-cols-3 gap-4">
      <GlowingCard
        title="Income"
        numberValue={income}
        numberColor="text-emerald-400"
      />
      <GlowingCard
        title="Expenses"
        numberValue={expense}
        numberColor="text-rose-400"
      />
      <GlowingCard
        title="Average Transaction Value"
        numberValue={average}
        numberColor={
          average && average > 0 ? 'text-emerald-400' : 'text-rose-400'
        }
      />
    </div>
  );
};

export default IncomeExpense;
