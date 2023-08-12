import VendorForm from "./VendorForm"

export default function NewVendor() {
    return <>
        <VendorForm formType='new' requestPath="/vendors/new" />
    </>
}
