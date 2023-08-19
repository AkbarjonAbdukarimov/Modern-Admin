import { FunctionComponent } from "react";
import { useQuery } from "react-query";
import ProductTable from "./ProductTable";
import { Link } from "react-router-dom";
import { SpeedDial, SpeedDialIcon } from "@mui/material";
import Loading from "../../Loading";
import axios from "axios";

interface ProductsProps {

}
const getProducts = () => axios.get('/products')
const Products: FunctionComponent<ProductsProps> = () => {
  const { isLoading, data } = useQuery(['products'], getProducts)
  if (isLoading) {
    return <Loading isLoading={isLoading} />
  }

  return <>

    <ProductTable data={data.data} />
    <div style={{
      position: 'fixed',
      right: 0,
      bottom: 0

    }}>

      <Link to='/products/new'>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
        </SpeedDial></Link>
    </div>
  </>;
}

export default Products;