import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../service/dbConnection';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = request;

  const dataBase = await connectToDatabase(process.env.MONGODB_URI!);

  const collection = dataBase.collection('transactions');

  switch (method) {
    case 'DELETE':
      const resultDelete = await collection.deleteOne({ myId: id });

      response.status(200).json({
        message: resultDelete,
      });
      break;
    default:
      response.status(400).json({
        message: 'Metodo desconhecido',
      });
      break;
  }
}
