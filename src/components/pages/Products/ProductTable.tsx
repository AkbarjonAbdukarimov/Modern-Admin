import { DataGrid, GridColDef } from '@mui/x-data-grid';
import IProduct from '../../../interfaces/Product/IProduct';
import { FunctionComponent } from 'react';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Product Name', width: 150 },
    //{ field: 'category', headerName: 'Category', width: 130, valueGetter: params => params.row.category.name },
    //{ field: 'subcategory', headerName: 'Subcategory', width: 130, valueGetter: params => params.row.subcategory.name },

];

interface ProductTableProps {
    data: {
        products: IProduct[];
        page: number;
        totalCount: number
    }
}

const ProductTable: FunctionComponent<ProductTableProps> = ({ data }) => {
    return <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={data.products}
            columns={columns}

        />
    </div>;
}

export default ProductTable;

