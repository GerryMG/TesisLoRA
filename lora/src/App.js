import './App.css';
import Dashboard from './pages/base/Dashboard';
import React from 'react';
import { useKeycloak, ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
  }

  handleEvent(event, error) {
    console.log('on key cloak event', event, error);
    if(event && event === "onReady" && keycloak.hasRealmRole("administratorLora") ){
      this.setState({ready: true});
    }
  }

  render() {
    return (
      <ReactKeycloakProvider
        authClient={keycloak}
        onEvent={this.handleEvent.bind(this)}
        onTokens={({ token }) => {
          // dispatch(setToken(token));
          console.log("yeah token");
          console.log(token);
        }}
        initOptions={{ onLoad: 'login-required' }}>
        {this.state.ready ?
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
          :
          <div>
            <div>Access denied</div>
            <button
              type="button"
              className="text-blue-800"
              onClick={() => keycloak.logout()}
            >
              Logout
            </button></div>
        }

      </ReactKeycloakProvider>

    )
  };
}

export default App;
