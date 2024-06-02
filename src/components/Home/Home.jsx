import React from "react"
import Navbar from "../Navbar/Navbar"
import TablaBalance from "../TablaBalance/TablaBalance"
import Footer from "../Footer/Footer"


function Home() {
  

  return (
    <div style={{background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)'}}>
      
      <Navbar/>
      <div style={{background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)'}}>
        <TablaBalance/>
        <Footer/>
      </div>
     
    </div>
  )
}

export default Home