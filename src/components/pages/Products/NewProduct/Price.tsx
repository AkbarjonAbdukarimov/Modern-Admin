import { FormControl, IconButton, Input, InputLabel } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Dispatch, FunctionComponent, useState } from "react";
import { price } from "./NewProduct";
import { v4 as uuid } from "uuid";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
interface IPriceProps {
  setPrice: Dispatch<React.SetStateAction<price[]>>;
  price: price;
}
export default function Price({ setPrice, price,prs }: IPriceProps) {
  const [qtyMin, setMin] = useState(price.qtyMin);
  const [qtyMax, setMax] = useState(price.qtyMax);
  const [pr, setPr] = useState(price.price);
  const [oldPr, setOldpr] = useState(price.oldPrice);
  const [isEditing, setEditing] = useState(true);
  function handleEdit() {
    setEditing(!isEditing);
    const updPr=prs.map((p) => {
      if (p.id === price.id) {
        return {
          ...p,
          qtyMin,
          qtyMax,
          price: pr,
          oldPrice: oldPr,
        };
      }
      return p;
    })
    console.log(updPr)
   setPrice(updPr)
    
  }
  function addPrice() {
    setPrice((prev) => {
      return [
        ...prev,
        {
          id: uuid(),
          qtyMin: "",
          qtyMax: "",
          price: "",
          oldPrice: "",
        },
      ];
    });
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
      <FormControl
        disabled={!isEditing}
        sx={{ m: 1, width: "20ch" }}
        variant="standard"
      >
        <InputLabel htmlFor={price.id + "qtyMin"}>Minimum Amount</InputLabel>
        <Input
          onChange={(e) => setMin(e.target.value)}
          value={qtyMin}
          name={"qtyMin"}
          id={price.id + "qtyMin"}
        />
      </FormControl>{" "}
      <FormControl
        disabled={!isEditing}
        sx={{ m: 1, width: "20ch" }}
        variant="standard"
      >
        <InputLabel htmlFor={price.id + "qtyMax"}>Maximum Amount</InputLabel>
        <Input
          onChange={(e) => setMax(e.target.value)}
          value={qtyMax}
          name={"qtyMax"}
          id={price.id + "qtyMax"}
        />
      </FormControl>
      <FormControl
        disabled={!isEditing}
        sx={{ m: 1, width: "20ch" }}
        variant="standard"
      >
        <InputLabel htmlFor={price.id + "price"}>Price</InputLabel>
        <Input
          onChange={(e) => setPr(e.target.value)}
          value={pr}
          name={"price"}
          id={price.id + "price"}
        />
      </FormControl>
      <FormControl
        disabled={!isEditing}
        sx={{ m: 1, width: "20ch" }}
        variant="standard"
      >
        <InputLabel htmlFor={price.id + "oldPrice"}>Old Price</InputLabel>
        <Input
          onChange={(e) => setOldpr(e.target.value)}
          value={oldPr}
          name={"oldPrice"}
          id={price.id + "oldPrice"}
        />
      </FormControl>
      <div></div>
      <div className="d-flex">
        <IconButton sx={{ m: 1.2 }} onClick={handleEdit}>
          {isEditing ? <DoneIcon /> : <EditIcon />}
        </IconButton>
        <IconButton disabled={!isEditing} sx={{ m: 1.2 }} onClick={addPrice}>
          <AddIcon />
        </IconButton>

        <IconButton disabled={!isEditing} sx={{ m: 1.2 }} onClick={removePrice}>
          <RemoveIcon />
        </IconButton>
      </div>
    </div>
  );
}
