import { Transaction, useTransactions } from '../../hooks/useTransactions';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Container, FilterSection } from './styles';

import { useCallback, useEffect, useState } from 'react';
import { EditTransactionModal } from '../EditTransactionModel';

export function FeedTable() {
  const { transactions, deleteTransaction } = useTransactions();
  const [editTransaction, setEditTransaction] = useState<Transaction>(
    {} as Transaction
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [filter, setFilter] = useState<Transaction[]>(transactions);

  const handleOpenEditModal = (transaction: Transaction) => {
    setEditTransaction(transaction);
    setModalIsOpen(true);
  };

  const handleCloseEditmModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteTransaction(id);
  };

  useEffect(() => {
    setFilter(transactions);
  }, [transactions]);

  const handleFilter = useCallback(
    (type: string) => {
      if (type === 'all') {
        setFilter(transactions);
        return transactions;
      }
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.type === type
      );

      setFilter(filteredTransactions);

      return filteredTransactions;
    },
    [filter]
  );

  return (
    <Container>
      <FilterSection>
        <button type="button" onClick={() => handleFilter('income')}>
          Entradas
        </button>
        <button type="button" onClick={() => handleFilter('outcome')}>
          Saídas
        </button>
        <button type="button" onClick={() => handleFilter('all')}>
          Todos
        </button>
      </FilterSection>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {filter.map((transaction, index) => (
            <tr key={index}>
              <td>{Number(index) + 1}</td>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt)
                )}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(transaction)}
                >
                  <FaPencilAlt size={16} />
                </button>
                <button type="button">
                  <FaTrashAlt
                    size={16}
                    color="#e63946"
                    onClick={() => handleDelete(transaction.myId)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditTransactionModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseEditmModal}
        transaction={editTransaction}
      />
    </Container>
  );
}
