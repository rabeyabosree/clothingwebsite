import React from 'react'
import Navbar from './../../../components/common/Navbar';
import NewArrival from './NewArrival';
import PopulerProducts from './PopulerProducts';
import Sales from './Sales';
import Featured from './Featured';
import Testimonlas from './Testimonlas';
import Footer from './../../../components/common/Footer';
import Banner from './../../../components/common/Banner';
import Categories from './Categories';

function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Categories />
      <NewArrival />
      <PopulerProducts />
      <Sales />
      <Featured />
      <Testimonlas />
      <Footer />
    </div>
  )
}

export default Home