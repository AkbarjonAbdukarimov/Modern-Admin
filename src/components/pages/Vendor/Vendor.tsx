import axios from "axios";
import IVendor from "../../../interfaces/Vendor/IVendor";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import IError from "../../../interfaces/IError";
import Loading from "../../Loading";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import Errors from "../../Errors";
const getVendor = (id: string): Promise<IVendor> =>
  axios.get<IVendor>(`/vendors/${id}`).then((response) => response.data);

export const Vendor = () => {
  const [errs, setErrs] = useState<IError[] | undefined>();
  const { id } = useParams();
  const { isLoading, data, refetch } = useQuery(["vendor", id], () =>
    getVendor(String(id))
  );
  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: data?.name, width: 150 },
    {
      field: "Details",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <Link to={`/vendors/${id}/${params.id}`}>Details</Link>
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
          to={""}
          onClick={() => {
            handleDelete(String(params.id));
          }}
        >
          Delete
        </Link>
      ),
    },
  ];

  function handleDelete(id: string) {
    axios
      .delete("/products/delete/" + id)
      .then((_res) => {
        return refetch();
      })
      .catch((e) => setErrs([...e.response.date.errors]));
  }
  if (data) {
    return (
      <div className="row justify-content-center mt-3 w-100">
        <DataGrid
          rows={data.products || []}
          columns={columns}
          autoHeight={true}
        />
        <Errors errs={errs} />
        {/* <div style={{
          position: 'fixed',
          right: 0,
          bottom: 0

        }}>
          <Link to={`/vendors/${id}/new`}>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: 'absolute', bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
            >
            </SpeedDial></Link>
        </div> */}
      </div>
    );
  }
};
