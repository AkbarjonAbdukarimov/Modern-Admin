import { FunctionComponent, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { SpeedDial, SpeedDialIcon } from "@mui/material";
import Loading from "../../Loading";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IProduct from "../../../interfaces/Product/IProduct";
import IError from "../../../interfaces/IError";
import Errors from "../../Errors";

interface Product {
  products: IProduct[];
  page: number;
  totalCount: number;
}
const getProducts = () =>
  axios.get<Product>("/products/admin").then((res) => res.data);
const Products: FunctionComponent = () => {
  const { isLoading, data, refetch, isError, error } = useQuery(
    ["products"],
    getProducts
  );
  const [errs, setErrs] = useState<IError[] | undefined>();

  function handleDelete(id: string) {
    axios
      .delete("/products/delete/" + id)
      .then((_res) => {
        return refetch();
      })
      .catch((e) => setErrs([...e.response.data.errors]));
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", width: 150 },
    {
      field: "category",
      headerName: "Category",
      width: 130,
      valueGetter: (params) =>
        params.row.category ? params.row.category.name : "",
    },
    {
      field: "subcategory",
      headerName: "Subcategory",
      width: 130,
      valueGetter: (params) =>
        params.row.subcategory ? params.row.subcategory.name : "",
    },

    {
      field: "Details",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <Link to={`/products/${params.id}`}>Details</Link>
      ),
    },
    {
      field: "Edit",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <Link to={`/products/edit/${params.id}`}>Edit</Link>
      ),
    },
    {
      field: "Delete",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <Link
          to={"/products"}
          onClick={() => {
            handleDelete(params.id.toString());
          }}
        >
          Delete
        </Link>
      ),
    },
  ];
  if (isError) {
    console.log(error);
    // if (error.response) {
    //   if (error.response.data.status === 403) {
    //     localStorage.clear();
    //     setAdmin(undefined);
    //   }
    // }
    //setErrs([...error.response.data.errors]);
    return <Errors errs={errs} />;
  }
  if (isLoading || !data) {
    return <Loading isLoading={isLoading} />;
  }
  return (
    <>
      <div>
        <DataGrid rows={data.products} columns={columns} />
      </div>
      <Errors errs={errs} />
      <div
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
        }}
      >
        <Link to="/products/new">
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          ></SpeedDial>
        </Link>
      </div>
    </>
  );
};

export default Products;
