import axios from "axios";
import ICategory from "../../../../interfaces/ICategory";
import { v4 as uuid } from "uuid";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  CardMedia,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from '@mui/icons-material/Remove';
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ISubcategory from "../../../../interfaces/ISubcategory";
import IProp from "../../../../interfaces/Props/IProp";
import IPropValue from "../../../../interfaces/Props/IPropValue";
import Errors from "../../../Errors";
import Prop from "../../Subcategory/Form/Prop";
import Price from "./Price";
import IProduct from "../../../../interfaces/Product/IProduct";
import IPrice from "../../../../interfaces/Product/IPrice";
import Loading from "../../../Loading";
import CustomSelectInput from "../../../CustomSelectInput";
import "./EditProduct.css";
import IProductMedia from "../../../../interfaces/Product/IProducMedia";
import IError from "../../../../interfaces/IError";
export type price = {
  id: number;
  qtyMin: number;
  qtyMax: number;
  price: number;
  oldPrice?: number;
};
const getCategories = () =>
  axios.get<ICategory[]>("/categories").then((res) => res.data);

export default function EditProduct() {
  const { id } = useParams();
  const [prStrings, setPrStrings] = useState({ name: "", description: "" });
  const [prices, setPrices] = useState<IPrice[]>([
    {
      id: uuid(),
      qtyMax: 0,
      qtyMin: 0,
      price: 0,
    },
  ]);

  const [selectedCat, setSelectedCat] = useState<ICategory | undefined>();
  const [selectedSubct, setSelectedSubct] = useState<
    ISubcategory | undefined
  >();
  const [oldSelectedCat, setOldCat] = useState<ICategory | undefined>();
  const [oldSubct, setOldSubct] = useState<ISubcategory | undefined>();
  const [oldProps, setOldProps] = useState<IPropValue[]>([]);
  const [props, setProps] = useState<ISubcategory>();
  const [selectedProps, selectProps] = useState<IPropValue[]>([]);
  const [err, setError] = useState<IError[] | undefined>();
  const [product, setProduct] = useState<IProduct | undefined>();
  const [delFiles, setDelFiles] = useState<IProductMedia[] | undefined>();
  const categories = useQuery(["categories-product"], getCategories);
  const navigate = useNavigate();

  function handleSubmit(e: HTMLFormElement) {
    e.preventDefault();
//@ts-ignore
    const data = new FormData(e.target);
    selectedCat && data.append("category", selectedCat.id);
    selectedSubct && data.append("subcategory", selectedSubct.id);
    selectedProps.map((p) => {
      data.append("props[]", p.id);
    });
    oldProps.map((p) => {
      data.append("props[]", p.id);
    });
    data.delete("price");
    prices.map((p) => {
      data.append(
        "prices[]",
        JSON.stringify({
          qtyMin: p.qtyMin,
          qtyMax: p.qtyMax,
          price: p.price,
          oldPrice: p.oldPrice,
        })
      );
    });
    axios
      .put("/products/edit/" + id, data)
      .then((res) => {
        navigate("/products/" + res.data.id);
      })
      .catch((e) => {

        setError([...e.response.data.errors]);
      });
  }
  useEffect(() => {
    axios
      .get<IProduct>(`/products/${id}`, { params: { admin: true } })
      .then((res) => {
        const { data } = res;
        // if (data && !admin.super ||data.author.id != admin.id) {
        //   navigate("/products");
        //   return;
        // }
        setPrStrings({
          name: data.name,
          description: data.description,
        });
        setPrices(
          data.price.map((p) => {
            return { ...p, id: uuid() };
          })
        );
        setOldCat(data.category);
        setOldSubct(data.subcategory);
        //@ts-ignore
        //need to update
        setOldProps(data.props);
        setProduct(data);
      })
      .catch((e) => setError([...e.response.date.errors]));
  }, []);
  useEffect(() => {
    if (selectedSubct) {
      axios
        .get(`/subcategories/${selectedSubct.id}`, { params: { admin: true } })
        .then((res) => {
          setProps(res.data);
        });
    }
  }, [selectedSubct]);
  const handlePropSelection = (prop: IProp | null) => {
    //@ts-ignore
    prop && selectProps((prev) => [...prev, prop]);
  };
  if (!product) {
    return <Loading isLoading={true} />;
  }

  return (
    <>
   
      <form
       //@ts-ignore
       onSubmit={handleSubmit} noValidate encType="multipart/form-data">
        <Container component="main">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Edit Product
            </Typography>

            <Box sx={{ mt: 1, width: "80%" }}>
              <TextField
                margin="normal"
                required
                autoComplete="off"
                fullWidth
                id="name"
                label="Product Name"
                name="name"
                value={prStrings.name}
                onChange={(e) => {
                  setPrStrings({
                    ...prStrings,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <TextField
                autoComplete="off"
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                type="description"
                id="description"
                value={prStrings.description}
                onChange={(e) => {
                  setPrStrings({
                    ...prStrings,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <div className="mb-3">
                <label htmlFor="formFileSm" className="form-label">
                  Select Product Files
                </label>
                <input
                  name="media"
                  className="form-control  form-control-sm"
                  id="formFileSm"
                  type="file"
                  multiple
                />
              </div>
              <div className="mb-3 d-flex justify-content-center w-100">
                {product.video && (
                  <>
                    <video
                      width="100%"
                      height="300px"
                      className="my-2"
                      controls
                    >
                      <source
                        src={
                          "https://ik.imagekit.io/z6k3ktb71/" +
                          product.video.name
                        }
                        type="video/mp4"
                      />
                    </video>
                    <IconButton sx={{ m: 1.2 }}>
                      <RemoveIcon />
                    </IconButton>
                  </>
                )}
              </div>
              <div className="mb-3">
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-evenly">
                  {product.media.length > 0 &&
                    product.media.map((m) => (
                      <div key={m.fileId} className="d-flex flex-column align-items-center">
                        <CardMedia
                         
                          component="img"
                          style={{ maxWidth: "200px" }}
                          height="194"
                          image={"https://ik.imagekit.io/z6k3ktb71/" + m.name}
                          alt={product.name}
                        />
                        <div>
                          <IconButton
                            onClick={() => {
                              if (delFiles) {
                                setDelFiles([...delFiles, m]);
                              return
                              }
                              setDelFiles([m])


                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="formFileSm" className="form-label">
                  Current Category : {oldSelectedCat?.name}
                </label>
                <br />
                {selectedCat && (
                  <label htmlFor="formFileSm" className="form-label">
                    New Category : {selectedCat.name}
                  </label>
                )}
              </div>
              <div className="mb-3">
                {categories.data && (
                  <CustomSelectInput
                    data={categories.data}
                    setSelected={setSelectedCat}
                    label="Categories"
                  />
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="formFileSm" className="form-label">
                  Current Subcategory : {oldSubct?.name}
                </label>
                <br />
                {selectedSubct && (
                  <label htmlFor="formFileSm" className="form-label">
                    New Category : {selectedSubct.name}
                  </label>
                )}
              </div>
              <div className="mb-3">
                {selectedCat && (
                  <CustomSelectInput
                    setSelected={setSelectedSubct}
                    data={selectedCat.subcategories}
                    label="Subcategories"
                  />
                )}
              </div>
              <div className="mb-3">
                {selectedSubct && props && (
                  <CustomSelectInput
                    setSelected={handlePropSelection}
                    data={props.props}
                    label="Properties"
                  />
                )}
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-evenly w-100 flex-grow">
                {oldProps && (
                  <div className="w-md-50 w-100 m-1">
                    <h4>Existing Props</h4>

                    <div className="d-flex justify-content-evenly bg-secondary">
                      <FormControl sx={{ m: 1 }} variant="standard">
                        <Typography component="h1" variant="h5">
                          Value
                        </Typography>
                      </FormControl>
                      <FormControl sx={{ m: 1 }} variant="standard">
                        <Typography component="h1" variant="h5">
                          Name
                        </Typography>
                      </FormControl>
                    </div>
                    <div>
                      {oldProps.map((p) => (
                        <Prop
                          displayItems={2}
                          setProps={setOldProps}
                          key={p.id}
                          prop={p}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {selectedProps && (
                  <div className="w-md-50 w-100 m-1">
                    <h4>New Props</h4>

                    <div className="d-flex justify-content-evenly bg-secondary">
                      <FormControl sx={{ m: 1 }} variant="standard">
                        <Typography component="h1" variant="h5">
                          Value
                        </Typography>
                      </FormControl>
                      <FormControl sx={{ m: 1 }} variant="standard">
                        <Typography component="h1" variant="h5">
                          Name
                        </Typography>
                      </FormControl>
                    </div>
                    <div>
                      {selectedProps.map((p) => (
                        <Prop
                          displayItems={2}
                          key={p.id}
                          prop={p}
                          setProps={selectProps}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-3">
                {prices.map((p) => (
                  <Price
                    key={p.id}
                    setPrice={setPrices}
                    price={p}
                    prices={prices}
                  />
                ))}
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
  );
}
