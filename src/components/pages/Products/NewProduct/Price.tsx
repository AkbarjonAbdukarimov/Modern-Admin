import { FormControl, IconButton, Input, InputLabel } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Dispatch, FunctionComponent } from "react";
import { price } from "./NewProduct";

interface IPriceProps {
  setPrice: Dispatch<React.SetStateAction<price[]>>;
  price: price;
}
export default function Price({ setPrice, price }: IPriceProps) {
  function addPrice() {
    setPrice((prev) => [
      ...prev,
      {
        id: parseInt((Math.random() * 1234567890).toString()),
        qtyMin: 0,
        qtyMax: 0,
        price: 0,
      },
    ]);
  }
  function updatePrice(e) {
    setPrice((prev) =>
      prev.map((p) => {
        if (p.id === price.id) {
          p[e.target.name] = e.target.value;
        }
        return p;
      })
    );
  }
  function removePrice() {
    setPrice((prev) => {
      if (prev.length > 1) {
        return prev.filter((f) => f.id !== price.id);
      }
      return prev;
    });
  }
  return (
    <div className="d-flex">
      <FormControl sx={{ m: 1, width: "20ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-min">Minimum Amount</InputLabel>
        <Input
          onChange={updatePrice}
          value={price.qtyMin}
          id="standard-adornment-min"
          name="qtyMin"
        />
      </FormControl>{" "}
      <FormControl sx={{ m: 1, width: "20ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-max">Maximum Amount</InputLabel>
        <Input
          onChange={updatePrice}
          value={price.qtyMax}
          id="standard-adornment-max"
          name="qtyMax"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "20ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-price">Price</InputLabel>
        <Input
          onChange={updatePrice}
          value={price.price}
          id="standard-adornment-price"
          name="price"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "20ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-price">Old Price</InputLabel>
        <Input
          onChange={updatePrice}
          value={price.oldPrice}
          id="standard-adornment-price"
          name="oldPrice"
        />
      </FormControl>
      <IconButton onClick={addPrice}>
        <AddIcon />
      </IconButton>
      <IconButton onClick={removePrice}>
        <RemoveIcon />
      </IconButton>
    </div>
  );
}
