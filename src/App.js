import logo from './logo.svg';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import {Home} from './Components/Home/index'
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <ConfigProvider>
          <Route path="/" component={Home} exact />
        </ConfigProvider>
      </Switch>
    </Router>
  );
}

export default App;
