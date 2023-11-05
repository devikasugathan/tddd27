import React, { useState } from 'react';

const Login = ({ modalOpen, setModalOpen, setIsLoggedIn }) => {
  // State to manage email, password, and messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Update email state on input change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Update password state on input change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle form submission for user sign-in
  const handleSignIn = async (event) => {
    event.preventDefault();

    // Password validation
    if (password.length < 5) {
      setMessage('Password is too short');
      return;
    }

    // Fetch to sign-in endpoint
    const response = await fetch('/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    // Handling the response
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.data);
      setMessage('User logged in');
      setEmail('');
      setPassword('');
      setIsLoggedIn(true);
      setModalOpen('');
    } else {
      setMessage('Error: ' + response.status);
    }
  };
  
  return (
    <div className="modal fade show" id="SigninModal" tabIndex="-1" style={{display:modalOpen==="login"?"block":"none"}}>
      <div className="modal-dialog">
        <div className="modal-content" style={{ color: '#13C5DD' }}>
          <div className="modal-header">
            <h4 className="modal-title w-100 font-weight-bold">Sign In</h4>
            <button type="button" className="btn-close" onClick={()=>setModalOpen("")}></button>
          </div>
          <form id="signinform" onSubmit={handleSignIn}>
            <div className="modal-body">
              <div className="md-form mb-5">
                <i className="fas fa-envelope prefix grey-text"></i>
                <input type="email" id="siemail" className="form-control validate" value={email} onChange={handleEmailChange} />
                <label data-bs-error="wrong" data-bs-success="right" htmlFor="siemail">Email</label>
              </div>
              <div className="md-form mb-4">
                <i className="fas fa-lock prefix grey-text"></i>
                <input type="password" id="sipass" className="form-control validate" value={password} onChange={handlePasswordChange} />
                <label data-bs-error="wrong" data-bs-success="right" htmlFor="sipass">Password</label>
              </div>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="submit" id="signinbtn" value="save" className="btn btn-primary">Submit</button>
            </div>
          </form>
          {message && <p  className="alert alert-info" role="alert" >{message}</p>}
        </div>
      </div>
    </div>
  );
};

const Signup = ({modalOpen,setModalOpen,setIsLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage(' Passwords do not match');
      return;
    }
    if (password.length < 5) {
      setMessage('Password is too short');
      return;
    }
    const response = await fetch('/sign_up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        username,
        phone,
        password,
        "confirm":confirmPassword
      })
    });
    if (response.ok) {
      setMessage('User created. Please sign in');
      setIsLoggedIn(true)
      
    } else {
      setMessage('Error: ' + response.status);
    }
    

    setEmail('');
    setUsername('');
    setPhone('');
    setPassword('');
    setModalOpen("")
    setConfirmPassword('');
  };

  return (
    <div className="modal fade show" id="SignupModal" tabIndex="-1" style={{display:modalOpen==="signup"?"block":"none"}}>
      <div className="modal-dialog">
        <div className="modal-content" style={{ color: '#13C5DD' }}>
          <div className="modal-header">
            <h4 className="modal-title w-100 font-weight-bold">Sign Up</h4>
            <button type="button" className="btn-close" onClick={()=>setModalOpen("")}></button>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="modal-body">
              <div className="md-form mb-5">
                <i className="fas fa-user prefix grey-text"></i>
                <input type="text" className="form-control validate" value={username} onChange={handleUsernameChange} />
                <label data-bs-error="wrong" data-bs-success="right" htmlFor="username">Username</label>
              </div>
              <div className="md-form mb-5">
                <i className="fas fa-envelope prefix grey-text"></i>
                <input type="email" className="form-control validate" value={email} onChange={handleEmailChange} />
                <label data-bs-error="wrong" data-bs-success="right" htmlFor="email">Email</label>
              </div>
              <div className="md-form mb-5">
                <i className="fas fa-phone prefix grey-text"></i>
                <input type="tel" className="form-control validate" value={phone} onChange={handlePhoneChange} />
                <label data-bs-error="wrong" data-bs-success="right" htmlFor="phone">Phone</label>
              </div>
              <div className="md-form mb-4">
                <i className="fas fa-lock prefix grey-text"></i>
                <input type="password" className="form-control validate" value={password} onChange={handlePasswordChange} />
                <label data-bs-error="wrong" data-bs-success="right" htmlFor="password">Password</label>
              </div>
              <div className="md-form mb-4">
                <i className="fas fa-lock prefix grey-text"></i>
                <input type="password" className="form-control validate" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                <label data-bs-error="wrong" data-bs-success="right" htmlFor="confirmPassword">Confirm Password</label>
              </div>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="submit" value="save" className="btn btn-primary">Submit</button>
            </div>
          </form>
          {message && <p className="alert alert-info" role="alert">{message}</p>}
        </div>
      </div>
    </div>
  );
};

