import React from "react";
import Slider from "react-slick";

export default function ProductImageSlider({ images }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="pb-4">
      <Slider {...settings}>
        {images.map(function (image, index) {
          return (
            <div key={index}>
              <img
                className="m-auto rounded-2"
                src={image}
                alt=""
                style={{
                  height: "360px",
                }}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
