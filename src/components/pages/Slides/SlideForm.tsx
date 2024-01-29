import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { FC, useState } from "react";
import Errors from "../../Errors";
import IError from "../../../interfaces/IError";
import InputFileUpload from "../../UploadButton/InputFileUpload";
import EmptyTextarea from "../../TextArea/TextArea";
import RadioButton from "./RadioButton";
import { green } from "@mui/material/colors";
import IProduct from "../../../interfaces/Product/IProduct";
import IVendor from "../../../interfaces/Vendor/IVendor";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import CustomSelectInput from "../../CustomSelectInput";
import Loading from "../../Loading";
interface Props {
  requestPath: string;
  formType: "new" | "edit";
  id?: string;
}
type data = [data: { products: IProduct[] }, vendors: IVendor[]];

const getdata = () =>
  Promise.all([
    axios
      .get<{ products: IProduct[] }>("/products/admin")
      .then((res) => res.data),
    axios.get<IVendor[]>("/vendors").then((res) => res.data),
  ]);
const SlideForm: FC<Props> = ({ formType }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const { data, isError, error, isLoading } = useQuery(
    ["products-vandors"],
    getdata
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [err, setError] = useState<IError[] | undefined>();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [slideType, setSlideType] = useState<"none" | "product" | "vendor">(
    "none"
  );
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
    width: "100%",
  };
  if (isError) {
    if (error instanceof AxiosError) {
      return <Errors errs={error.response?.data.errors} />;
    }
    return <Errors errs={[{ message: error.message }]} />;
  }
  if (isLoading) {
    return <Loading isLoading />;
  }
  return (
    <div className="row justify-content-center w-100">
      <div className=" col-sm-10 col-lg-6">
        <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
          <Container component="main">
            <CssBaseline />

            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                {formType === "new" ? "New Slide" : "Edit Slide"}
              </Typography>

              <Box sx={{ mt: 1, width: "80%" }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Subcategory Name"
                  name="name"
                />
                <InputFileUpload name="image" />
                <div className="mt-3">
                  <EmptyTextarea setValue={setDesc} value={desc} />
                </div>
                <div className="m-3">
                  <RadioButton
                    slideType={slideType}
                    setSlideType={setSlideType}
                  />
                </div>
                {slideType === "product" && (
                  <div className="m-3">
                    <CustomSelectInput
                      label="Products"
                      data={data![0].products || []}
                      setSelected={() => {}}
                    />
                  </div>
                )}
                {slideType === "vendor" && (
                  <div className="m-3">
                    <CustomSelectInput
                      label="Vendors"
                      data={data![1] || []}
                      setSelected={() => {}}
                    />
                  </div>
                )}

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
      </div>
    </div>
  );
};
export default SlideForm;
