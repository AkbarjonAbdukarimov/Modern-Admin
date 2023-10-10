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
        //         <Link to={`/props/${params.id}`}>
        //             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        //                 <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 5.44772 3.44772 5 4 5H5C5.55228 5 6 5.44772 6 6C6 6.55228 5.55228 7 5 7H4C3.44772 7 3 6.55228 3 6ZM8 6C8 5.44772 8.44772 5 9 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H9C8.44772 7 8 6.55228 8 6ZM3 12C3 11.4477 3.44772 11 4 11H5C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13H4C3.44772 13 3 12.5523 3 12ZM8 12C8 11.4477 8.44772 11 9 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H9C8.44772 13 8 12.5523 8 12ZM3 18C3 17.4477 3.44772 17 4 17H5C5.55228 17 6 17.4477 6 18C6 18.5523 5.55228 19 5 19H4C3.44772 19 3 18.5523 3 18ZM8 18C8 17.4477 8.44772 17 9 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H9C8.44772 19 8 18.5523 8 18Z" fill="#FED501" />
        //             </svg>
        //         </Link>
        //     )
        // },
        {
            field: 'Edit', headerName: '', width: 150,
            renderCell: (params) => (
                <Link to={`/admins/edit/${params.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8787 2.70711C16.0503 1.53553 17.9497 1.53553 19.1213 2.70711L21.2929 4.87868C22.4645 6.05026 22.4645 7.94975 21.2929 9.12132L13.7071 16.7071C13.5196 16.8946 13.2652 17 13 17H8C7.44772 17 7 16.5523 7 16V11C7 10.7348 7.10536 10.4804 7.29289 10.2929L14.8787 2.70711ZM17.7071 4.12132C17.3166 3.7308 16.6834 3.7308 16.2929 4.12132L9 11.4142V15H12.5858L19.8787 7.70711C20.2692 7.31658 20.2692 6.68342 19.8787 6.2929L17.7071 4.12132L18.2283 3.60015L17.7071 4.12132ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V14C20 13.4477 20.4477 13 21 13C21.5523 13 22 13.4477 22 14V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2H10C10.5523 2 11 2.44772 11 3C11 3.55228 10.5523 4 10 4H7Z" fill="#00FF7F" />
                    </svg>
                </Link>
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
                    rows={data || []}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    autoHeight={true}
                    checkboxSelection
                    className="tableStyle"
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