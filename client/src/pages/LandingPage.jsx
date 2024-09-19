import React from 'react'
import Header from './Header'
import { Navbar } from './Navbar';
import Pricing from './Pricing'
import { Features } from '../components/ui/Features';
import Footer from '../components/ui/Footer';
import HeroSection from './HeroSection';

function LandingPage() {
  return (
    <>
      <Header />
      {/* <Navbar/> */}
      <main>
        <section id="landing">
          <HeroSection />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id='pricing'>
          <Pricing />
        </section>
      </main>
      <Footer/>
    </>
  )
}

export default LandingPage
