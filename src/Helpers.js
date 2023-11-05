import React, { useState, useEffect } from 'react';
import { config } from './config';

// Component displaying a table of hospitals
const HospitalsTable = ({ hospitals, setPid }) => {
  return (
    <>
      {hospitals.map((hospital, index) => {
        const msg = hospital.split("@#thisisspace$%");
        return (
          <div key={msg[6]} onClick={() => { setPid(msg[6]); window.location.href = '#aboutmsg'; }} style={{ cursor: 'pointer' }}>
            <div id={`new${index}`} className='dnd'>
              <p>{msg[0]}</p>
              <p>{msg[3]}</p>
              <p>{`${msg[4]}, ${msg[5]}`}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

// Component displaying detailed hospital information
const HospitalMap = ({ Pid }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetching hospital details based on Pid
    const fetchData = async () => {
      const response = await fetch('/get_hospital_details', {
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          'data': JSON.stringify(Pid)
        }
      });
      const responseData = await response.json();
      let newdata = responseData.data;
      localStorage.setItem("data", JSON.stringify(newdata));
      setData(newdata);
      setShowAbout(true);
    }

    fetchData();
  }, [Pid]);

  return (
    <div>
      {showAbout && data && (
        <div>
          <h2>{data[1]}</h2>
          <p>Address: {data[2]}</p>
          <p>Phone: {data[6]}</p>
          <p>Website: {data[7]}</p>
          <p>Rating: {data[8]}</p>
          {/* Embed Google map based on hospital coordinates */}
          <iframe 
            title='googlemap'
            width='450' 
            height='250' 
            frameborder='0' 
            style={{border:0}} 
            referrerpolicy='no-referrer-when-downgrade' 
            src={`${config.gembedurl}${config.apikey}&origin=place_id:${Pid}&destination=place_id:${data[0]}`} 
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

// Component displaying hospital departments
const ShowDepartments = ({ Pid }) => {
  const [departments, setDepartments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetching departments for a particular hospital
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/get_all_departments', {
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          }
        });
        const responseData = await response.json();
        const newdata = responseData.data;
        const filteredDepartments = newdata.filter(department => department[3] === Pid);
        setDepartments(filteredDepartments);
      } catch (error) {
        console.error('Error fetching departments', error);
      }
    };

    fetchDepartments();
  }, [Pid]);

  useEffect(() => {
    // Checking authentication status
    const isAuthenticated = checkAuthenticationStatus();
    setIsLoggedIn(isAuthenticated);
  }, []);

  // Checking authentication status
  const checkAuthenticationStatus = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  return (
    <div>
      {departments.length > 0 && (
        <div>
          <h3>Departments</h3>
          {departments.map((department, index) => (
            <div className="dnd" key={index}>
              <p>Department of {department[1]}</p>
              <p>
                Contact Information: {isLoggedIn ? department[2] : "You must be logged in!"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Component for an autocomplete search input for hospital names
const Autocomplete = ({ hospitals, selectedHospital, setSelectedHospital }) => {
  // State for suggestions
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Function handling input change
  const onChange = (e) => {
    const selectedHospital = e.currentTarget.value;

    // Filtering hospital suggestions based on the input
    const filteredSuggestions = hospitals.filter(
      (suggestion) =>
        suggestion[1].toLowerCase().indexOf(selectedHospital.toLowerCase()) > -1
    );

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setSelectedHospital({ name: e.currentTarget.value });
  };

  // Function handling suggestion click
  const onClick = (e) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setSelectedHospital({ name: e.currentTarget.innerText, id: e.currentTarget.id });
  };

  // Function handling key presses for navigation
  const onKeyDown = (e) => {
    // Handling 'Enter' key
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      const hospital = filteredSuggestions[activeSuggestion];
      setSelectedHospital({ name: hospital[1], id: hospital[0] });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  let suggestionsListComponent;

  if (showSuggestions && selectedHospital) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <div id="hospinputautocomplete-list" className="autocomplete-items" style={{ position: 'absolute', maxHeight: '12rem' }}>
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            if (index === activeSuggestion) {
              className = "autocomplete-active";
            }

            return (
              <div className={className} id={suggestion[0]} key={suggestion[0]} onClick={onClick}>
                {suggestion[1]}
              </div>
            );
          })}
        </div>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No suggestions available.</em>
        </div>
      );
    }
  }

  return (
    <>
      <input
        id="hospinput"
        type="text"
        className="autocomplete form-control bg-light border-0"
        placeholder="Hospital Name"
        data-target="#hospinput"
        style={{ height: '55px' }}
        value={selectedHospital.name}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {suggestionsListComponent}
    </>
  );
};

export { HospitalsTable, HospitalMap, ShowDepartments, Autocomplete };
