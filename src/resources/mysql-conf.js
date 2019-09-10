import { DATA_BASE_KEY } from '../constants/keys';

export const dbConfig = {
  host: '62.234.76.58',
  user: 'root',
  password: DATA_BASE_KEY,
  database: 'college',
  port: 3306,
  // 最大连接数，默认为10
  connectionLimit: 10
};