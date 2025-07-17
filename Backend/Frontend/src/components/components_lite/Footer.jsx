import React from 'react'
import { Link } from 'react-router-dom';
import PrivacyPolicy from './PrivacyPolicy.jsx';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
        </p>
        <p className="flex justify-center gap-4 mt-2 font-bold">
          Powered by<a href="https://github.com/arpitsingh0311">Arpit Singh</a>
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <Link to={"/privacyPolicy"} className="hover:text-gray-400">
            Privacy Policy
          </Link>
          <Link to={"/tos"} className="hover:text-gray-400">
            Terms of Service
          </Link>
          <a
            href="https://mail.google.com/mail/?view=cm&to=arpit0316@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer