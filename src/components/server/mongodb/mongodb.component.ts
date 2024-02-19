import {Db, MongoClient} from 'mongodb';
class Database {
  public static instance: Database;
  private client: MongoClient;
  public db: Db
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI as string);
    this.login();
  }

  private login = async () => {
    await this.connect();
    await this.setDB();
  }

  private connect = async ():Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.client.connect();
        resolve();
      } catch (error) {
        await this.connect();
      }
    })
  }

  private setDB = async () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        console.log('setting db')
        console.log(process.env.MONGO_DB)
        this.db = this.client.db(process.env.MONGO_DB as string);
        resolve();
      } catch (error) {
        await this.setDB();
      }
    })
  }

  public static async getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export { Database };