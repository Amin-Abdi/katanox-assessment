import React from "react";
import "./App.css";
import Layout from "antd/es/layout";
import { Content } from "antd/es/layout/layout";
import MainRouter from "./Router/mainRouter";
import Navbar from "./Components/common/navbar";

function App() {
  return (
    <Layout className='layout' style={{ minHeight: "100vh" }}>
      <Content>
        <MainRouter />
      </Content>
    </Layout>
  );
}

export default App;
