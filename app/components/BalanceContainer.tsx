import getUserBalance from '../actions/getUserBalance';
import GlowingCard from './GlowingCard';

const BalanceContainer = async () => {
  const { balance } = await getUserBalance();
  if (!balance) return null;
  const numberColor = balance > 0 ? 'text-emerald-400' : 'text-rose-400';
  return (
    <GlowingCard
      title="Balance:"
      numberValue={balance}
      numberColor={numberColor}
    />
  );
};

export default BalanceContainer;
