import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import { Table,Input,Tabs,Typography,Row,Col,Switch,Form,Modal, DatePicker, Select, Button ,message, Card,Badge } from 'antd';
import { Link,useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import axios from "axios";
import moment from "moment";

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Title } = Typography;

const Leave = () => {
  const [editUser, setEditUser] = useState(undefined);
  const baseURL ="http://localhost:5000/";
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const p_link = ["leaveAdmin"];
  const history = useHistory();
  const [leave, setLeave] = useState(null);
  const [leaveTrue, setLeaveTrue] = useState(null);

  const [ form ] = Form.useForm();
  var jwt = require("jsonwebtoken");
  const token = localStorage.getItem('token');
  var decode1 = jwt.decode(token);

  const showModal = (t) =>{
    setEditUser(t);
    form.setFieldsValue(t)
    //console.log(editUser);
  }
  const leaveAPI =  async () =>{
    try{
       const leave = await axios.get(`${baseURL}leave/wait`,{
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
  const leaveTrueAPI =  async () =>{
    try{
       const leavetrue = await axios.get(`${baseURL}leave/true`,{
         headers:{
           token:token
         }
     }
    )
    setLeaveTrue(leavetrue.data);
    console.log('leaveTrue',leaveTrue)
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
  const FullName = (r) =>{
    return r.name[0].first_name+" "+r.name[0].last_name;
  }
  const dayMoment = (day) =>{
      var arrayLength = day.length;

      const day1 = moment(day[0]).format('YYYY/MM/DD');
      const day2 = moment(day[arrayLength-1]).format('YYYY/MM/DD');

      if(day1 === day2){
        return day1;
      }
      else{
        return day1+"-"+day2;
      }

  }
  const onFinish = (values) => {
    if(values.approve === undefined){
      values.approve = true;
    }
    console.log('values',values)
    values.approver={empID:decode1.id,first_name:decode1.first_name,last_name:decode1.last_name};
    axios.put(`${baseURL}leave/${values._id}`,
    values
  ).then((respons) => {
    console.log(respons)
  })
    message.error('Success');
    setEditUser(undefined);
    };
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

  const checkToken = () => {
    const token = localStorage.getItem('token');
    console.log('token',token)
    if(!token){
      history.push("/login");
    }
   };

  const columns = [
    {
      title: 'ประเภทการลา',
      dataIndex: 'leave_type',
      render: (t, r, i) => 
       <>{leaveType(t)}</>,
    },
    {
      title: 'ผู้ลา',
      dataIndex: 'empId',
      render: (t, r, i) => 
       <>
        {FullName(r)}
       </>,
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
      dataIndex: 'approve',
      render: (t, r, i) => 
      <>{appr(t)}</>,
    },
    {
      title: 'วันที่ลา',
      dataIndex: 'create_date',
      render: (t, r, i) => 
      <>{dateCreate(t)}</>,
    },
    {
      title: 'Action',
      key: '_id',
      width: 100,
      render: (t,r) => <a onClick={() => showModal(t)}>Edit</a>,
    },

  ];



   useEffect(() => {
    leaveAPI();
    leaveTrueAPI();
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
         
          <div style={{marginTop:"10px"}}/>
          <Row gutter={16}>
            <Col span={24}>
            <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="รอการอนุมัติ" key="1">
                <Table 
                  columns={columns}
                  dataSource={leave} 
                />
              </TabPane>
              <TabPane tab="ทำรายการไปแล้ว" key="2">
                <Table 
                  columns={columns}
                  dataSource={leaveTrue} 
                />
              </TabPane>
            </Tabs>
            </Card>
            </Col>
          </Row>

      {editUser !== undefined ?
      <Modal title="อนุมัติการลา" footer={false} visible={true} onOk={() => setEditUser(undefined)} onCancel={() => setEditUser(undefined)}>
        <Form {...layout} form={form} name="nest-messages" onFinish={onFinish}>
                  <Form.Item name="note" label="เหตุผลในการลา">
                    <TextArea rows={4} disabled={true} />
                  </Form.Item>
                  <Form.Item label="อนุมัติ" name="approve" >
                  <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked
                    />
                  </Form.Item>
                  <Form.Item name="noteAdmin" label="ข้อความ">
                    <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item name="_id" label="Id" hidden={true}  rules={[{ required: true}]}>
                    <Input />
                  </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
      </Modal>
      :""}

      </Layout>
   </>
  )
}


export default Leave