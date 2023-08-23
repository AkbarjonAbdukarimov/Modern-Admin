import { Container, CssBaseline, Box, Typography, TextField, Button } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "../../Errors";
import SelectInput from "../../CustomSelectInput";

interface IVendorFormProps {
    formType: "new" | "edit"
    requestPath: string,
    id?: string
}
const VendorForm: React.FunctionComponent<IVendorFormProps> = ({ formType, requestPath, id }) => {

    const [err, setError] = useState<[{ message: string }] | undefined>()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            axios.get('/vendors/' + id).then(res => {

                setName(res.data.name)
                setDescription(res.data.description)
                setPhone(res.data.contacts.phoneNumber)
            }).catch(e => setError([...err, e]))
        }
    }, [])
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        try {
            const data = new FormData(e.target);

            const obj = Object.fromEntries(data.entries())

            const post = {
                name: obj.name,
                description: obj.desc,
                contacts: {
                    phoneNumber: obj.phoneNumber
                }
            }

            await axios({ url: requestPath, data: post, method: formType === 'edit' ? 'put' : "post" })
            navigate('/vendors')
        } catch (error) {
            if (error instanceof AxiosError) {

                const { errors } = error.response.data

                setError([...errors])
                setOpen(true)
            }
        }


    }

    return <>
        <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
            <Container component="main" sx={{ width: '50ch' }} >
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
                        {formType === 'new' ? "New Vendor" : "Edit Vendor"}
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            name="name"
                            value={name}
                            label="Vendor Name"
                            onChange={e => setName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            name="desc"
                            value={description}
                            label="Vendor Description"
                            onChange={e => setDescription(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            name="phoneNumber"
                            value={phone}
                            label="Phone Number"
                            onChange={e => setPhone(e.target.value)}
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

                <Errors errs={err} />
            </Container>

        </form>

    </>
}

export default VendorForm