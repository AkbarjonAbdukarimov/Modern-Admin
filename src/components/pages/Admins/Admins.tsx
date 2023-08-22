import { SpeedDial, SpeedDialIcon } from '@mui/material';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Loading from '../../Loading';
import axios from 'axios';
import IAdmin from '../../../interfaces/IAdmin';
const getAdmins = (): Promise<IAdmin[]> => axios.get<IAdmin[]>('/admins').then(res => res.data).catch(e => e)
const Admins = () => {
    const { isLoading, data } = useQuery(['admins'], getAdmins)

    const columns: GridColDef<IAdmin>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'email', headerName: 'Email', width: 150 },

        { field: 'vendor', headerName: 'Vendor', width: 130, valueGetter: params => { if (params.row.vendorId) return params.row.vendorId.name } },
        { field: 'contacts', headerName: 'Vendor Contacts', width: 130, valueGetter: params => { if (params.row.vendorId) return params.row.vendorId.contacts.phoneNumber } },

        // {
        //     field: 'Details', headerName: '', width: 150,
        //     renderCell: (params) => (
        //         <Link to={`/props/${params.id}`}>Details</Link>
        //     )
        // },
        {
            field: 'Edit', headerName: '', width: 150,
            renderCell: (params) => (
                <Link to={`/admins/edit/${params.id}`}>Edit</Link>
            )
        }


    ];

    if (isLoading) {
        return <Loading isLoading={isLoading} />
    }
    return (
        <>
            {/* <div className="container my-1">
                <h1>All Properties</h1>
            </div> */}
            <div style={{ height: 400, width: '100%' }}>

                <DataGrid
                    rows={data}
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
            <div style={{
                position: 'fixed',
                right: 0,
                bottom: 0

            }}>

                <Link to={`/admins/new`}>
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
export default Admins