import React, { useState, useEffect } from "react";
import "../App.css";
import { Button } from "./Button";
import "./HSection.css";

function HSection() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [formData, setFormData] = useState({
    Pregnancies: 0,
    Glucose: 0,
    BloodPressure: 0,
    SkinThickness: 0,
    Insulin: 0,
    BMI: 0,
    DiabetesPedigreeFunction: 0,
    Age: 0,
  });

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="hero-container">
      
      <video src="/videos/office-2.mp4" autoPlay loop muted />
      <h1>EMPLOYEE PREDICTION SYSTEM</h1>
      {/* <p>Explore yor Employees</p> */}
      <div className="hero-btns">
        <Button
          to="/getStart"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={handleClick}
        >
          Get Started
        </Button>
        
      </div>
    </div>
  );
}

export default HSection;
