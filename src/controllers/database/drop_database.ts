import "dotenv/config";
import { dropDatabase } from "typeorm-extension";
export const drop = async () => {
  try {
    await dropDatabase({ ifExist: true });
  } catch (error) {
    console.log(
      "Opss!! Talvez haja alguem usando o banco de dados. Verifique se foi deletado."
    );
  }
};
drop();
