import { Container, CssBaseline, Box, Typography, TextField, Button, Alert, Snackbar } from '@mui/material'
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Errors from '../../Errors';

export default function NewCategory() {
    const [open, setOpen] = useState(false);
    const [err, setError] = useState<[{ message: string }] | undefined>()
    const navigate = useNavigate()
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        try {
            const data = new FormData(e.target);

            await axios.post('/categories/new', data)
            navigate('/categories')
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
                        New Category
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"

                            label="Category Name"
                            name="name"

                        />

                        <div className="mb-3">
                            <label htmlFor="formFileSm" className="form-label">Select Product Files</label>
                            <input name="icon" className="form-control form-control-sm" id="formFileSm" type="file" multiple />
                        </div>




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
