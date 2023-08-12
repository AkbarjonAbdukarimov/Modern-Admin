import { Container, CssBaseline, Box, Typography, TextField, Button } from "@mui/material"
import axios, { AxiosError } from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import IError from "../../../../interfaces/IError"
import Errors from "../../../Errors"
import Value, { value } from "./Value"
interface IValueForm {
    requestPath: string;
    formType: 'new' | 'edit'
    propId: string,
    valueId?: string
}
const PropValueForm: React.FC<IValueForm> = ({ requestPath, formType, propId, valueId }) => {
    const [prop, setProp] = useState()
    const [values, setValues] = useState<value[]>([{ id: (Math.random() * 1234567890).toString(), value: '' }])
    const [errs, setError] = useState<IError[] | undefined>()
    const navigate = useNavigate()
    useEffect(() => {

        axios.get('/props/' + propId).then(res => { setProp(res.data) })
            .catch(error => setError(prev => {
                if (!prev) {
                    return [error]
                }
                return [...prev, error]
            }))

    }, [])
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.target)

        const values: string[] = []

        data.forEach((value, key) => {
            if (key === 'value') {
                values.push(value.toString())
            }
        });

        try {
            const opts = { url: requestPath, method: formType === "edit" ? "put" : "post", data: { values } }

            await axios(opts)
            navigate('/props/' + propId)
        } catch (error) {
            if (error instanceof AxiosError) {

                const { errors } = await error.response.data

                setError([...errors])
                return
            }
            setError([error])
        }

    }
    if (!prop) return <></>
    return (
        <div>
            <form noValidate onSubmit={handleSubmit}>
                <Container component="main" >
                    <CssBaseline />

                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            {formType === 'new' ? `New Values for ${prop.prop.name} Property  ` : "Edit Property"}
                        </Typography>

                        <Box sx={{ mt: 1 }}>
                            {values.map(v => <Value key={v.id} setValues={setValues} value={v} />)}







                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>

                        </Box>
                    </Box>

                    <Errors errs={errs} />
                </Container>

            </form>
        </div>
    )
}



export default PropValueForm
