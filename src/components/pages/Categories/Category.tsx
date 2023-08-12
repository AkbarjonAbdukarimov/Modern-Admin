import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import Loading from '../../Loading'
import { SpeedDial, SpeedDialIcon } from '@mui/material'
import axios from 'axios'
import ICategory from '../../../interfaces/ICategory'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import IError from '../../../interfaces/IError'
import { useState } from 'react'
import Errors from '../../Errors'

type Categories = { id: string, name: string }

const getCategory = (id: string): Promise<ICategory> => axios.get(`/categories/${id}`).then((response) => response.data)
export default function Category() {
    const [errs, setErrs] = useState<IError[] | undefined>()
    const { id } = useParams()
    const { isLoading, data, refetch } = useQuery<ICategory>(['catecody', id], () => getCategory(id))

    if (isLoading) {
        return <Loading isLoading={isLoading} />
    }

    if (!data) {
        return <></>
    }

    function handleDelete(id: string) {
        axios.delete('/categories/' + id).then(res => {
            return refetch()
        }).catch(e => setErrs(e))
    }

    const columns: GridColDef<Categories>[] = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: 'Category Name', width: 150 },
        {
            field: 'Details', headerName: '', width: 150,
            renderCell: (params) => (
                <Link to={`/categories/${id}/subcategory/${params.id}`}>Details</Link>
            )
        },
        {
            field: 'Edit', headerName: '', width: 150,
            renderCell: (params) => (
                <Link to={`/categories/edit/${params.id}`}>Edit</Link>
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

    return (

        <div className='row justify-content-center mt-3 w-100'>
            {/* <div className="col-4">
                <div className='d-flex justify-content-evenly py-2'>
                    <h1>{data.name}
                    </h1>
                    {
                        data.icon && <img src={`https://ik.imagekit.io/z6k3ktb71/${data.icon?.name}`} alt="" />
                    }

                </div>
                <div className="list-group">
                    <li className="list-group-item list-group-item-action active" aria-current="true">
                        Subcategories
                    </li>
                    {data.subcategories.map(s => <div key={s.id} >
                        <Link to={`/categories/${id}/subcategory/${s.id}`} className='text-decoration-none'><button type="button" className="list-group-item list-group-item-action">{s.name}</button></Link>
                    </div>)}

                </div>
                <h3></h3>
            </div> */}
            <DataGrid
                rows={data?.subcategories}
                columns={columns}
                // initialState={{
                //     pagination: {
                //         paginationModel: { page: 0, pageSize: 2 },
                //     },
                // }}
                autoHeight={true}
            // checkboxSelection
            // onRowSelectionModelChange={(newRowSelectionModel) => {
            //     setSelectedItems(newRowSelectionModel)
            // }}

            />
            <Errors errs={errs} />
            <Link to={`/categories/${id}/new`}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                </SpeedDial></Link>
        </div>
    )
}