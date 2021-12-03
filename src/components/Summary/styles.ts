import styled, { css } from 'styled-components';

interface SummaryProps {
  type?: 'income' | 'outcome' | 'total';
}

const summaryTypes = {
  income: css`
    color: #12a454;
  `,
  outcome: css`
    color: #e83f5b;
  `,
  total: css`
    color: var(--dark-blue);
  `,
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-top: -7rem;
`;

export const Card = styled.div<SummaryProps>`
  div {
    background: var(--white);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        ${(props) => summaryTypes[props.type || 'total']};
      }
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

    &.highlight-background {
      background: var(--yellow);
    }
  }
`;
