import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../service/dbConnection';
import { v4 as uuidv4 } from 'uuid';

export default async function transactionHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request;

  const dataBase = await connectToDatabase(process.env.MONGODB_URI!);

  const collection = dataBase.collection('transactions');

  switch (method) {
    case 'GET':
      const transactions = await collection.find().toArray();
      response.status(200).json({ transactions });
      break;
    case 'POST':
      const body = request.body;

      const result = await collection.insertOne({
        ...body,
        myId: uuidv4(),
        createdAt: new Date(),
      });

      response.status(200).json({ result });

      break;
    default:
      response.status(400).json({
        message: 'Hello World - Metodo desconhecido',
      });
      break;
  }
}
