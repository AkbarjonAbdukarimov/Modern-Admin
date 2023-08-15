import { Container, CssBaseline, Box, Typography, TextField, Button, FormControl } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "../../../Errors";
import ISubcategory from "../../../../interfaces/ISubcategory";
import Prop from "./Prop";
interface ISubcategoryForm {
    requestPath: string;
    formType: "new" | 'edit'
    id?: string
}
const SubcategoryForm: React.FC<ISubcategoryForm> = ({ requestPath, formType, id }) => {
    const [err, setError] = useState<[{ message: string }] | undefined>()
    const [subct, setSubct] = useState<ISubcategory>()
    const [name, setName] = useState('')
    //const [removedProps, setRemovedProps] = useState<string[]>([])
    const [props, setProps] = useState<ISubcategory["props"]>([])
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {

            axios.get<ISubcategory>('/subcategories/' + id).then(res => {
                setSubct(res.data)
                setName(res.data.name)
                setProps(res.data.props)
            }).catch(e => setError([...err, e]))
        }
    }, [])
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        try {
            const data = new FormData(e.target);

            await axios({ url: requestPath, data, method: formType === 'edit' ? 'put' : "post" })
            navigate('/categories')
        } catch (error) {
            if (error instanceof AxiosError) {

                const { errors } = error.response.data

                setError([...errors])
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
                        {formType === 'new' ? "New Subcategory" : "Edit Subcategory"}
                    </Typography>

                    <Box sx={{ mt: 1, width: '50ch' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            label="Subcategory Name"
                            name="name"

                        />
                        {props && <div className='d-flex justify-content-evenly bg-secondary'>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <Typography component="h1" variant="h5">
                                    Value
                                </Typography>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <Typography component="h1" variant="h5">
                                    Name
                                </Typography>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <Typography component="h1" variant="h5">
                                    Label
                                </Typography>
                            </FormControl>
                        </div>}
                        {props.map(p => <Prop setProps={setProps} key={p.id} prop={p} />)}


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
export default SubcategoryForm