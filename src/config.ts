import { config } from 'dotenv';

config({
  path: `${__dirname}/../.env`,
});

const PORT = process.env.PORT || 3001;

export default PORT;
