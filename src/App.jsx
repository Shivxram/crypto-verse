import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { Navbar, CryptoDetails, Cryptocurrencies, Home } from "./components";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      {/* Navbar Section */}
      <Navbar />

      {/* Main Content */}
      <Layout className="main">
        <div className="routes">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
          </Routes>
        </div>

        {/* Footer Section */}
        <footer className="footer">
          <h1 className="footer-heading">
            Beyond the Banks: The Rise of Cryptocurrency
          </h1>
        </footer>
      </Layout>
    </div>
  );
};

export default App;
