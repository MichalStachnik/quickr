'use client';

import { useTransactions } from '@/context/TransactionContext';

import LocalTransactionItem from './LocalTransactionItem';

const LocalTransactionList = () => {
  const { transactions } = useTransactions();

  return (
    <div>
      <h3>Transactions</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <LocalTransactionItem
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </ul>
    </div>
  );
};

export default LocalTransactionList;
