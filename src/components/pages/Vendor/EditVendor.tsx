import VendorForm from './VendorForm'
import { useParams } from 'react-router-dom'
export const EditVendor = () => {
    const { id } = useParams()
    return (
        <><VendorForm formType='edit' requestPath={`/vendors/edit/${id}`} id={id} /></>
    )
}
