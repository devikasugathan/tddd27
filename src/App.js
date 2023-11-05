// Importing necessary components and hooks
import Navigation from './Components/Navigation';
import HeroSection from './Components/Hero';
import SearchSection from './Components/Search';
import AboutSection from './Components/About';
import AppointmentSection from './Components/Appointement';
import TestimonialSection from './Components/Testimonial';
import BlogSection from './Components/Blog';
import { useState, useEffect } from 'react';

const App = () => {
  // State declarations
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Checks authentication status
    const isAuthenticated = checkAuthenticationStatus();
    setIsLoggedIn(isAuthenticated);
  }, []);

  // Function to fetch hospital data based on provided location data
  const fetchData = async (data) => {
    // If data is empty, return
    if (data === "") {
      return;
    }

    // Add 'address=' prefix to the data if it doesn't start with 'latlng'
    if (!data.startsWith("latlng")) {
      data = "address=" + data;
    }

    setShowSearch(true);
    setLoading(true);

    // Fetch nearby hospitals based on data
    const response = await fetch('/get_nearby_hospitals', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        'data': JSON.stringify(data)
      }
    });

    if (!response.ok) {
      setShowSearch(false);
      setLoading(false);
      throw new Error(`${response.status}`);
    }

    // Process response and set hospital data
    const result = await response.json();
    setHospitals(result.data);
    setLoading(false);
  };

  // Check authentication status
  const checkAuthenticationStatus = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  return (
    <>
      {/* Rendering components based on state */}
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <HeroSection
        fetchData={fetchData}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {showSearch && <SearchSection setShowSearch={setShowSearch} hospitals={hospitals} loading={loading} />}
      <AboutSection />
      <AppointmentSection hospitals={hospitals} />
      <TestimonialSection />
      <BlogSection />
    </>
  );
}

export default App;
