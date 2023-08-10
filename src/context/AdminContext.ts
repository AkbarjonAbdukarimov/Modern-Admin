import { Dispatch, SetStateAction, createContext } from "react";
import IAdmin from "../interfaces/IAdmin";

interface IAdminContex {
  admin: IAdmin | undefined;
  setAdmin: () => Dispatch<SetStateAction<IAdmin | undefined>>;
}
const AdminContext = createContext<IAdminContex | undefined>({});
export default AdminContext;
