import React, { Component } from "react";
import { Routes, Route} from "react-router-dom";
import Palette from "./Palette";
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<h1>PALATTE LIST GOES HERE</h1>}/>
        <Route path="/palette/:id" element={<h1>INDIVIDUAL PALETTE</h1>}/>
      </Routes>
      // <div>
      //   <Palette palette={generatePalette(seedColors[4])}/>
      // </div>
    );
  }
}

export default App;
