import { FC } from "react";
import SlideForm from "./SlideForm";

const NewSlide: FC = () => {
  return (
    <>
      <SlideForm formType="new" requestPath="/slides/new" />
    </>
  );
};
export default NewSlide;
