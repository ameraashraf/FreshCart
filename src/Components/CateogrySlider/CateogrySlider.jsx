import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../Loader/Loader";

function CateogrySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // function that returns promise

  function fetchSliderCateogries() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  //calling api using useQuery

  const { data, isLoading, isFetching } = useQuery(
    "sliderCateogries",
    fetchSliderCateogries
  );

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div className="slider-container mt-5 mt-md-4 pb-2 pb-md-3 ">
      <Slider {...settings}>
        {data?.data.data.map(function (category, index) {
          return (
            <div className="" key={index}>
              <img
                style={{ height: "250px", width: "250px" }}
                className="w-100"
                src={category.image}
                alt={category.name}
              />
              <h5 className="text-center">{category.name}</h5>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default CateogrySlider;
