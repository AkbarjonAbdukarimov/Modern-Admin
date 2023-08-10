import { useParams } from 'react-router-dom'
import ISubcategory from '../../../interfaces/ISubcategory'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Typography } from '@mui/material'
import Loading from '../../Loading'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useState } from 'react'

const getSubcategory = (id: string): Promise<ISubcategory> => axios.get(`/subcategories/` + id).then(res => res.data)


const columns: GridColDef<ISubcategory['props']>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150, valueGetter: params => params.row.prop.name },
    { field: 'value', headerName: 'Value', width: 250 },
    { field: 'label', headerName: 'Label Name', width: 150, valueGetter: params => params.row.prop.label },

];

export default function Subcategory() {
    const { subCtId } = useParams()
    const [err, setError] = useState<[{ message: string }] | undefined>()

    const { isLoading, data } = useQuery(['subcatecody', subCtId], () => getSubcategory(subCtId))
    if (isLoading) {
        return <Loading isLoading={isLoading} />
    }
    // const subcategory = data?.data
    if (!data) {
        return <></>
    }
    return <div className=''>
        <div className="container my-3">

            <Typography variant="h3" component="h2">
                {data.name}  Subcategory
            </Typography>

        </div>

        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data.props}
                columns={columns}
                // initialState={{
                //     pagination: {
                //         paginationModel: { page: 0, pageSize: 2 },
                //     },
                // }}
                // pageSizeOptions={[2, 5, 10]}
                checkboxSelection
                autoHeight={true}

            />

        </div>
    </div>

}
