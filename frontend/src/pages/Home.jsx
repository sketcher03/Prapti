import React from 'react';
import "../css/home.css";

//home page components
import Hero from '../components/Home/Hero'
import About from '../components/Home/About';
import ClientHowTo from '../components/Home/ClientHowTo';
import Reviews from '../components/Home/Reviews';
import TalentHowTo from '../components/Home/TalentHowTo';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className='home'>
      <Hero />
      <About />
      <ClientHowTo />
      <Reviews />
      <TalentHowTo />
    </div>
  )
}

export default Home;