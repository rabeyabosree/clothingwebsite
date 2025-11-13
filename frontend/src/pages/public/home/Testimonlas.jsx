import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonials() {
  const reviews = [
    {
      name: "Rabeya Bosri",
      desc: "Great shopping experience! Fast delivery and excellent customer service.",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      name: "John Doe",
      desc: "Amazing products and easy checkout. Highly recommend this store!",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    {
      name: "Jane Smith",
      desc: "Loved the variety and the return policy is super convenient.",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    {
      name: "Ali Khan",
      desc: "Excellent quality and fast shipping. Will buy again!",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
      <Slider {...settings}>
        {reviews.map((review, idx) => (
          <div key={idx} className="p-4">
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <h3 className="font-bold text-lg mb-2">{review.name}</h3>
              <p className="text-gray-600">{review.desc}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Testimonials;
