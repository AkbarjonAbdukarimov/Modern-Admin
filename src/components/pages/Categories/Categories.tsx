import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Loading from '../../Loading';
import {  SpeedDial, SpeedDialIcon } from '@mui/material';
import axios from 'axios';
import IError from '../../../interfaces/IError';
import Errors from '../../Errors';

type Categories = { id: string, name: string }

const getCategories = () => axios.get('/categories')
export default function Categories() {
    const [errs, setErrs] = useState<IError[] | undefined>()
    useEffect(() => {
        refetch()
    }, [])
    const { isLoading, data, refetch } = useQuery(['categories'], getCategories)

    const columns: GridColDef<Categories>[] = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: 'Category Name', width: 150 },
        {
            field: 'Details', headerName: '', width: 150,
            renderCell: (params) => (
                <Link to={`/categories/${params.id}`}>Details</Link>
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
                    onClick={() => { handleDelete(params.id.toString()); }}

                >
                    Delete
                </Link>
            )
        },

    ];
    function handleDelete(id: string) {
        axios.delete('/categories/' + id).then(() => {
            return refetch()
        }).catch(e => setErrs(e))
    }

    if (isLoading) {
        return <Loading isLoading={isLoading} />
    }



    return <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={data?.data}
            columns={columns}
            autoHeight={true}
        />
        <Errors errs={errs} />
        <div style={{
            position: 'fixed',
            right: 0,
            bottom: 0

        }}>

            <Link to='/categories/new'>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                </SpeedDial></Link>
        </div>
    </div>;
}
