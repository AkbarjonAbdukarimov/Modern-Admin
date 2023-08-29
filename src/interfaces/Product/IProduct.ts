import IVendor from "../Vendor/IVendor";
import IPrice from "./IPrice";
import IProductMedia from "./IProducMedia";
import IProps from "./IProps";
import IReview from "../Review/IReview";
import IAdmin from "../IAdmin";
import ICategory from "../ICategory";
import ISubcategory from "../ISubcategory";
import IFormatedProps from "../Props/IFormaterProps";

export default interface IProduct {
  id: string;
  vendorId: IVendor;
  name: string;
  description: string;
  category:ICategory
  subcategory:ISubcategory
  price: Array<IPrice>;
  media: Array<IProductMedia>;
  video: IProductMedia;
  props: Array<IFormatedProps>;
  review: Array<IReview>;
  author:IAdmin;
  likes:[string]
  viewCount:number
}
