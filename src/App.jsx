import React, { useContext, useState } from 'react';
import NavBar from './components/NavBar'
import Grid from '@material-ui/core/Grid'
import PeopleList from './components/PeopleList'
import Person from './components/Person'
import StoreContext from './store'

function App() {
  const [selected, setSelected] = useState()
  return (
    <StoreContext.Provider value={{ selected, setSelected }}>
      <div className="App">
        <NavBar />
        <Grid container>
          <Grid item md={4} lg={3}>
            <PeopleList />
          </Grid>
          <Grid item md={8} lg={9}>
            <Person />
          </Grid>
        </Grid>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
