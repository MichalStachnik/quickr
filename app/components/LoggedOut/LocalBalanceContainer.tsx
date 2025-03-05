'use client';

import { useTransactions } from '@/context/TransactionContext';
import GlowingCard from '../GlowingCard';

const LocalBalanceContainer = () => {
  const { balance } = useTransactions();
  return <GlowingCard title="Balance:" numberValue={balance} />;
};

export default LocalBalanceContainer;
