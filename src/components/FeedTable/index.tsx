import { useTransactions } from '../../hooks/useTransactions';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import { Container } from './styles';

export function FeedTable() {
  const { transactions, deleteTransaction } = useTransactions();

  const handleDelete = async (id: string) => {
    await deleteTransaction(id);
  };

  return (
    <Container>
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
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{Number(index) + 1}</td>
              {console.log(transaction._id)}
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
                <button type="button">
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
    </Container>
  );
}
