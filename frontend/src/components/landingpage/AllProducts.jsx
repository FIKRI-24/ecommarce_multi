import React from "react";

function AllProducts() {
  return (
    <>
      <div class="container-fluid fruite py-5">
        <div class="container py-5">
          <div class="row g-4">
            <div class="col-lg-12">
              <div class="row g-3">
                <div class="col-lg">
                  <div class="row g-4 justify-content-center">
                    <div class="col-md-6 col-lg-6 col-xl-4">
                      <div class="rounded position-relative fruite-item">
                        <div class="fruite-img">
                          <img
                            src="https://images.unsplash.com/photo-1591325418441-ff678baf78ef"
                            class="img-fluid w-100 rounded-top"
                            alt=""
                          />
                        </div>
                        <div
                          class="text-white bg-secondary px-3 py-1 rounded position-absolute"
                          style={{
                            top: "10px",
                            left: "10px",
                            position: "absolute",
                          }}
                        >
                          Makanan
                        </div>
                        <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                          <h4>Ichiraku Ramen</h4>
                          <p class="text-limited">
                            bowl of authentic Japanese noodles with rich broth,
                            tender toppings, and fresh ingredients, perfect for
                            warming your day!
                          </p>
                          <div class="d-flex justify-content-between flex-lg-wrap">
                            <p class="text-dark fs-5 fw-bold mb-0">
                              Rp25.000,00
                            </p>
                            <a
                              href="/"
                              class="btn border border-secondary rounded-pill px-3 text-primary"
                            >
                              <i class="fa fa-shopping-bag me-2 text-primary"></i>{" "}
                              Tambah Keranjang
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllProducts;
