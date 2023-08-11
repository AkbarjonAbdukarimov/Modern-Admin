
import PropValueForm from './PropValueForm'

const NewPropValue: React.FC = () => {
    return (
        <div>
            <PropValueForm requestPath='/props/values/new' formType='new' />
        </div>
    )
}



export default NewPropValue
