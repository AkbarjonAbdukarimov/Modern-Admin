import IVendor from "./Vendor/IVendor";

export default interface IAdmin {
  id: string;
  email: string;
  password: string;
  vendorId?: IVendor;
  token: string;
  super:boolean
}
