import getUserBalance from '../actions/getUserBalance';
import GlowingCard from './GlowingCard';

const BalanceContainer = async () => {
  const { balance } = await getUserBalance();
  return <GlowingCard title="Balance:" numberValue={balance} />;
};

export default BalanceContainer;
