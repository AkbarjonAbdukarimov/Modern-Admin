import { useParams } from "react-router-dom"
import PropForm from "./PropForm"

const EditProp: React.FC = () => {
    const { propId } = useParams()
    if (!propId) {
        return <></>
    }
    return <>
        <PropForm requestPath={'/props/edit/' + propId} formType='edit' propId={propId} />
    </>
}
export default EditProp