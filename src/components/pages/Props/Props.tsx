import Loading from "../../Loading"
import { useQuery } from "react-query"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import axios from "axios"
import { SpeedDial, SpeedDialIcon } from "@mui/material"

const getProps = () => axios.get('/props')
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Prop Name', width: 150 },
    { field: 'label', headerName: 'Prop Label', width: 150 },
    {
        field: 'Details', headerName: '', width: 150,
        renderCell: (params) => (
            <Link to={`/props/${params.id}`}>Details</Link>
        )
    },
    {
        field: 'Edit', headerName: '', width: 150,
        renderCell: (params) => (
            <Link to={`/props/edit/${params.id}`}>Edit</Link>
        )
    }


];
export default function Props() {
    const { isLoading, data } = useQuery(['props'], getProps)
    if (isLoading) {
        return <Loading isLoading={isLoading} />
    }
    return (
        <>
            <div className="container my-1">
                <h1>All Properties</h1>
            </div>
            <div style={{ height: 400, width: '100%' }}>

                <DataGrid
                    rows={data.data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    autoHeight={true}

                    checkboxSelection
                />
            </div >
            <Link to={`/props/new`}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                </SpeedDial></Link>
        </>
    )
}
