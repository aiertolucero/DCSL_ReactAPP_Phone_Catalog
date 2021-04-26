import './App.css';
import Navigation from './components/Navigation';
import Phones from './components/Phones';
import ManagePhones from './components/ManagePhones';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={Phones} />
        <Route path="/phones" component={Phones} />
        <Route path="/manage" component={ManagePhones} />
      </Switch>
    </Router>
  );
}

export default App;
