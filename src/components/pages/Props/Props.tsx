import Loading from "../../Loading"
import { useQuery } from "react-query"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import axios from "axios"
import { SpeedDial, SpeedDialIcon } from "@mui/material"
import Errors from "../../Errors"
import { useState } from "react"
import IError from "../../../interfaces/IError"

const getProps = () => axios.get('/props')

export default function Props() {
    const { isLoading, data, refetch } = useQuery(['props'], getProps)
    const [errs, setErrs] = useState<IError[] | undefined>()

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
        },
        {
            field: 'Delete', headerName: '', width: 150,
            renderCell: (params) => (
                <Link
                    to={""}
                    onClick={() => { handleDelete(params.id); }}

                >
                    Delete
                </Link>
            )
        },


    ];



    function handleDelete(id: string) {
        axios.delete('/props/delete/' + id).then(res => {
            return refetch()
        }).catch(e => setErrs(e))
    }
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
            <Errors errs={errs} />
            <div style={{
                position: 'fixed',
                right: 0,
                bottom: 0

            }}>

                <Link to={`/props/new`}>
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon />}
                    >
                    </SpeedDial></Link>
            </div>
        </>
    )
}
