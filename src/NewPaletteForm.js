import React, { Component } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/styles';
import { ChromePicker } from "react-color";
import DraggableColorList from "./DraggableColorList";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const styles = theme => {
  
}

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false, currentColor: "#572a92", newName: "", colors: []};
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
  }
  
  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value => this.state.colors.every(
      ({ name }) => name.toLowerCase() !== value.toLowerCase()
    ));
    ValidatorForm.addValidationRule("isColorUnique", value => this.state.colors.every(
      ({ color }) => color !== this.state.currentColor
    ));
  }

  updateCurrentColor(newColor) {
    this.setState({currentColor: newColor.hex})
  }

  addNewColor() {
    const newColor = {color: this.state.currentColor, name: this.state.newName}
    this.setState({colors: [...this.state.colors, newColor], newName: ""});
  }

  handleChange(evt) {
    this.setState({newName: evt.target.value});
  }

  handleSubmit() {
    let newName = "New Test Palette";
    const newPalette = {paletteName: newName, id: newName.toLowerCase().replace(/ /g, "-"), colors: this.state.colors}
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }

  removeColor(colorName) {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }))
  }

  render() { 
  const {open, currentColor} = this.state;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color='default'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
          <Button variant='contained' color="primary" onClick={this.handleSubmit}>Save Palette</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider /> 
        <Typography variant='h4'>Design Your Palette</Typography>
        <div>
          <Button variant="contained" color="secondary">Clear Palette</Button>
          <Button variant="contained" color="primary">Random Color</Button>
        </div>
        <ChromePicker color={currentColor} onChangeComplete={this.updateCurrentColor}/>
        <ValidatorForm onSubmit={this.addNewColor}>
          <TextValidator value={this.state.newName} onChange={this.handleChange} validators={["required", "isColorNameUnique", "isColorUnique"]} errorMessages={["Enter a color name", "Color name must be unique","Color already used!"]}/>
          <Button variant='contained' type="submit" color="primary" style={{backgroundColor: currentColor}}>Add Color</Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList colors={this.state.colors} removeColor={this.removeColor} axis='xy' onSortEnd={this.onSortEnd}/>
      </Main>
    </Box>
  );
}
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);