const ChangePassword = (modalOpen,setModalOpen) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage(' New passwords do not match');
      return;
    }
    if (newPassword.length < 5) {
      setMessage('New password is too short');
      return;
    }
    const token = localStorage.getItem('token');
    const response = await fetch('/change_password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        oldPassword,
        newPassword
      })
    });
    if (response.ok) {
      setMessage('Password changed');
    } else {
      setMessage('Error: ' + response.status);
    }

    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setModalOpen("")
  };

  return (
    <div className="modal fade show" id="AccountModal" tabIndex="-1" style={{display:modalOpen==="account"?"block":"none"}}>
  <div className="modal-dialog">
    <div className="modal-content" style={{ color: '#13C5DD' }}>
      <div className="modal-header">
        <h4 className="modal-title w-100 font-weight-bold">My Account</h4>
        <button type="button" className="btn-close" onClick={()=>setModalOpen("")}>
        </button>
      </div>
      <form id="changepassform" onSubmit={handleChangePassword}>
        <div className="modal-body">
          <div>
            <div className="md-form mb-4">
              <i className="fas fa-lock prefix grey-text"></i>
              <input type="password" id="oldpass" value={oldPassword} onChange={handleOldPasswordChange} className="form-control validate" />
              <label data-bs-error="wrong" data-bs-success="right" htmlFor="oldpass">Old Password</label>
            </div>
            <div className="md-form mb-4">
              <i className="fas fa-lock prefix grey-text"></i>
              <input type="password" id="newpass" value={newPassword} onChange={handleNewPasswordChange} className="form-control validate" />
              <label data-bs-error="wrong" data-bs-success="right" htmlFor="newpass">New Password</label>
            </div>
            <div className="md-form mb-4">
              <i className="fas fa-lock prefix grey-text"></i>
              <input type="password" id="confpass" value={confirmPassword} onChange={handleConfirmPasswordChange} className="form-control validate" />
              <label data-bs-error="wrong" data-bs-success="right" htmlFor="confpass">Confirm Password</label>
            </div>
          </div>
        </div>
        <div className="modal-footer  justify-content-center">
          <button type="submit" id="changepassbtn" value="save" className="btn btn-primary">Submit</button>
        </div>
      </form>
      {message && <p className="alert alert-info" role="alert">{message}</p>}
    </div>
  </div>
  </div>
  );
};

const SignOut = ({setIsLoggedIn}) => {
  const handleSignOut = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/sign_out', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    if (response.ok) {
      localStorage.removeItem('token');
      setIsLoggedIn(false)
    }
  };
  
  return (
    <button type="button" onClick={handleSignOut} className="btn btn-primary">
      Sign Out
    </button>
  );
};

const Navigation = ({isLoggedIn,setIsLoggedIn}) => {
  const [modalOpen,setModalOpen] = useState("")
  return (
    <div id="navbar" className="container-fluid sticky-top bg-white shadow-sm" key={isLoggedIn} >
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
          <a href="/" className="navbar-brand">
            <h1 className="m-0 text-uppercase text-primary"><i className="fa fa-clinic-medical me-2"></i>CareConnect</h1>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <a href="/" className="nav-item nav-link active">Home</a>
              <a href="#aboutdiv" className="nav-item nav-link">About</a>
              <a href="#appointdiv" className="nav-item nav-link">Appointment</a>
              <a href="#testdiv" className="nav-item nav-link">Testimonial</a>
              <a href="#blogdiv" className="nav-item nav-link">Blog Posts</a>
              <div className="nav-item nav-link">
                {
                !(isLoggedIn)?
                (<>
                  <button type="button" className="btn btn-primary" onClick={()=>setModalOpen("login")}> Sign In </button>
                  <button type="button" className="btn btn-primary" onClick={()=>setModalOpen("signup")} style={{ position:'relative', left: '5.01px' }}> Sign Up </button>
                </>)
                :
                (
                  <>
                    <button type="button" className="btn btn-primary" onClick={()=>setModalOpen("account")}>
                      Account
                    </button>
                    <SignOut setIsLoggedIn={setIsLoggedIn}/>
                  </>
                )
                }
              </div>
              <div className="nav-item nav-link">
              </div>
            </div>
          </div>
        </nav>
      </div>
      {
        !(isLoggedIn)?
          <><Login setIsLoggedIn={setIsLoggedIn} modalOpen={modalOpen} setModalOpen={setModalOpen} /><Signup setIsLoggedIn={setIsLoggedIn} modalOpen={modalOpen} setModalOpen={setModalOpen}/></>:<ChangePassword modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      }
    </div>
  );
};

export default Navigation;
