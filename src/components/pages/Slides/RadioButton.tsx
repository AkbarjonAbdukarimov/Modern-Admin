import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButton({ slideType, setSlideType }) {
  function handleChange(e) {
    setSlideType(e.target.value);
  }
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Slide Type</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel
          onChange={handleChange}
          value=""
          defaultChecked={true}
          control={<Radio />}
          label="None"
        />
        <FormControlLabel
          onChange={handleChange}
          value="product"
          control={<Radio />}
          label="Product"
        />
        <FormControlLabel
          onChange={handleChange}
          value="vendor"
          control={<Radio />}
          label="Vendor"
        />
      </RadioGroup>
    </FormControl>
  );
}
