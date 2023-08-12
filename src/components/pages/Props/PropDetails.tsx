import { Link, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import Loading from "../../Loading"
import { GridBaseColDef } from "@mui/x-data-grid/internals"
import { DataGrid } from "@mui/x-data-grid"
import axios from "axios"
import IPropValue from "../../../interfaces/Props/IPropValue"
import IProp from "../../../interfaces/Props/IProp"
import { SpeedDial, SpeedDialIcon } from "@mui/material"
interface IPropDetails { prop: IProp, values: IPropValue[] }
const getProp = (propId: string): Promise<IPropDetails> => axios.get(`/props/${propId}`).then(res => res.data).catch(e => e)





export default function PropDetails() {
    const { propId } = useParams()

    const { isLoading, data } = useQuery(['prop', propId], () => getProp(propId))
    if (isLoading) {
        return <Loading isLoading={isLoading} />
    }
    if (!data) return <></>
    const columns: GridBaseColDef[] = [
        { field: 'id', headerName: 'ID', width: 250 },

        { field: 'value', headerName: 'Value', width: 250 },
        // {
        //     field: 'Details', headerName: '', width: 150,
        //     renderCell: (params) => (
        //         <Link to={`/props/${params.id}`}>Details</Link>
        //     )
        // },
        {
            field: 'Edit', headerName: '', width: 150,
            renderCell: (params) => (
                <Link to={`/props/${propId}/values/edit/${params.id}`}>Edit</Link>
            )
        }
    ];
    return (
        <div>
            <div className="container my-1">
                <h1>{data.prop.name} Property Values</h1>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data.values}
                    columns={columns}
                    checkboxSelection
                    autoHeight={true}

                />

            </div>
            <Link to={`/props/${propId}/values/new`}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                </SpeedDial></Link>
        </div>
    )
}
