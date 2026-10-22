
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import MainContent from './components/MainContent/MainContent'
import { useState } from 'react'





function App() {
  const [findCard,setFindCard] = useState("");
  
  return (
    <div>
        <Header findText={findCard} setFindText={setFindCard}/>
      
        <MainContent findCard = {findCard}/>
        <Footer/>
        
        

      

    </div>
  )
}

export default App