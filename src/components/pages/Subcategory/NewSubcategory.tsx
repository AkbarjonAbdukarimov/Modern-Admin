import SubcategoryForm from './Form/SubcategoryForm'

export default function NewSubcategory() {
    return (
        <div><SubcategoryForm requestPath='/subcategories/new' formType='new' /></div>
    )
}
