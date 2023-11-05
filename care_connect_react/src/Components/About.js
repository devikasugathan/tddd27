const AboutSection = () => {
  return (
    <div className="container-fluid py-5" id="aboutdiv">
      <div className="container">
          <div className="row gx-5">
              <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '500px' }}>
                  <div className="position-relative h-100">
                      <img alt="" className="position-absolute w-100 h-100 rounded" src="/static/img/about2.jpg" style={{ objectFit: 'cover' }} />
                  </div>
              </div>
              <div className="col-lg-7">
                  <div className="mb-4">
                      <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">About Us</h5>
                  </div>
                  <p>Welcome to our Hospital Finder website! We provide a convenient way to search for hospitals near you and book appointments with doctors. Our mission is to help you find the best healthcare options available in your area. We are committed to providing a seamless and user-friendly experience for all our visitors. Thank you for choosing us as your trusted healthcare partner.</p>
                  <div className="row g-3 pt-3">
                      <div className="col-sm-3 col-6">
                          <div className="bg-light text-center rounded-circle py-4">
                              <i className="fa fa-3x fa-user-md text-primary mb-3"></i>
                              <h6 className="mb-0">Quality<small className="d-block text-primary">Healthcare</small></h6>
                          </div>
                      </div>
                      <div className="col-sm-3 col-6">
                          <div className="bg-light text-center rounded-circle py-4">
                              <i className="fa fa-3x fa-procedures text-primary mb-3"></i>
                              <h6 className="mb-0">Trustworthy<small className="d-block text-primary">Services</small></h6>
                          </div>
                      </div>
                      <div className="col-sm-3 col-6">
                          <div className="bg-light text-center rounded-circle py-4">
                              <i className="fa fa-3x fa-microscope text-primary mb-3"></i>
                              <h6 className="mb-0">Appointment<small className="d-block text-primary">Scheduling</small></h6>
                          </div>
                      </div>
                      <div className="col-sm-3 col-6">
                          <div className="bg-light text-center rounded-circle py-4">
                              <i className="fa fa-3x fa-ambulance text-primary mb-3"></i>
                              <h6 className="mb-0">Easy<small className="d-block text-primary">Navigation</small></h6>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AboutSection;