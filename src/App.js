
import './App.css';
import { Link,Route,Switch } from 'react-router-dom';
import Leave from './page/Leave';
import Home from './page/Home';
import User from './page/User';
import Login from './page/Login';
import UserAdd from './page/UserAdd';
import 'antd/dist/antd.css';
//import Test from './component/test';

const Prodcut = () => (
  <div>
    Prodcut
  </div>
)

function App() {
  return (

      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/leave"><Leave /></Route>
        <Route path="/login"><Login /></Route>
        <Route exact path="/user"><User /></Route>
        <Route path="/user/new"><UserAdd /></Route>
      </Switch>

  );
}

export default App;
