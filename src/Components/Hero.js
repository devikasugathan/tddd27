import React, { useState } from 'react';

  const HeroSection = ({ fetchData, searchQuery, setSearchQuery }) => {
    // State to manage search tab visibility
    const [searchTabVisible, setSearchTabVisible] = useState(false);
  
    // Callback for successful geolocation
    const successCallback = (position) => {
      // Fetch data using latitude and longitude
      fetchData(`latlng=${position.coords.latitude},${position.coords.longitude}`);
    };
  
    // Toggle the visibility of the search tab
    const showSearchTab = (event) => {
      event.preventDefault();
      setSearchTabVisible(!searchTabVisible);
    };
  
    // Get user's geolocation
    const getLocation = (event) => {
      event.preventDefault();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback);
      }
    };
 
  return (
    <div className="container-fluid bg-primary py-5 mb-5 hero-header">
      <div className="container py-5">
        <div className="row justify-content-start">
          <div className="col-lg-8 text-center text-lg-start">
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5" style={{ borderColor: 'rgba(256, 256, 256, .3)', zIndex: 10 }}>
              Welcome To CareConnect
            </h5>
            <h1 className="display-1 text-white mb-md-4">Find The Best Healthcare Near You</h1>
            <div className="pt-2">
              <button onClick={showSearchTab} className="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">
                Search
              </button>
              <a href="#appointdiv" className="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">
                Book Appointment
              </a>
            </div>
            <div className="mx-auto" style={{ width: '100%', maxWidth: '600px', display: searchTabVisible ? 'block' : 'none' }} id="searchtab">
              <div>
                <div className="input-group" style={{ left: '-60px', top: '30px' }}>
                  <select
                    defaultValue="op1"
                    className="form-control border-primary w-25"
                    style={{ height: '60px', backgroundColor: '#fff' }}
                  >
                    <option value="op1">Hospital</option>
                    {/*<!--<option value="1">Department</option>
                                <option value="2">Physician</option> -->*/}
                  </select>
                  <input
                    id="loc"
                    type="text"
                    className="form-control border-primary w-50"
                    placeholder="Keyword"
                    required
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button onClick={()=>fetchData(searchQuery)} value="save" className="btn btn-dark border-0 w-25">
                    Search
                  </button>
                  <button
                    onClick={getLocation}
                    style={{ position: 'absolute', left: '610px' }}
                    className="btn btn-dark border-0 w-25"
                  >
                    Search by your location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
