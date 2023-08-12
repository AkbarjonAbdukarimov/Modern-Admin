
import { useParams } from 'react-router-dom'
import PropValueForm from './PropValueForm'

const NewPropValue: React.FC = () => {
    const { propId } = useParams()
    if (!propId) return <></>
    return (
        <div>
            <PropValueForm propId={propId} requestPath={`/props/values/new/${propId}`} formType='new' />
        </div>
    )
}



export default NewPropValue
