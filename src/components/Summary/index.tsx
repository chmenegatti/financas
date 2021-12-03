import { Card, Container } from './styles';
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaCoins,
} from 'react-icons/fa';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (accumulator, transaction) => {
      const { amount, type } = transaction;
      if (type === 'income') {
        accumulator.income += amount;
        accumulator.total += amount;
      } else {
        accumulator.outcome += amount;
        accumulator.total -= amount;
      }

      return accumulator;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <Card type="income">
        <div>
          <header>
            <p>Entradas</p>
            <FaArrowAltCircleUp size={24} />
          </header>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(summary.income)}
          </strong>
        </div>
      </Card>
      <Card type="outcome">
        <div>
          <header>
            <p>Saídas</p>
            <FaArrowAltCircleDown size={24} />
          </header>
          <strong>
            {summary.outcome !== 0 ? '-' : ''}
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(summary.outcome)}
          </strong>
        </div>
      </Card>
      <Card type="total">
        <div className="highlight-background">
          <header>
            <p>Total</p>
            <FaCoins size={24} />
          </header>
          {summary.total > 0 ? (
            <strong style={{ color: '#12a454', fontWeight: 700 }}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(summary.total)}
            </strong>
          ) : (
            <strong style={{ color: '#e83f5b', fontWeight: 700 }}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(summary.total)}
            </strong>
          )}
        </div>
      </Card>
    </Container>
  );
}
