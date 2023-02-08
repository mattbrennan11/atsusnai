import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages'
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  View,
  //AmplifySignOut
} from "@aws-amplify/ui-react";

function App({ signOut }) {
  return (
    <View className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        
      </Routes>
    </Router>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);