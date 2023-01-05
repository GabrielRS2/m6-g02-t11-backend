import "dotenv/config";
import { createDatabase } from "typeorm-extension";

export const create = async () => {
  try {
    await createDatabase({ ifNotExist: true });
  } catch (error) {
    console.log("Opss!!Verifique se foi gerado o banco de dados");
  }
};
create();
