import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const SALT_VALUE = process.env.SALT_VALUE;

export default { PORT, DB_URI, SALT_VALUE };
