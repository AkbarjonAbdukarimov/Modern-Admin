import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { FunctionComponent, SyntheticEvent, useState } from "react";
import Price from "./Price";

interface NewProductProps {

}
export type price = {
    id: number;
    minQty: number;
    maxQty: number;
    price: number;
    //component: FunctionComponent
}

const NewProduct: FunctionComponent<NewProductProps> = () => {
    const [prices, setPrices] = useState<price[]>([{ id: parseInt((Math.random() * 1234567890).toString()), minQty: 0, maxQty: 0, price: 0 },])
    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        for (let index = 0; index < e.target.length; index++) {
            const element = e.target[index];
            console.log(element.name, element.value)
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
                        New Product
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"

                            label="Product Name"
                            name="name"

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="descriptiom"
                            label="Descriptiom"
                            type="descriptiom"
                            id="descriptiom"
                        />
                        <div className="mb-3">
                            <label htmlFor="formFileSm" className="form-label">Select Product Files</label>
                            <input name="media" className="form-control form-control-sm" id="formFileSm" type="file" multiple />
                        </div>
                        {prices.map(p => <> <Price key={p.id} setPrice={setPrices} price={p} />
                        </>)}



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


            </Container>

        </form>

    </>;
}

export default NewProduct;