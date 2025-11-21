import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonials() {
  const reviews = [
    {
      name: "Rabeya Bosri",
      desc: "Great shopping experience! Fast delivery and excellent customer service.",
      avatar: "https://i.pravatar.cc/100?img=68",
    },
    {
      name: "John Doe",
      desc: "Amazing products and easy checkout. Highly recommend this store!",
      avatar: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "Jane Smith",
      desc: "Loved the variety and the return policy is super convenient.",
      avatar: "https://i.pravatar.cc/100?img=44",
    },
    {
      name: "Ali Khan",
      desc: "Excellent quality and fast shipping. Will buy again!",
      avatar: "https://i.pravatar.cc/100?img=76",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3, // Desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640, // Mobile
        settings: { slidesToShow: 1, slidesToScroll: 1 }, // ✅ 1 card per slide
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        What Our Customers Say
      </h2>

      <Slider {...settings}>
        {reviews.map((review, idx) => (
          <div key={idx} className="px-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 min-h-[320px]">
              <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-4 border-pink-500">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
                {review.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{review.desc}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Testimonials;


