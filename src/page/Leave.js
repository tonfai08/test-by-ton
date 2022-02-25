import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import { Table,Input,Tabs,Typography,Row,Col,Calendar,Form, DatePicker, Select, Button ,message, Card,Badge } from 'antd';
import { Link,useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import moment from "moment";

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Title } = Typography;

const Leave = () => {
  const baseURL ="http://localhost:5000/";
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const p_link = ["Leave"];
  const history = useHistory();
  const [data, setData] = useState(null);
  const [leave, setLeave] = useState(null);
  const [userId, setUserId] = useState(null);
  var jwt = require("jsonwebtoken");
  const token = localStorage.getItem('token');
  var decode1 = jwt.decode(token);
  const setUser = () =>{
    var decode1 = jwt.decode(token);
    setUserId(decode1);
  }
  const leaveAPI =  async () =>{
    try{
       const leave = await axios.get(`${baseURL}leave/${decode1.id}`,{
         headers:{
           token:token
         }
     }
    )
    
    setLeave(leave.data);
    console.log('leave',leave)
   } catch(error){
     console.log(error.message)
   }
  }
  const leaveType = (type) =>{
    const intType = parseInt(type);
    if(intType === 1){
      return "ลากิจ";
    } 
    else if(intType === 2){
      return "ลาป่วย";
    }
    else if(intType === 3){
      return "ลาบวช";
    }
    else {
      return "ลาตุ้ย";
    }
  }
  const dayMoment = (day) =>{
      var arrayLength = day.length;
      // for (var i = 0; i < arrayLength; i++) {
      //     console.log(day[i]);
      //     return day[i];
      // }
      const day1 = moment(day[0]).format('YYYY/MM/DD');
      const day2 = moment(day[arrayLength-1]).format('YYYY/MM/DD');
      //console.log('dayy',day2);
      if(day1 === day2){
        return day1;
      }
      else{
        return day1+"-"+day2;
      }
     // return day[arrayLength];
  }
    const daySum = (day) =>{
      var arrayLength = day.length;
      // for (var i = 0; i < arrayLength; i++) {
      //     console.log(day[i]);
      //     return day[i];
      // }
      const day1 = moment(day[0]);
      const day2 = moment(day[arrayLength-1]);
      //console.log('moment',moment(day1).diff(day2, 'days'));
        return moment(day2).diff(day1, 'days')+1 ;

  }
  const dateCreate = (day) =>{
    const day1 = moment(day).format('YYYY/MM/DD');

      return day1 ;

}
const appr = (approve) =>{
  if(approve === "true"){
    return "อนุมัติ";
  }
  else if(approve === "false"){
    return "ไม่อนุมัติ";
  }
  else{
    return "รออนุมัติ";
  }

}


  // function dateCellRender(value) {
  //   const day = moment( value, 'MM-DD-YYYY HH:mm:ss',true).format("YYYY-MM-DD");
  //   let leave_text;
  //   if(day === "2021-12-20") {
  //      leave_text = "ลา";
  //   }
  //   else {
  //      leave_text = "";
  //   }
  //   return <div>{leave_text}</div>;
  // }
 
  const checkToken = () => {
    const token = localStorage.getItem('token');
    console.log('token',token)
    if(!token){
      history.push("/login");
    }
   };

   const onFinish = (values) => {
    //console.log('Success:', values);

    const myJSON = JSON.stringify(values);
    //console.log('myJSON:', myJSON);
    values.empId=decode1.id;
    axios.post(`${baseURL}leave`,
      values,{
        headers:{
          token:token
        }
      },
    ).then((respons) => {
      setData(respons.data)
    })
      leaveAPI();
      message.error('Success');
  };
  const columns = [
    {
      title: 'ประเภทการลา',
      dataIndex: 'leave_type',
      render: (t, r, i) => 
       <>{leaveType(t)}</>,
    },
    {
      title: 'วันที่',
      dataIndex: 'date_leave',
      render: (t, r, i) => 
       <>{dayMoment(t)}</>,
    },
    {
      title: 'จำนวนวันที่ลา',
      dataIndex: 'duration',
      render: (t, r, i) => 
       <>{t}</>,
    },
    {
      title: 'การอนุมัติ',
      dataIndex: 'approver',
      render: (t, r, i) => 
      <>{appr(t)}</>,
    },
    {
      title: 'วันที่ลา',
      dataIndex: 'create_date',
      render: (t, r, i) => 
      <>{dateCreate(t)}</>,
    },
    // {
    //   title: 'Action',
    //   key: '_id',
    //   width: 100,
    //   render: (t,r) => <a>Edit</a>,
    // },

  ];

 
 
  const dateCellRendert = (value) => {
    const listData = getListData(value);


    
    // return listData.map(item => {
    //   console.log(item.type);
    //   if(item.type === undefined ){
    //     return null;
    //   }
    //   return (
    //     <ul className="events">
    //        <li key={item.content}>
    //          <Badge status={item.type} text={item.content} />
    //        </li>
    //     </ul>
    //   )
    // })
      return (
        <div className="new-line">
         {listData.map(item => (
          <Badge status={item.type} text={item.content} />
          
          ))}
        </div>
        
      );
    
  }                       
 
  const holiday = [
    { day: '2022/02/14', content: 'วาเลนไท', type: 'error' },
    { day: '2022/02/14', content: 'วาเลนไท', type: 'success' },
    { day: '2022/03/01', content: 'อยากหยุด', type: 'error'  },
    { day: '2022/03/25', content: 'ก็จะหยุดอะ', type: 'error'  },
  ];
  const getListData = (value) => {
    let listData;
    listData = holiday.filter(holiday => holiday.day === moment(value).format('YYYY/MM/DD'));
    return listData;
   
    }

   useEffect(() => {
    setUser();
    leaveAPI();
    checkToken();
  },[]);
  return (
    <>
      <Layout current={p_link} >
        <Row gutter={16} justify="space-between">
            <Col span={12}>
              <Title level={2}>Leave
              </Title>
            </Col>
            <Col span={12}>
              {/* <Link  to="#"><Button type="primary">+ ลา</Button></Link> */}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Card>
              
              <Form {...layout} name="nest-messages" onFinish={onFinish}>
                  <Form.Item  name="leave_type" label="ประเภทการลา">
                    <Select>
                      <Select.Option value="1">ลากิจ</Select.Option>
                      <Select.Option value="2">ลาป่วย</Select.Option>
                      <Select.Option value="3">ลาไปเรื่อย</Select.Option>
                      <Select.Option value="4">ลาตุ่ย</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="date_leave" label="วันที่ลา">
                   <RangePicker />
                  </Form.Item>
                  <Form.Item name="note" label="เหตุผลในการลา">
                    <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                      ส่ง
                    </Button>
                  </Form.Item>
                </Form>
                  
              </Card>
            </Col>
          </Row>
          <div style={{marginTop:"10px"}}/>
          <Row gutter={16}>
            <Col span={24}>
            <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Table" key="1">
                <Table 
                  columns={columns}
                  dataSource={leave} 
                />
              </TabPane>
              <TabPane tab="Calendar" key="2">
                <Calendar dateCellRender={dateCellRendert} />
              </TabPane>
            </Tabs>
            </Card>
            </Col>
          </Row>
      </Layout>
   </>
  )
}


export default Leave