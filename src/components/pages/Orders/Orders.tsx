import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import Errors from "../../Errors";
import IOrder from "../../../interfaces/Order/IOrder";
import axios from "axios";
import { useQuery } from "react-query";
import IError from "../../../interfaces/IError";
const getOrders = () =>
  axios.get<IOrder[]>("/orders/vendor").then((res) => {;console.log(res.data);return res.data});
export default function Orders() {
  const [errs, setErrs] = useState<IError[] | undefined>();
  const { isLoading, data, refetch, isError, error } = useQuery(
    ["orders"],
    getOrders
  );
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "orderStatus", headerName: "Order Status", width: 100 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 250,
      valueGetter: (params) =>
        params.row.createdAt,
    },
    {
      field: "total",
      headerName: "Total Price",
      width: 130,
      valueGetter: (params) =>
        params.row.total.toLocaleString(),
    },

    // {
    //   field: "Details",
    //   headerName: "",
    //   width: 150,
    //   renderCell: (params) => (
    //     <Link to={`/products/${params.id}`}>Details</Link>
    //   ),
    // },
    // {
    //   field: "Edit",
    //   headerName: "",
    //   width: 150,
    //   renderCell: (params) => (
    //     <Link to={`/products/edit/${params.id}`}>Edit</Link>
    //   ),
    // },
    // {
    //   field: "Delete",
    //   headerName: "",
    //   width: 150,
    //   renderCell: (params) => (
    //     <Link
    //       to={"/products"}
    //       onClick={() => {
    //         handleDelete(params.id);
    //       }}
    //     >
    //       Delete
    //     </Link>
    //   ),
    // },
  ];
  return (
    <>
      <div>
        <DataGrid rows={data||[]} columns={columns} />
      </div>
      <Errors errs={errs} />
    </>
  );
}


