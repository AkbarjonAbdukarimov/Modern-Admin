// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import DeleteIcon from "@mui/icons-material/Delete";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
import ISlide from "../../interfaces/ISlide";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import axios from "axios";
export default function Carousel({
  slides,
  refetch,
}: {
  slides: ISlide[];
  refetch: Function;
}) {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div className="container">
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <Link
              to={
                `/slides/${s.id}`
                // s.productId
                //   ? `/products/${s.productId}`
                //   : s.vendorId
                //   ? `/vendors/${s.vendorId}`
                //   : "/products"
              }
            >
              <img
                src={"https://ik.imagekit.io/z6k3ktb71/" + s.image.name}
                alt={s.title}
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "500px",
                }}
              />
            </Link>
            <IconButton
              onClick={() =>
                axios.delete(`/slides/delete/${s.id}`).then((_res) => refetch())
              }
            >
              <DeleteIcon />
            </IconButton>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
