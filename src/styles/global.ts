import { createGlobalStyle } from 'styled-components';

// color-pallet
// https://coolors.co/e63946-f7fff7-343434-32324b-2f3061-3f4e79-4e6b91-6ca6c1-ffe66d-32908f

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f2eee2;

    --red: #e63946;
    --blue: #4e6b91;
    --light-blue: #6ca6c1;
    --dark-blue: #3f4e79;
    --green: #32908f;

    --yellow: #ffe66d;
    --orange: #ff9f1c;

    --white: #ffffff;
    --black: #000000;

    --text-title: #343434;
    --text-body: #767a76;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, textarea {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .react-modal-overlay {
    background-color: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-modal-content {
    background-color: var(--background);
    border-radius: 0.25rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
    padding: 3rem;
    width: 100%;
    max-width: 30rem;
    position: relative;
  }

  .react-modal-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    border: 0;
    background: transparent;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(1.2);
    }
  }
`;
