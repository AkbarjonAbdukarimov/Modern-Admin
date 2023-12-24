import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  CardMedia,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "../../Errors";
import IError from "../../../interfaces/IError";
import IProductMedia from "../../../interfaces/Product/IProducMedia";
import IVendor from "../../../interfaces/Vendor/IVendor";

interface IVendorFormProps {
  formType: "new" | "edit";
  requestPath: string;
  id?: string;
}
const VendorForm: React.FunctionComponent<IVendorFormProps> = ({
  formType,
  requestPath,
  id,
}) => {
  const [err, setError] = useState<IError[] | undefined>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState<IProductMedia>();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios
        .get<IVendor>("/vendors/" + id)
        .then((res) => {
          setName(res.data.name);
          setDescription(res.data.description);
          setPhone(res.data.contacts.phoneNumber.toString());
          setImg(res.data.baner);
        })
        .catch((e) => {
          if (e instanceof AxiosError) {
            setError([...e.response!.data.errors]);
            return
          }
          setError([{message:error.message}])

        });
    }
  }, []);
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    try {
      //@ts-ignore
      const data = new FormData(e.target);
      data.append("oldBaner", JSON.stringify(img));
      //@ts-ignore
      if (data.get("baner").size > 0 && img) {
        data.append("oldBaner", JSON.stringify(img));
      }
      await axios({
        url: requestPath,
        data,
        method: formType === "edit" ? "put" : "post",
      });
      navigate("/vendors");
    } catch (error) {
      if (error instanceof AxiosError) {
        const { errors } = error.response!.data;

        setError([...errors]);
        // setOpen(true)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
        <Container component="main" sx={{ width: "50ch" }}>
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
              {formType === "new" ? "New Vendor" : "Edit Vendor"}
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
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                name="desc"
                value={description}
                label="Vendor Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                name="phoneNumber"
                value={phone}
                label="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
              {img && (
                <>
                  <Typography className="my-2" component="h1" variant="h5">
                    Current Vendor Banner
                  </Typography>
                  <CardMedia
                    className="my-2"
                    component="img"
                    height="194"
                    image={"https://ik.imagekit.io/z6k3ktb71/" + img.name}
                    alt={img.name}
                  />
                </>
              )}
              <div className="mb-3">
                <label htmlFor="formFileSm" className="form-label">
                  Select Vendor Banner
                </label>
                <input
                  name="baner"
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                />
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
};

export default VendorForm;
