import React, { useState, useEffect } from 'react';
import { Autocomplete } from '../Helpers';

const AppointmentSection = () => {
  // States for managing data
  const [hospitals, setHospitals] = useState();
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState({ id: "", name: "" });
  const [selectedDepartment, setSelectedDepartment] = useState({ id: "", name: "" });
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [datetime, setDatetime] = useState('');
  const [msg, setMsg] = useState('');

  // Fetching hospitals on component mount
  useEffect(() => {
    fetch(`/get_all_hospitals`)
      .then(response => response.json())
      .then(data => {
        setHospitals(data.data);
      });
  }, []);

  // Fetching departments based on selected hospital
  useEffect(() => {
    if (selectedHospital.id) {
      fetch(`/get_all_departments`)
        .then(response => response.json())
        .then(data => {
          setDepartments(data.data.filter(row => row[3] === selectedHospital.id));
        });
    }
  }, [selectedHospital.id]);

  // Fetching doctors based on selected department
  useEffect(() => {
    if (selectedDepartment.id) {
      fetch(`/get_all_doctors`)
        .then(response => response.json())
        .then(data => {
          setDoctors(data.data.filter(row => row[2] === selectedDepartment.id));
        });
    }
  }, [selectedDepartment.id]);

  // Function to book an appointment
  const bookAppointment = (event) => {
    event.preventDefault();
    let errorMsg = "";

    // Validation checks
    if (!selectedHospital.name) {
      errorMsg = 'Please select a hospital.';
    } else if (!selectedDepartment.name) {
      errorMsg = 'Please select a department.';
    } else if (!selectedDoctor) {
      errorMsg = 'Please select a doctor.';
    } else if (!name) {
      errorMsg = 'Please enter your name.';
    } else if (!email) {
      errorMsg = 'Please enter your email.';
    } else if (!datetime) {
      errorMsg = 'Please select a date and time.';
    }

    // Set error message
    setMsg(errorMsg);

    // If there's an error, return without making the appointment
    if (errorMsg !== "") return;

    // Data to be sent for appointment
    const data = {
      'hospital': selectedHospital.name,
      'department': selectedDepartment.name,
      'doctor': selectedDoctor,
      'name': name,
      'email': email,
      'datetime': datetime,
      'token': localStorage.getItem("token")
    };

    // Making appointment by sending data
    fetch("/send_mail", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          setMsg('Appointment successfully made');
        } else {
          setMsg("Error");
        }
      });
  };

  return (
    <div className="container-fluid bg-primary my-5 py-5" id="appointdiv">
      <div className="container py-5">
          <div className="row gx-5">
              <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="mb-4">
                      <h5 className="d-inline-block text-white text-uppercase border-bottom border-5">Appointment</h5>
                      <h2 className="display-4">Book Your Next Appointment with Ease: Schedule Your Visit Today!</h2>
                  </div>
                  <p className="text-white mb-5">Our website provides a hassle-free appointment booking system, allowing you to easily book appointments with your desired hospital and doctor. With just a few clicks, you can select the date, time, and doctor of your choice, and receive a confirmation email with all the necessary details. We understand the importance of timely healthcare services and strive to make the process as seamless as possible for our users. Book your next appointment with us and experience the convenience of our platform.</p>
              </div>
              <div className="col-lg-6">
                  <div className="bg-white text-center rounded p-5">
                      <h1 className="mb-4">Book An Appointment</h1>
                      <form autoComplete="off" id="appointform" onSubmit={bookAppointment}>
                          <div className="row g-3">
                              <div className="col-12 col-sm-6">
                                  <div className="time" id="inp" data-target-input="nearest" style={{position:'relative'}}>
                                      <Autocomplete hospitals={hospitals} selectedHospital={selectedHospital} setSelectedHospital={setSelectedHospital} />
                                  </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                  <select defaultValue="dp1" id="depdropdown" onChange={e => setSelectedDepartment({name:e.target.value,id:e.target.selectedOptions[0].dataset.id})} className="form-select bg-light border-0" style={{ height: '55px' }}>
                                      <option value="dp1">Choose Department</option>
                                      {departments.map(department => (
                                        <option key={department[0]} data-id={department[0]} value={department[1]}>{department[1]}</option>
                                      ))}
                                  </select>
                              </div>
                              <div className="col-12 col-sm-6">
                                  <select defaultValue="dt1" id="doctdropdown" onChange={e => setSelectedDoctor(e.target.value)} className="form-select bg-light border-0" style={{ height: '55px' }}>
                                      <option value="dt1">Select Doctor</option>
                                      {doctors.map(doctor => (
                                        <option key={doctor[0]} value={doctor[1]}>{doctor[1]}</option>
                                      ))}
                                  </select>
                              </div>
                              <div className="col-12 col-sm-6">
                                <input id="inpname" type="text" className="form-control bg-light border-0" placeholder="Your Name" style={{ height: '55px' }} 
                                    value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <input id="inpmail" type="email" className="form-control bg-light border-0" placeholder="Your Email" style={{ height: '55px' }} 
                                    value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="date" id="datetime" data-target-input="nearest" style={{ position: 'relative' }}>
                                        <input id="inpdatetime" type="datetime-local"
                                            className="form-control bg-light border-0"
                                            placeholder="Date & Time" data-target="#inpdatetime" style={{ height: '55px' }} 
                                            value={datetime} onChange={e => setDatetime(e.target.value)} />
                                    </div>
                                </div>
                              <div className="col-12">
                              <button className="btn btn-primary w-100 py-3" type="submit" value="save">Make An Appointment</button>
                              </div>
                          </div>
                      </form>
                      {msg&&(<p id="appointmsg" className="alert alert-info" role="alert" >{msg}</p>)}
                  </div>
              </div>
          </div>
      </div>
  </div>
  );
};

export default AppointmentSection;
