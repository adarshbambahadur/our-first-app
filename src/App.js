import React, { Component } from "react";
import Pallette from "./Pallette";
import seedColors from './seedColors';

class App extends Component {
  render() {
    return (
      <div>
        <Pallette {...seedColors[4]}/>
      </div>
    );
  }
}

export default App;
