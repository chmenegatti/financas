import styled from 'styled-components';

export const Container = styled.header`
  background: var(--blue);
`;

export const Content = styled.div`
  width: 90%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem 8rem;

  h1 {
    color: var(--white);
    font-size: 2.4rem;
    font-weight: 700;
    position: relative;
  }

  button {
    background: var(--dark-blue);
    border: 0;
    border-radius: 0.25rem;
    padding: 0 2rem;
    color: var(--white);
    font-weight: bold;
    height: 3rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
