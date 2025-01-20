import React from 'react';
import './ContactUs.css';

export const ContactUs: React.FC = () => {
    return (
        <div className="contact-us">
            <h3>Contact Us</h3>
            <h4>Address</h4>
            <p>123 Library Street</p>
            <p>Library, Cairo, Egypt</p>
            <div className="contact-us-divider"></div>
            <h4>Phone Number</h4>
            <p>+20 123-456-7890</p>
            <div className="contact-us-divider"></div>
            <h4>Email</h4>
            <p>mylibrary@library.com</p>
        </div>
    );
};
