import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import IProduct from "../../../interfaces/Product/IProduct";
import { useQuery } from "react-query";
import Loading from "../../Loading";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { List, ListItem } from "@mui/material";
const getProduct = ({ queryKey }): Promise<IProduct> =>
  axios
    .get<IProduct>(`/products/${queryKey[1]}`)
    .then((res) => res.data)
    .catch((e) => e.response.data);
export default function Product() {
  const { id } = useParams();
  const product = useQuery<IProduct>(["product", id], getProduct);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (product.isLoading) {
    return <Loading isLoading={product.isLoading} />;
  }
  return (
    <>
      {product.data && (
        <div className="d-flex justify-content-center mt-5">
          <Card sx={{ width: 345 }}>
            <CardHeader
              //   action={
              //     <IconButton aria-label="settings">
              //       <MoreVertIcon />
              //     </IconButton>
              //   }
              title={product.data.name}
            />
            {product.data.media.length > 0 && (
              <CardMedia
                component="img"
                height="194"
                image={
                  "https://ik.imagekit.io/z6k3ktb71/" +
                  product.data.media[0].name
                }
                alt={product.data.name}
              />
            )}
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {product.data.description}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {product.data.category && product.data.category.name} Category
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {product.data.subcategory.name} Subcategory
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <div className="mx-1 d-flex justify-content-evenly align-items-center">
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                {product.data.likes.length}
              </div>
              <div className="mx-1 d-flex justify-content-evenly align-items-center">
                <IconButton aria-label="share">
                  <RemoveRedEyeIcon />
                </IconButton>
                {product.data.viewCount}
              </div>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <div className="my-2">
                  <Typography paragraph>Media</Typography>
                  {product.data.media.length > 0 &&
                    product.data.media.map((m) => (
                      <CardMedia
                        className="my-1"
                        key={m.name + m.fileId}
                        component="img"
                        height="194"
                        image={"https://ik.imagekit.io/z6k3ktb71/" + m.name}
                        alt={product.data.name}
                      />
                    ))}
                </div>
                {product.data.video && <div className="my-3">
                  <Typography paragraph>Video</Typography>
                 
                    <>
                      <iframe
                        
                        height="194"
                        src={
                          "https://ik.imagekit.io/z6k3ktb71/" +
                          product.data.video.name
                        }
                      ></iframe>
                    </>
                  
                </div>}
                <Typography paragraph>Properties:</Typography>
                {Object.keys(product.data.props).map((i) => {
                  return (
                    <div key={product.data.props[i].id}>
                      <Typography>{i.split("_").join(" ")}</Typography>
                      <List aria-labelledby="basic-list-demo">
                        {product.data.props[i].props.map((p) => (
                          <div key={p.id}>
                            <ListItem key={p.id}>{p.value}</ListItem>
                          </div>
                        ))}
                      </List>
                    </div>
                  );
                })}
                <Typography paragraph>Price:</Typography>

                <List aria-labelledby="basic-list-demo">
                  {product.data.price.map((p) => (
                    
                      <ListItem key={p.price+p.qtyMax+p.qtyMin}>
                        Amount: {p.qtyMin}-{p.qtyMax} Price {p.price}
                      </ListItem>
                    
                  ))}
                </List>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      )}
    </>
  );
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
