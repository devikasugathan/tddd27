const TestimonialSection = () => {
  return (
    <div className="container-fluid py-5" id="testdiv">
     <div className="container">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
          <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Testimonial</h5>
          <h1 className="display-4">Patients Say About Our Services</h1>
      </div>
      <div className="row justify-content-center">
          <div className="col-lg-8">
              <div className="testimonial-grid">
                  <div className="testimonial-item">
                      <img className="img-fluid rounded-circle mx-auto" src="/static/img/peer-review-icon-2888794__340.webp" alt="" />
                      <p className="fs-4 fw-normal">I had to find a hospital for my grandmother and came across this website. It made the process so much easier and less stressful. We were able to find a great hospital close by with excellent reviews. Thank you!</p>
                      <h3>Damon</h3>
                      <h6 className="fw-normal text-primary mb-3">Registered User</h6>
                  </div>
                  <div className="testimonial-item">
                      <img className="img-fluid rounded-circle mx-auto" src="/static/img/peer-review-icon-2888794__340.webp" alt="" />
                      <p className="fs-4 fw-normal">This website was a lifesaver when I needed to find an emergency room. The map feature was incredibly helpful in finding a hospital that was close by and had good ratings. I would definitely recommend this site to anyone in need of finding a hospital quickly.</p>
                      <h3>Elsa</h3>
                      <h6 className="fw-normal text-primary mb-3">Registered User</h6>
                  </div>
                  <div className="testimonial-item">
                      <img className="img-fluid rounded-circle mx-auto" src="/static/img/peer-review-icon-2888794__340.webp" alt="" />
                      <p className="fs-4 fw-normal">I've been using this hospital finder website for a while now, and I must say, it's one of the most reliable sources out there. It's helped me find the best hospitals in town for my regular checkups and medical treatments. Highly recommended!</p>
                      <h3>John</h3>
                      <h6 className="fw-normal text-primary mb-3">Registered User</h6>
                  </div>
              </div>
          </div>
      </div>
    </div>
    </div>
  );
};

export default TestimonialSection;