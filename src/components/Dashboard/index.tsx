import { FeedTable } from '../FeedTable';
import { Summary } from '../Summary';
import { Container } from './styles';

export function Dashboard() {
  return (
    <Container>
      <Summary />
      <FeedTable />
    </Container>
  );
}
