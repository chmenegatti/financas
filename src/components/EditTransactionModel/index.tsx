import { FormEvent, useState, useEffect } from 'react';

import Modal from 'react-modal';

import { CgCloseO } from 'react-icons/cg';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface EditTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function EditTransactionModal({
  isOpen,
  onRequestClose,
}: EditTransactionModalProps) {
  const [myId, setMyId] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  const { editTransaction } = useTransactions();

  const transaction = window.localStorage.getItem('transactionToEdit');

  useEffect(() => {
    if (transaction) {
      const parsedTransaction = JSON.parse(transaction);
      setMyId(parsedTransaction.myId);
      setTitle(parsedTransaction.title);
      setAmount(parsedTransaction.amount);
      setType(parsedTransaction.type);
      setCategory(parsedTransaction.category);
    }
  }, [transaction]);

  const handleEditTransaction = async (event: FormEvent) => {
    event.preventDefault();

    await editTransaction({ myId, title, amount, type, category });

    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <CgCloseO size={20} />
      </button>

      <Container onSubmit={handleEditTransaction}>
        <h2>Cadastrar Transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('income')}
            isActive={type === 'income'}
            activeColor="green"
            name="income"
          >
            <FaArrowAltCircleUp size={24} color="#12a454" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType('outcome')}
            isActive={type === 'outcome'}
            activeColor="red"
            name="outcome"
          >
            <FaArrowAltCircleDown size={24} color="#e83f5b" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Alterar</button>
      </Container>
    </Modal>
  );
}
