
import Layout from "../component/Layout";
import { Typography, Descriptions, Badge,Card } from 'antd';
import {  useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
const { Title } = Typography;

const Home = () => {
  const [user, setUser] = useState({});
  const checkToken = () => {
    if(!token){
      history.push("/login");
    }else{
      const token = localStorage.getItem('token');
       const decode1 = jwt.decode(token);
       setUser(decode1)
    }
   };
  const baseURL ="http://localhost:5000/";
  const [data, setData] = useState({});
  const [leave, setLeave] = useState({});
  var jwt = require("jsonwebtoken");
  const token = localStorage.getItem('token');
  const decode1 = jwt.decode(token);
  console.log(user.role) 
  const p_link = ["Home"];
  const history = useHistory();
   const callAPI =  async () =>{
     try{
        const {data} = await axios.get(`${baseURL}emp/${decode1.id}`,{
          headers:{
            token:token
          }
      }
     )
     setData(data);
     //console.log(data)
    } catch(error){
      console.log(error.message)
    }
   }
   const leaveAPI =  async () =>{
    try{
       const leave = await axios.get(`${baseURL}leave/${decode1.id}`,{
         headers:{
           token:token
         }
     }
    )
    //console.log('count',leave.data.length)
    const {leaveCount} = {leaveCount:leave.data.length}
    setLeave({leaveCount});
   } catch(error){
     console.log(error.message)
   }
  //console.log('datat',data)
  }
   useEffect(() => {
    checkToken();
    callAPI();
    leaveAPI();
  },[]);
  return (
    <>
      <Layout current={p_link} role={user.role}> 
          <Title level={2}>Profile</Title>
          <Card>
            <Descriptions title="Profile" bordered
             column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
            >
              <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
              <Descriptions.Item label="ชื่อ-นามสกุล">{`${data.first_name} ${data.last_name}`}</Descriptions.Item>
              <Descriptions.Item label="จำนวนวันลาทั้งหมด">{data.leaveDay === undefined ? "0":data.leaveDay}</Descriptions.Item>
              <Descriptions.Item label="จำนวนที่ลาไปแล้ว">{`${leave.leaveCount}`}</Descriptions.Item>
            </Descriptions>,
          </Card>
      </Layout>
   </>
  )
}


export default Home