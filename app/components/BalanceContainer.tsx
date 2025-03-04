import getUserBalance from '../actions/getUserBalance';
import Balance from './Balance';

const BalanceContainer = async () => {
  const { balance } = await getUserBalance();
  return <Balance balance={balance} />;
};

export default BalanceContainer;
