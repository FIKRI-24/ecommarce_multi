import React from "react";

const features = [
  {
    icon: "fas fa-car-side",
    title: "Free Shipping",
    description: "Free on order over $300",
  },
  {
    icon: "fas fa-user-shield",
    title: "Security Payment",
    description: "100% security payment",
  },
  {
    icon: "fas fa-exchange-alt",
    title: "30 Day Return",
    description: "30 day money guarantee",
  },
  {
    icon: "fa fa-phone-alt",
    title: "24/7 Support",
    description: "Support every time fast",
  },
];

const FeatureSection = () => {
  return (
    <section className="container-fluid featurs py-5 bg-white">
      <div className="container py-5">
        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="featurs-item text-center rounded bg-light p-4">
                <div
                  className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto d-flex align-items-center justify-content-center"
                  style={{ width: 80, height: 80 }}
                >
                  <i className={`${feature.icon} fa-3x text-white`}></i>
                </div>
                <div className="featurs-content text-center">
                  <h5>{feature.title}</h5>
                  <p className="mb-0">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
