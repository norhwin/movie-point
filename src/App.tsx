
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import MainContent from './pages/MainContent/MainContent'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SpotlightSection from './components/SpotlightSection/SpotlightSection'


function App() {
  const [findCard,setFindCard] = useState("");
  
  return (
    <div>
        <Header findText={findCard} setFindText={setFindCard}/>
      
        
        <Routes>
          <Route path='/' element={<MainContent findCard={findCard}/>} />
          <Route path= '/movie' element={<SpotlightSection findCard = {findCard} />}/>
        </Routes>
        
        <Footer/>  

    </div>
  )
}

export default App