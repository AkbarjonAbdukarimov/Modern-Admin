import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "../../../Errors";
import ISubcategory from "../../../../interfaces/ISubcategory";
import Prop from "./Prop";
import SelectInput from "../../../CustomSelectInput";
import IProp from "../../../../interfaces/Props/IProp";
import IPropValue from "../../../../interfaces/Props/IPropValue";
import { useQuery } from "react-query";
import Loading from "../../../Loading";
import IError from "../../../../interfaces/IError";
interface ISubcategoryForm {
  requestPath: string;
  formType: "new" | "edit";
  id?: string;
  categoryId?: string;
}
const getAllPropsValues = () =>
  axios.get<IPropValue[]>("/props/values").then((res) => res.data);

const SubcategoryForm: React.FC<ISubcategoryForm> = ({
  requestPath,
  formType,
  id,
  categoryId,
}) => {
  const props = useQuery(["props-subcategory"], getAllPropsValues);
  const allProps = useQuery({
    queryKey: ["all-props"],
    queryFn: getAllPropsValues,
  });

  const [err, setError] = useState<IError[] | undefined>();

  const [name, setName] = useState("");
  // const [removedProps, setRemovedProps] = useState([]);
  const [subctProps, setSubctProps] = useState<ISubcategory["props"]>();
  const [newProps, setNewProps] = useState<IPropValue[]>([]);
  const navigate = useNavigate();

  const handlePropSelection = (prop: IProp | null) => {
    //@ts-ignore
    prop && setNewProps((prev) => [...prev, prop]);
  };

  useEffect(() => {
    if (id) {
      axios
        .get<ISubcategory>("/subcategories/" + id, { params: { admin: true } })
        .then((res) => {
          setName(res.data.name);
          setSubctProps(res.data.props);
        })
        .catch((e) => setError([...e.response.data.errors]));
    }
  }, []);
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    try {
      const data = {
        name,
        newProps,
        subctProps,
        category: categoryId,
      };

      await axios({
        url: requestPath,
        data,
        method: formType === "edit" ? "put" : "post",
      });
      navigate("/categories/");
    } catch (error: any) {
      if (error instanceof AxiosError) {
        const { errors } = error.response!.data;

        setError([...errors]);
        return;
      }
      setError([{ message: error.message }]);
    }
  }
  if (allProps.isLoading) {
    return <Loading isLoading={true} />;
  }
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
              width: "100%",
            }}
          >
            <Typography component="h1" variant="h5">
              {formType === "new" ? "New Subcategory" : "Edit Subcategory"}
            </Typography>

            <Box sx={{ mt: 1, width: "80%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Subcategory Name"
                name="name"
              />
              <div className="mb-3">
                {props && (
                  <SelectInput
                    setSelected={handlePropSelection}
                    data={props.data || []}
                    label="Properties"
                  />
                )}
              </div>
              <div className="d-flex justify-content-evenly w-100">
                {subctProps && (
                  <div className="w-50 mx-1">
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
                      {subctProps.map((p) => (
                        <Prop
                          displayItems={2}
                          //@ts-ignore
                          setProps={setSubctProps}
                          key={p.id}
                          prop={p}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {newProps && (
                  <div className="w-50 mx-1">
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
                      {newProps.map((p) => (
                        <Prop
                          displayItems={2}
                          setProps={setNewProps}
                          key={p.id}
                          prop={p}
                        />
                      ))}
                    </div>
                  </div>
                )}
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
export default SubcategoryForm;
