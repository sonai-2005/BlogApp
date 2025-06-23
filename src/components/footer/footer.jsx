import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { useSelector } from 'react-redux'

function Footer() {
    const status = useSelector((state) => state.auth.status);
    return (
        <section className="bg-gray-400 border-t border-gray-500 py-4 text-sm">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-y-6">
      
      <div className="sm:w-1/2 lg:w-5/12">
        {status && (
          <div className="text-center sm:text-left text-gray-700 mb-2 font-medium text-base">
            i am a beginner so ignore mistakes 😭
          </div>
        )}
        <p className="text-gray-600 text-center sm:text-left">
          &copy; 2025. All Rights Reserved by Saptarshi.
        </p>
      </div>

      <div className="sm:w-1/2 md:w-auto">
        <h3 className="text-xs uppercase font-semibold text-gray-500 mb-2">Company</h3>
        <ul className="space-y-1">
          <li><Link to="/" className="hover:text-gray-700">Features</Link></li>
          <li><Link to="/" className="hover:text-gray-700">Pricing</Link></li>
          <li><Link to="/" className="hover:text-gray-700">Affiliate Program</Link></li>
          <li><Link to="/" className="hover:text-gray-700">Press Kit</Link></li>
        </ul>
      </div>

      <div className="sm:w-1/2 md:w-auto">
        <h3 className="text-xs uppercase font-semibold text-gray-500 mb-2">Support</h3>
        <ul className="space-y-1">
          <li><Link to="/" className="hover:text-gray-700">Account</Link></li>
          <li><Link to="/" className="hover:text-gray-700">Help</Link></li>
          <li><Link to="/" className="hover:text-gray-700">Contact Us</Link></li>
          <li><Link to="/" className="hover:text-gray-700">Customer Support</Link></li>
        </ul>
      </div>

      <div className="sm:w-1/2 md:w-auto">
        <h3 className="text-xs uppercase font-semibold text-gray-500 mb-2">Legals</h3>
        <ul className="space-y-1">
          <li><Link to="/" className="hover:text-gray-700">Terms & Conditions</Link></li>
          <li><Link to="/" className="hover:text-gray-700">Privacy Policy</Link></li>
          <li><Link to="/" className="hover:text-gray-700">Licensing</Link></li>
        </ul>
      </div>
      
    </div>
  </div>
</section>


    )
}

export default Footer