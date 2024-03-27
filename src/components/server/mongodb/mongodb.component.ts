import {Db, MongoClient} from 'mongodb';
class Database {

  public static instance: Database;
  private client: MongoClient;
  public db: Db;
  private logedIn: boolean = false;

  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI as string);
    this.db = {} as Db;
  }

  public static async getInstance() {
    
    return new Promise<Database>(async (resolve, reject) => {
      if (!Database.instance) {
        Database.instance = new Database()
        await Database.instance.login();
      }
      if (!this.instance.logedIn) {
        await Database.instance.login();
      }
      resolve(Database.instance);
    })
  }

  private login = async () => {
    await this.connect();
    await this.setDB();
    this.logedIn = true;
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
        this.db = this.client.db(process.env.MONGO_DB as string);
        resolve();
      } catch (error) {
        await this.setDB();
      }
    })
  }
}

export { Database };