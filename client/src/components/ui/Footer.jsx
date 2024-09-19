import React from 'react'
import {Mail,Phone,Facebook,Twitter,Instagram,Linkedin} from 'lucide-react';
const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">AnswerAI</h3>
              <p>Revolutionizing Plagiarism Detection with our AI Powered-Tool</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
              <p className="flex items-center mb-2"><Mail className="mr-2" size={18} /> info@answerai.com</p>
              <p className="flex items-center"><Phone className="mr-2" size={18} /> +1 (123) 456-7890</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400"><Facebook /></a>
                <a href="#" className="hover:text-blue-400"><Twitter /></a>
                <a href="#" className="hover:text-blue-400"><Instagram /></a>
                <a href="#" className="hover:text-blue-400"><Linkedin /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 AnswerAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
