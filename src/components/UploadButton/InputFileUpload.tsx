import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({ name }: { name: string }) {
  const [fileName, setFileName] = useState();
  function handleChange(e: any) {
    setFileName(e.target.files[0].name);
  }
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      {fileName || "Upload file"}
      <VisuallyHiddenInput onChange={handleChange} name={name} type="file" />
    </Button>
  );
}
