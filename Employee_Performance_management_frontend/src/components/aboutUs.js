import React from 'react';

const AboutPage = () => {
    // Inline CSS styles
    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif',
            lineHeight: '1.6',
        },
        heading: {
            fontSize: '2rem',
            color: '#333',
            marginBottom: '10px',
        },
        subheading: {
            fontSize: '1.5rem',
            color: '#555',
            margin: '10px 0',
        },
        paragraph: {
            marginBottom: '15px',
        },
        link: {
            color: '#007bff',
            textDecoration: 'none',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>About Our Employee Performance Prediction Tool</h1>
            <p style={styles.paragraph}>
                Welcome to our Employee Performance Prediction Tool!
            </p>
            <p style={styles.paragraph}>
                In today’s fast-paced business environment, understanding and predicting employee performance is crucial for effective management and growth. Our innovative web application leverages advanced machine learning algorithms, specifically a Random Forest model, to provide insightful predictions about employee performance based on various input parameters.
            </p>
            <h2 style={styles.subheading}>What We Do</h2>
            <p style={styles.paragraph}>
                Our tool is designed to help organizations make data-driven decisions by analyzing historical performance data and predicting future outcomes. By using sophisticated machine learning techniques, we provide actionable insights that assist in talent management, recruitment, and employee development.
            </p>
            <h2 style={styles.subheading}>How It Works</h2>
            <p style={styles.paragraph}>
                <strong>1. Data Input:</strong> Users provide relevant performance data and other parameters through an intuitive and user-friendly interface.
            </p>
            <p style={styles.paragraph}>
                <strong>2. Prediction Engine:</strong> Our backend, built with Flask, processes the data and applies a trained Random Forest model to generate performance predictions.
            </p>
            <p style={styles.paragraph}>
                <strong>3. Results Visualization:</strong> The frontend, crafted with React, displays the results in a clear and accessible format, helping you interpret the predictions and make informed decisions.
            </p>
            <h2 style={styles.subheading}>Our Vision</h2>
            <p style={styles.paragraph}>
                We aim to empower businesses with the tools and insights they need to foster a high-performing workforce. By integrating machine learning into the evaluation process, we strive to enhance the accuracy and effectiveness of performance predictions.
            </p>
            <p style={styles.paragraph}>
                Thank you for choosing our tool to support your employee performance management needs. We are committed to helping you achieve success through data-driven insights.
            </p>
            <p style={styles.paragraph}>
                For more information or support, please feel free to <a href="mailto:support@example.com" style={styles.link}>contact us</a>.
            </p>
        </div>
    );
};

export default AboutPage;
