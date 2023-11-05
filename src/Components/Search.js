import React, { useState } from 'react';
import { HospitalsTable, HospitalMap, ShowDepartments } from '../Helpers';

const SearchSection = ({ setShowSearch, hospitals, loading }) => {
  // State to manage Pid and showDepartments
  const [Pid, setPid] = useState("");
  const [showDepartments, setShowDepartments] = useState(false);

  // Function to get directions
  const directions = (event) => {
    event.preventDefault();
    // Get data from localStorage and construct a Google Maps URL
    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    let place = data[0];
    let name = data[1];
    name = encodeURI(name);
    window.open("https://www.google.com/maps/dir/?api=1&destination=" + name + "&destination_place_id=" + place, "_blank");
  };

  return (
    <div className="container-fluid py-5" id="searchdiv">
      <div className="container">
        <div className="row gx-5">
          {Pid !== "" && <div id="aboutmsg" className="bg-white text-center rounded p-5">
            <button id="clearaboutmsg" className="nav-item nav-link active" onClick={()=>setPid("")}>Clear Details</button>
            <div className="bg-white text-center rounded">
              <section>
                <div className='dnd'>
                  <div id="detailmsg">
                     <HospitalMap Pid={Pid} />
                  </div>
                  <p><button onClick={directions} className='btn btn-dark border-0'>Get directions</button></p>
                  <p><button onClick={()=>setShowDepartments(true)} className='btn btn-dark border-0'>Departments</button></p>
                  {showDepartments && <div id='deptmsg' className='bg-white text-center rounded p-5'>
                      <ShowDepartments Pid={Pid} />
                    </div>}
                </div>
                <div id="framemsg"></div>
              </section>
            </div>
          </div>}
          {loading&&(<h2 style={{ textAlign: 'center' }}>Fetching data ...</h2>)}
          <div id="divfound" className="bg-white text-center rounded p-5" style={{ display: hospitals.length > 0 ? 'block' : 'none' }}>
            <div id="foundmsg">
              <h2>Hospitals found</h2>
            </div>
            <button id="clearsearchmsg" className="nav-item nav-link active" style={{background:'none',border:'none',margin:'auto'}} onClick={()=>setShowSearch(false)}>Clear Search</button>
            <div id="searchmsg" className="bg-white text-center rounded">
              <HospitalsTable hospitals={hospitals} setPid={setPid} />
            </div>
          </div>
        </div>
      </div>
    </div>

); };

export default SearchSection;