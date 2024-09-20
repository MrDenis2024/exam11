import {CorsOptions} from 'cors';


const corsWhiteList = ['http://localhost:5173'];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if(!origin || corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else  {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const config = {
  corsOptions,
  database: 'mongodb://localhost/test',
};

export default config;