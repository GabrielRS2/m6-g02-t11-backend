import "dotenv/config";

import { create } from "./create_database";
import { drop } from "./drop_database";

export const recreate = async () => {
  try {
    await drop();
    await create();
  } catch (error) {
    console.log("Opss!!:Verifique se foi gerado o banco de dados");
  }
};
recreate();
