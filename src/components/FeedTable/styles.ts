import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      text-align: left;
      padding: 1rem 2rem;
      font-weight: 400;
      color: var(--text-title);
      line-height: 1.5rem;
      background: var();
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--white);
      color: var(--text-body);
      border-radius: 0.25rem;

      &:first-child {
        color: var(--text-color);
      }

      &.income {
        color: var(--green);
      }

      &.outcome {
        color: var(--red);
      }

      > button {
        background: none;
        border: 0;
        padding: 0.25rem;
        color: var(--dark-blue);

        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.9);
        }

        > svg {
          margin-left: 0.5rem;
        }
      }
    }
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-left: 1rem;
    padding: 0.5rem;
    width: 8rem;
    border-radius: 0.25rem;
    border: 0;
    background: var(--light-blue);
  }
`;
