import { Container, CssBaseline, Box, Typography, TextField, Button } from '@mui/material';
import React, { ReactHTML, useEffect, useState } from 'react'
import Errors from '../../Errors';
import axios, { AxiosError } from 'axios';
import IError from '../../../interfaces/IError';
import { useNavigate } from 'react-router-dom';
interface IPropForm {
    requestPath: string;
    formType: 'new' | 'edit'
    propId?: string
}
const PropForm: React.FC<IPropForm> = ({ requestPath, formType, propId }) => {
    const [name, setName] = useState('')
    const [label, setLabel] = useState('')
    const [errs, setError] = useState<IError[] | undefined>()
    const navigate = useNavigate()
    useEffect(() => {
        if (propId) {
            axios.get('/props/' + propId).then(res => { setName(res.data.prop.name); setLabel(res.data.prop.label) })
                .catch(e => setError(prev => {
                    if (!prev) {
                        return [error]
                    }
                    return [...prev, error]
                }))
        }
    }, [])
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const opts = { url: requestPath, method: formType === "edit" ? "put" : "post", data: { name, label } }
            console.log(opts)
            await axios(opts)
            navigate('/props')
        } catch (error) {
            if (error instanceof AxiosError) {

                const { errors } = await error.response.data

                setError([...errors])
                return
            }
            setError([error])
        }

    }
    return <> <form noValidate onSubmit={handleSubmit}>
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
                    {formType === 'new' ? "New Property" : "Edit Property"}
                </Typography>

                <Box sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        label="Property Name"
                        name="name"

                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="label"
                        value={label}
                        onChange={(e) => {
                            setLabel(e.target.value)
                        }}
                        label="Label Type"
                        name="label"

                    />






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
    </>
}
export default PropForm