import React from "react";

import Home from "./pages/Home";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const App = () => {
  return (
    <div>
      
      <div className="max-w-[90vw] m-auto ">
        <Navbar />
        <Home />
      </div>
    </div>
  );
};

export default App;
