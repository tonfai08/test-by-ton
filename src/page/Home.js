
import Layout from "../component/Layout";
import { Typography } from 'antd';
import {  useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {jsonwebtoken} from "jsonwebtoken"
const { Title } = Typography;

const Home = () => {
  var jwt = require("jsonwebtoken");
  const token = localStorage.getItem('token');
  const p_link = ["Home"];
  const history = useHistory();
  var decode1 = jwt.decode(token);
  console.log('decode1',decode1)
  const checkToken = () => {
    console.log('token',token)
    if(!token){
      history.push("/login");
    }
   };
   useEffect(() => {
    checkToken();
  });
  return (
    <>
      <Layout current={p_link} > 
          <Title level={2}>Home</Title>
      </Layout>
   </>
  )
}


export default Home