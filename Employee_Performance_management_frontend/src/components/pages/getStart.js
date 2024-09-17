import React, { useState } from "react";
import "./getStart.css";

export default function GetStart() {
  const [inputs, setInputs] = useState({
    number_project: "",
    average_monthly_hours: "",
    time_spend_company: "",
    Work_accident: "",
    left: "",
    promotion_last_5years: "",
    Department: "",
    salary: "",
    satisfaction_level: "", // Ensure this matches backend
  });

  const [predictionResult, setPredictionResult] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.error || "Network response was not ok");
            });
          }
          return response.json();
        })
        .then((data) => {
          const prediction = data.prediction_result[0];
          if (prediction === 'LOW') {
            setPredictionResult("Employee Performance is LOW");
          }
          if (prediction === 1) {
            setPredictionResult("Employee Performance is HIGH");
          } else {
            setPredictionResult("Employee Performance is AVERAGE");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setPredictionResult(`Error: ${error.message}`);
        });
  };

  return (
      <div className="hero-container">
        <video src="/videos/office-2.mp4" autoPlay loop muted />

        <div className="App">
          <div className="get-start-container-form">
            <h1 className="get-start-heading">Employee Performance Predictor</h1>

            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="number_project">Number of Projects:</label>
                <input
                    id="number_project"
                    type="text"
                    name="number_project"
                    value={inputs.number_project}
                    onChange={handleInputChange}
                />
              </div>

              <div className="input-container">
                <label htmlFor="average_monthly_hours">
                  Average Monthly Hours:
                </label>
                <input
                    id="average_monthly_hours"
                    type="text"
                    name="average_monthly_hours"
                    value={inputs.average_monthly_hours}
                    onChange={handleInputChange}
                />
              </div>

              <div className="input-container">
                <label htmlFor="time_spend_company">Time Spend Company:</label>
                <input
                    id="time_spend_company"
                    type="text"
                    name="time_spend_company"
                    value={inputs.time_spend_company}
                    onChange={handleInputChange}
                />
              </div>

              <div className="input-container">
                <label htmlFor="Work_accident">Work Accident:</label>
                <input
                    id="Work_accident"
                    type="text"
                    name="Work_accident"
                    value={inputs.Work_accident}
                    onChange={handleInputChange}
                />
              </div>

              <div className="input-container">
                <label htmlFor="left">Left Company:</label>
                <input
                    id="left"
                    type="text"
                    name="left"
                    value={inputs.left}
                    onChange={handleInputChange}
                />
              </div>

              <div className="input-container">
                <label htmlFor="promotion_last_5years">
                  Promotion in Last 5 Years:
                </label>
                <input
                    id="promotion_last_5years"
                    type="text"
                    name="promotion_last_5years"
                    value={inputs.promotion_last_5years}
                    onChange={handleInputChange}
                />
              </div>

              <div className="input-container">
                <label htmlFor="Department">Department:</label>
                <input
                    id="Department"
                    type="text"
                    name="Department"
                    value={inputs.Department}
                    onChange={handleInputChange}
                />
              </div>

              <div className="input-container">
                <label htmlFor="salary">Salary (1-Low, 2-Medium, 3-High):</label>
                <input
                    id="salary"
                    type="text"
                    name="salary"
                    value={inputs.salary}
                    onChange={handleInputChange}
                />
              </div>

              <div className="input-container">
                <label htmlFor="satisfaction_level">Satisfaction Level:</label>
                <input
                    id="satisfaction_level"
                    type="text"
                    name="satisfaction_level"
                    value={inputs.satisfaction_level}
                    onChange={handleInputChange}
                />
              </div>

              <center>
                <button type="submit" className="btn--medium">
                  <b>SUBMIT</b>
                </button>
                <button type="button" className="btn--medium">
                  <b>REQUEST PROMO</b>
                </button>
              </center>
            </form>

            {predictionResult && (
                <div className="prediction-result">
                  <h2>Prediction Result: {predictionResult}</h2>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}
