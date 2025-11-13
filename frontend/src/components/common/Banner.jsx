import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/Add a heading (1).png";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Banner() {
  const images = [img1, img1, img1, img1]; // replace with actual images

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false, // hide arrows on mobile
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="w-full mt-16">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="relative w-full">
            <img
              src={img}
              alt={`slide-${index}`}
              className="w-full h-56 md:h-98 lg:h-[600px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;
