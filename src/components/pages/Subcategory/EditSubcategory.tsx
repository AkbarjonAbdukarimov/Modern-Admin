import React, { Suspense } from "react";
import SubcategoryForm from "./Form/SubcategoryForm";
import { useParams } from "react-router-dom";
import Loading from "../../Loading";

export default function EditSubcategory() {
  const { subctId } = useParams();
  return (
    <div>
     
        <SubcategoryForm
          requestPath={"/subcategories/" + subctId?.toString()}
          formType="edit"
          id={subctId?.toString()}
        />
    </div>
  );
}
