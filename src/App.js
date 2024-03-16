import React, { Component } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';
import ImageResults from './components/image-results/ImageResults';
import NavBar from './components/navbar/NavBar';
import Search from './components/search/Search';

const theme = createTheme ({

});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <NavBar />
          <Search />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
