import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Button,
  FormControl,
  Input,
} from "@mui/material";
import Errors from "../../../Errors";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import IError from "../../../../interfaces/IError";

const EditPropValue: React.FC = () => {
  const { valueId, propId } = useParams();
  const [value, setValue] = useState("");
  const [errs, setError] = useState<IError[] | undefined>();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/props/values/${valueId}`)
      .then((res) => {
        setValue(res.data.value);
      })
      .catch((error) =>
        setError((prev) => {
          if (!prev) {
            return [error];
          }
          return [...prev, error];
        })
      );
  }, []);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const opts = {
        url: "/props/values/update/" + valueId,
        method: "put",
        data: { value },
      };

      await axios(opts);
      navigate("/props/" + String(propId));
    } catch (error:any) {
      if (error instanceof AxiosError) {
        const { errors } = await error.response!.data;

        setError([...errors]);
        return;
      }
      setError([{message:error.message}]);
    }
  }

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
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
              Edit Property Value
            </Typography>

            <Box sx={{ mt: 1 }}>
              <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
                {/* <InputLabel htmlFor="standard-adornment-min">Value</InputLabel> */}
                <Input
                  id="standard-adornment-min"
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                />
              </FormControl>

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
    </div>
  );
};

export default EditPropValue;
