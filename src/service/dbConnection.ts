import { Db, MongoClient } from 'mongodb';

let cachedDb: Db | undefined;

export async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const dataBaseClient = await MongoClient.connect(uri, {});

  const dataBaseName = 'sensedata';

  const dataBase = dataBaseClient.db(dataBaseName);

  cachedDb = dataBase;

  return dataBase;
}
