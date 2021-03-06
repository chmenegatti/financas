import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../service/api';

export interface Transaction {
  _id: string;
  myId: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, '_id' | 'myId' | 'createdAt'>;

type EditTransactionInput = Omit<Transaction, '_id' | 'createdAt'>;
interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void | undefined>;
  editTransaction: (
    transaction: EditTransactionInput
  ) => Promise<Transaction | undefined>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get('/transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    await api
      .get('/transactions')
      .then((response) => setTransactions(response.data.transactions));
  }

  async function editTransaction(transaction: EditTransactionInput) {
    const { myId, title, category, amount, type } = transaction;
    const response = await api.put(`/transactions`, {
      myId,
      title,
      category,
      amount,
      type,
    });
    await api
      .get('/transactions')
      .then((response) => setTransactions(response.data.transactions));
    return response.data.transaction;
  }

  async function deleteTransaction(id: string) {
    const response = await api.delete(`/id/${id}`);
    await api
      .get('/transactions')
      .then((response) => setTransactions(response.data.transactions));

    return response.data;
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        deleteTransaction,
        editTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
