import { Transaction } from '@/types/Transaction';
import getTransactions from '../actions/getTransactions';
import TransactionItem from './TransactionItem';

const TransactionList = async () => {
  const { transactions, error } = await getTransactions();

  if (error) {
    return <p className="error">{error}</p>;
  }
  return (
    <div>
      <ul className="list">
        {transactions
          ? transactions.map((t: Transaction) => {
              return <TransactionItem key={t.id} transaction={t} />;
            })
          : null}
      </ul>
    </div>
  );
};

export default TransactionList;
