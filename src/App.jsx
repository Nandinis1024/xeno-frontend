import './App.css'
import React from 'react';
import FilterCustomers from './FilterCustomers'
import Campaigns from './Campaigns'
import Campaign from './Campaign';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FilterCustomers />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/:id" element={<Campaign />} />
      </Routes>
    </Router>
  )
}

export default App
