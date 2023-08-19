import React from 'react'
import VendorForm from '../Vendor/VendorForm'
import AdminForm from './AdminForm'

function NewAdmin() {
    return (
        <AdminForm formType='new' requestPath={'/admins/new'} id={undefined} />
    )
}

export default NewAdmin