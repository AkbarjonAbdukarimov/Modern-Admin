import { useParams } from 'react-router-dom'
import SubcategoryForm from './Form/SubcategoryForm'

export default function NewSubcategory() {
    const {id}=useParams()
    return (
        <div><SubcategoryForm requestPath='/subcategories/new' formType='new' categoryId={id} /></div>
    )
}
