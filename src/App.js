// import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';

const App=()=>{

  const apiKey=process.env.REACT_APP_NEWS_API
  const[progress,setProgress]=useState(0);


    return (

      <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />

<Switch>
  <Route exact path="/" ><News setProgress={setProgress}apiKey={apiKey} key="general" pageSize={5} category={'general'}/></Route>
  <Route exact path="/general" ><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={5} category={'general'}/></Route>
  <Route exact path="/health" ><News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={5} category={'health'}/></Route>
  <Route exact path="/sports" ><News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={5} category={'sports'}/></Route>
  <Route exact path="/science" ><News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={5} category={'science'}/></Route>
  <Route exact path="/buisness" ><News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={5} category={'buisness'}/></Route>
  <Route exact path="/technology" ><News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={5} category={'technology'}/></Route>
  <Route exact path="/entertainment" ><News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={5} category={'entertainment'}/></Route>
</Switch>
</Router>
    )

}

export default App;
