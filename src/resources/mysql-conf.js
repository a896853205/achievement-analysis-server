import { DATA_BASE_KEY } from '../constants/keys';

export const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: DATA_BASE_KEY,
  database: 'college',
  port: 3306,
  // 最大连接数，默认为10
  connectionLimit: 10
};