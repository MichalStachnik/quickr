'use client';

import { useTransactions } from '@/context/TransactionContext';
import GlowingCard from '../GlowingCard';

const LocalBalanceContainer = () => {
  const { balance } = useTransactions();
  const numberColor = balance > 0 ? 'text-emerald-400' : 'text-rose-400';
  return (
    <GlowingCard
      title="Balance:"
      numberValue={balance}
      numberColor={numberColor}
    />
  );
};

export default LocalBalanceContainer;
