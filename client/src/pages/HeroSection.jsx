import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CoverDemo  from './CoverDemo';

function HeroSection() {
  return (
    <div className="min-h-screen flex pt-36 justify-center">
      <CoverDemo/>
    </div>
  )
}

export default HeroSection;