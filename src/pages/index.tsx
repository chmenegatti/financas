import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from '../components/Dashboard';
import { Header } from '../components/Header';
import { NewTransactionModal } from '../components/NewTransactionModal';
import { TransactionsProvider } from '../hooks/useTransactions';
import { GlobalStyle } from '../styles/global';

export default function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenNewTransactionModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseNewTransactionModal = () => {
    setModalIsOpen(false);
  };

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
