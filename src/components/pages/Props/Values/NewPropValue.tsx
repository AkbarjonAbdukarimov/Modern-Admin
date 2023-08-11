
import PropValueForm from './PropValueForm'

function NewPropValue(props) {
    return (
        <div>
            <PropValueForm requestPath='/props/values/new' />
        </div>
    )
}

NewPropValue.propTypes = {}

export default NewPropValue
