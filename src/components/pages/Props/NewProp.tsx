import PropForm from './PropForm'

export default function NewProp() {
    return <>
        <PropForm requestPath='/props/new' formType='new' propId='' />
    </>
}
