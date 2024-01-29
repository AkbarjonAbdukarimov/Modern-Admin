import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import ISlide from "../../interfaces/ISlide";
import Carousel from "../Carousel/Carousel";
import Loading from "../Loading";
import Errors from "../Errors";
import { SpeedDial, SpeedDialIcon } from "@mui/material";
import { Link } from "react-router-dom";
const getSlides = () => axios.get<ISlide[]>("/slides/").then((res) => res.data);

export default function InedxPage() {
  const { data, isError, isLoading, error, refetch } = useQuery(
    "slides",
    getSlides
  );
  // const [err, setError] = useState<IError[] | undefined>();
  if (isLoading && !isError) {
    return <Loading isLoading />;
  }
  if (isError) {
    if (error instanceof AxiosError) {
      return <Errors errs={error.response!.data.errors} />;
    }
    return <Errors errs={[{ message: error.message }]} />;
  }
  return (
    <div>
      <Carousel slides={data || []} refetch={refetch} />

      <Link to="/slides/new">
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        ></SpeedDial>
      </Link>
    </div>
  );
}
