import { React, useState, useEffect } from 'react'
import theme from './theme'
import { ThemeProvider, CssBaseline, Grid } from '@material-ui/core' //(themeprovider)let us to use the theme which we have created, (Cssbaseline) brings in the standard styling format from material Ui, removes default margins from all the browsers, set box-sizing to border-box
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './Components/Home'
import Bookmarks from './Components/Bookmarks'
import Definition from './Components/Definition'

const App = () => {

  const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks')) || {});

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = (word, definitions) => setBookmarks(oldBookmarks => ({
    ...oldBookmarks,
    [word]: definitions
  }))

  const removeBookmark = word => setBookmarks(oldBookmarks => {
    const temp = { ...oldBookmarks };
    delete temp[word];
    return temp;
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ p: 2, mt: { xs: 0, sm: 2 } }} justifyContent="center">
        <Grid item xs={12} sm={8} md={5} lg={3} >  {/* xs prop for fixing the space allocated for the grid display */}
          <Router>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/bookmarks" >
              <Bookmarks bookmarks={bookmarks} />
            </Route>
            <Route path="/search/:word">
              <Definition bookmarks={bookmarks} addBookmark={addBookmark} removeBookmark={removeBookmark} />
            </Route>
          </Router>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App