import React from 'react';
//import {BrowserRouter,Link,Route} from 'react-router-dom'
import 'antd/dist/antd.css';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
import NotFound from './Component/NotFound/NotFound';
import ApplicationModal from './Component/ApplicationForm/ApplicationModal';
import Applications from './Component/Aplications/Applications';



function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/"/>
        
        <Switch>
          <Route path="/" component={ApplicationModal} exact />
          <Route path="/admin" component={Applications} exact />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
