import { Container, CssBaseline, Box, Typography, TextField, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, FormControlLabel, Checkbox } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Errors from '../../Errors'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import IVendor from '../../../interfaces/Vendor/IVendor'
import { useQuery } from 'react-query'
import SelectInput from '../../SelectInput'
import { VisibilityOff, Visibility } from '@mui/icons-material'

const getVendors = () => axios.get<IVendor[]>('/vendors').then(res => res.data)
export default function AdminForm({ formType, requestPath, id }) {
    const [showPassword, setShowPassword] = React.useState(false);
    const vendors = useQuery<IVendor[]>(['admin-vendors'], getVendors)
    const [err, setError] = useState<[{ message: string }] | undefined>()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


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

            // await axios({ url: requestPath, data: post, method: formType === 'edit' ? 'put' : "post" })
            //navigate('/vendors')
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
                        {formType === 'new' ? "New Admin" : "Edit Admin"}
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            value={name}
                            label="Admin Email"
                            type='email'
                            onChange={e => setName(e.target.value)}
                        />

                        <FormControl sx={{ my: 1, width: '50ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                required

                                label="Password"
                            />
                        </FormControl>

                        <SelectInput label={'Vendors'} data={vendors.data} />

                        <FormControlLabel control={<Checkbox name='super' />} label="Super Admin" />

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

        </form >

    </>
}
