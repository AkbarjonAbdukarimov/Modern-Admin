import axios from 'axios'
import React, { useEffect, useState } from 'react'
import IVendor from "../../../interfaces/Vendor/IVendor"
import { useQuery } from 'react-query'
import IError from '../../../interfaces/IError'
import { Link } from 'react-router-dom'
import { GridColDef, DataGrid } from '@mui/x-data-grid'
import { Button, SpeedDial, SpeedDialIcon } from '@mui/material';
import Errors from '../../Errors'
import Loading from '../../Loading'
const getCategories = () => axios.get('/vendors')
// const getVendors = (id: string): Promise<IVendor> => axios.get(`/categories/${id}`).then((response) => response.data)


export const Vendors = () => {
    const [errs, setErrs] = useState<IError[] | undefined>()
    const { isLoading, data, refetch } = useQuery(['vendors'], getCategories)
    useEffect(() => {
        refetch()
    }, [])
    function handleDelete(id: string) {
        axios.delete('/vendors/' + id).then(res => {
            return refetch()
        }).catch(e => setErrs(e))
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: 'Vendor Name', width: 150 },
        {
            field: 'Details', headerName: '', width: 150,
            renderCell: (params) => (
                <Link to={`/vendors/${params.id}`}>Details</Link>
            )
        },
        {
            field: 'Edit', headerName: '', width: 150,
            renderCell: (params) => (
                <Link to={`/vendors/edit/${params.id}`}>Edit</Link>
            )
        },
        {
            field: 'Delete', headerName: '', width: 150,
            renderCell: (params) => (
                <Link
                    to={""}
                    onClick={() => { handleDelete(String(params.id)); }}
                >
                    Delete
                </Link>
            )
        },
    ];

    if (isLoading) return <Loading isLoading={isLoading} />

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data?.data}
                columns={columns}
                autoHeight={true}
            />
            <Errors errs={errs} />
            <Link to='/vendors/new'>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                </SpeedDial></Link>
        </div>
    )
}
