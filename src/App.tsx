
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import MainContent from './pages/MainContent/MainContent'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SpotlightSection from './components/SpotlightSection/SpotlightSection'
import Movie from './pages/Movie/Movie'


function App() {
  const [findCard,setFindCard] = useState("");
  
  return (
    <div>
        <Header findText={findCard} setFindText={setFindCard}/>
      
        
        <Routes>
          <Route path='/' element={<MainContent findCard={findCard}/>} />
          <Route path= '/movie' element={<Movie findCard = {findCard} />}/>
        </Routes>
        
        <Footer/>  

    </div>
  )
}

export default App