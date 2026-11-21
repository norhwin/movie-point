
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import MainContent from './pages/MainContent/MainContent'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Movie from './pages/Movie/Movie'
import MoviePage from './pages/MoviePage/MoviePage'



function App() {
  const [findCard,setFindCard] = useState("");
  
  return (
    <div>
        <Header findText={findCard} setFindText={setFindCard}/>
      
        
        <Routes>
          <Route path='/' element={<MainContent findCard={findCard}/>} />
          <Route path= '/movie' element={<Movie findCard = {findCard} />}/>

          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
        
        <Footer/>  

    </div>
  )
}

export default App