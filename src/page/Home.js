
import Layout from "../component/Layout";
import { Typography } from 'antd';
import {  useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

const { Title } = Typography;

const Home = () => {
  const p_link = ["Home"];
  const history = useHistory();

  const checkToken = () => {
    const token = localStorage.getItem('token');
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