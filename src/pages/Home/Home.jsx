import React from "react"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import TablaBalance from "../../components/TablaBalance/TablaBalance"


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