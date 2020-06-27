import { DATA_BASE_KEY, LOCATION_DATA_BASE_KEY } from '../constants/keys';
import { SAP_CONTROL } from '../config/app-config';
import { ENVIRONMENT } from '../constants/app-constants';
export let dbConfig = {
  host: '62.234.76.58',
  user: 'root',
  password: DATA_BASE_KEY,
  database: 'college',
  port: 3306,
  // 最大连接数，默认为10
  connectionLimit: 10
};

if (SAP_CONTROL === ENVIRONMENT.DEV) {
  // 开发环境域名
  dbConfig = {
    host: 'localhost',
    user: 'root',
    password: LOCATION_DATA_BASE_KEY,
    database: 'college',
    port: 3306,
    // 最大连接数，默认为10
    connectionLimit: 10
  };
} else if (SAP_CONTROL === ENVIRONMENT.TEST) {
  // 测试环境域名
  dbConfig = {
    host: 'localhost',
    user: 'root',
    password: LOCATION_DATA_BASE_KEY,
    database: 'college',
    port: 3306,
    // 最大连接数，默认为10
    connectionLimit: 10
  };
} else {
  // 生产环境域名
  dbConfig = {
    host: 'localhost',
    user: 'root',
    password: DATA_BASE_KEY,
    database: 'college',
    port: 3306,
    // 最大连接数，默认为10
    connectionLimit: 10
  }
}