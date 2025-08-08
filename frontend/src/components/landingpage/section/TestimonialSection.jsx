import React from "react";

const testimonials = [
  {
    text: "Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "img/testimonial-1.jpg",
    name: "Client Name",
    profession: "Profession",
    stars: 4,
  },
  {
    text: "Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "img/testimonial-1.jpg",
    name: "Client Name",
    profession: "Profession",
    stars: 5,
  },
  {
    text: "Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "img/testimonial-1.jpg",
    name: "Client Name",
    profession: "Profession",
    stars: 5,
  },
];

const StarRating = ({ stars }) => {
  const totalStars = 5;
  return (
    <div className="d-flex pe-5">
      {[...Array(totalStars)].map((_, index) => (
        <i
          key={index}
          className={`fas fa-star ${index < stars ? "text-primary" : ""}`}
        ></i>
      ))}
    </div>
  );
};

const TestimonialItem = ({ testimonial }) => (
  <div className="testimonial-item img-border-radius bg-light rounded p-4">
    <div className="position-relative">
      <i
        className="fa fa-quote-right fa-2x text-secondary position-absolute"
        style={{ bottom: "30px", right: 0 }}
      ></i>
      <div className="mb-4 pb-4 border-bottom border-secondary">
        <p className="mb-0">{testimonial.text}</p>
      </div>
      <div className="d-flex align-items-center flex-nowrap">
        <div className="bg-secondary rounded">
          <img
            src={testimonial.image}
            className="img-fluid rounded"
            style={{ width: "100px", height: "100px" }}
            alt={testimonial.name}
          />
        </div>
        <div className="ms-4 d-block">
          <h4 className="text-dark">{testimonial.name}</h4>
          <p className="m-0 pb-3">{testimonial.profession}</p>
          <StarRating stars={testimonial.stars} />
        </div>
      </div>
    </div>
  </div>
);

const TestimonialSection = () => {
  return (
    <div className="container-fluid testimonial py-5">
      <div className="container py-5">
        <div className="testimonial-header text-center">
          <h4 className="text-primary">Our Testimonial</h4>
          <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
        </div>
        <div className="owl-carousel testimonial-carousel">
          {testimonials.map((item, index) => (
            <TestimonialItem testimonial={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
