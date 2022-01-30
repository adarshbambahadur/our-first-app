import React, { Component } from "react";
import { Switch, Route} from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.findPalette = this.findPalette.bind(this);
  }
  
  findPalette(id) {
    return seedColors.find(function(palette) {
      console.log(palette.id === id);
      return palette.id === id;
    })
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={(routeProps) => 
          <PaletteList palettes={seedColors} {...routeProps}/>
        }/>
        <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>}/>
        <Route exact path="/palette/:paletteId/:colorId" render={() => <h1>COLOR</h1>}/>
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedColors[4])}/>
      // </div>
    );
  }
}

export default App;
