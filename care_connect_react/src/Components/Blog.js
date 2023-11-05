const BlogSection = () => {
  return (
    // Your JSX for the blog section
    <div className="container-fluid py-5" id="blogdiv">
      <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
              <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Blog Post</h5>
              <h1 className="display-4">Insights and Inspiration: Discover Our Latest Medical Blog Posts</h1>
          </div>
          <div className="row g-5">
              <div className="col-xl-4 col-lg-6">
                  <div className="bg-light rounded overflow-hidden">
                      <img className="img-fluid w-100" src="/static/img/Unknown-3" alt="" />
                      <div className="p-4">
                          <a className="h3 d-block mb-3" href="https://www.stanfordchildrens.org/en/topic/default?id=why-childhood-immunizations-are-important-1-4510">Why Childhood Immunizations Are Important</a>
                          <p className="m-0">Vaccinations protect children against serious illnesses and diseases, and they are an important part of ensuring their overall health and well-being.</p>
                      </div>

                  </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                  <div className="bg-light rounded overflow-hidden">
                      <img className="img-fluid w-100" src="/static/img/Unknown-2" alt="" />
                      <div className="p-4">
                          <a className="h3 d-block mb-3" href="https://www.mayoclinic.org/diseases-conditions/mental-illness/in-depth/mental-health/art-20046477">Mental health: Overcoming the stigma of mental illness</a>
                          <p className="m-0">Mental health stigma can prevent individuals from seeking help and lead to discrimination. Learn how to recognize and overcome mental health stigma.</p>
                      </div>
                  </div>
              </div>

              <div className="col-xl-4 col-lg-6">
                  <div className="bg-light rounded overflow-hidden">
                      <img className="img-fluid w-100" src="/static/img/bloga.jpeg" alt="" />
                      <div className="p-4">
                          <a className="h3 d-block mb-3" href="https://www.hopkinsmedicine.org/health/wellness-and-prevention/7-heart-benefits-of-exercise">7 Heart Benefits of Exercise</a>
                          <p className="m-0">Regular exercise can improve heart health by reducing the risk of heart disease, stroke, and other related conditions.</p>
                      </div>

                  </div>
              </div>

          </div>
      </div>
    </div>
  );
};

export default BlogSection;