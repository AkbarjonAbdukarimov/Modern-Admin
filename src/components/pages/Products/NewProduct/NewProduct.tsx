import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Price from "./Price";
import SelectInput from "../../../CustomSelectInput";
import axios, { AxiosError } from "axios";
import ICategory from "../../../../interfaces/ICategory";
import { useQuery } from "react-query";
import ISubcategory from "../../../../interfaces/ISubcategory";
import Prop from "../../Subcategory/Form/Prop";
import IPropValue from "../../../../interfaces/Props/IPropValue";
import { useNavigate } from "react-router-dom";
import Errors from "../../../Errors";
import IProp from "../../../../interfaces/Props/IProp";
import IError from "../../../../interfaces/IError";
import { green } from "@mui/material/colors";
import IPrice from "../../../../interfaces/Product/IPrice";
import InputFileUpload from "../../../UploadButton/InputFileUpload";

interface NewProductProps {}
export type price = {
  id: number;
  qtyMin: number | string;
  qtyMax: number | string;
  price: number | string;
  oldPrice?: number | string;
  //component: FunctionComponent
};
const getCategories = () =>
  axios.get<ICategory[]>("/categories").then((res) => res.data);
const NewProduct: FunctionComponent<NewProductProps> = () => {
  const [prices, setPrices] = useState<IPrice[]>([
    {
      id: parseInt((Math.random() * 1234567890).toString()),
      qtyMax: 0,
      qtyMin: 0,
      price: 0,
    },
  ]);
  const [selectedCat, setSelectedCat] = useState<ICategory | undefined>();
  const [selectedSubct, setSelectedSubct] = useState<
    ISubcategory | undefined
  >();
  const [props, setProps] = useState<ISubcategory>();
  const [selectedProps, selectProps] = useState<IPropValue[]>([]);
  const [err, setError] = useState<IError[] | undefined>();

  const categories = useQuery(["categories-product"], getCategories);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
    width: "100%",
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleButtonClick();
    //@ts-ignore
    const data = new FormData(e.target);
    selectedCat && data.append("category", selectedCat.id);
    selectedSubct && data.append("subcategory", selectedSubct.id);
    selectedProps.map((p) => {
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
    // console.log([...data.entries()])
    axios
      .post("/products/new", data)
      .then((_res) => {
        timer.current = window.setTimeout(() => {
          setSuccess(true);
          setLoading(false);
        }, 1000);
        navigate("/products");
      })
      .catch((e) => {
        setLoading(false);
        setSuccess(false);
        if (e instanceof AxiosError) {
          let err: IError[] = e.response!.data.errors;
          setError([...err]);
          return;
        }
        setError([{ message: e.message }]);
      });
  }
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
    //need to fix
    prop && selectProps((prev) => [...prev, prop]);
  };
  return (
    <>
      <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
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
              New Product
            </Typography>

            <Box sx={{ mt: 1, width: "50ch" }}>
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
                name="description"
                label="Description"
                type="description"
                id="description"
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

              <div className="mb-3">
                {categories && (
                  <SelectInput
                    //@ts-ignore
                    data={categories.data}
                    setSelected={setSelectedCat}
                    requestPath="/categories"
                    label="Categories"
                  />
                )}
              </div>
              {/* <InputFileUpload />
              <br />
              <InputFileUpload /> */}
              <div className="mb-3">
                {selectedCat && (
                  <SelectInput
                    setSelected={setSelectedSubct}
                    data={selectedCat.subcategories}
                    label="Subcategories"
                  />
                )}
              </div>
              <div className="mb-3">
                {selectedSubct && props && (
                  <SelectInput
                    setSelected={handlePropSelection}
                    data={props.props}
                    label="Properties"
                  />
                )}
              </div>
              <div className="mb-3">
                {selectedProps.map((p) => (
                  <Prop
                    displayItems={2}
                    key={p.id}
                    prop={p}
                    setProps={selectProps}
                  />
                ))}
              </div>
              <div className="mb-3">
                {prices.map((p) => (
                  //@ts-ignore

                  <Price
                    key={p.id}
                    prices={prices}
                    setPrice={setPrices}
                    price={p}
                  />
                ))}
              </div>
              <Button
                variant="contained"
                sx={buttonSx}
                disabled={loading}
                type="submit"
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Button>
            </Box>
          </Box>

          <Errors errs={err} />
        </Container>
      </form>
    </>
  );
};

export default NewProduct;
