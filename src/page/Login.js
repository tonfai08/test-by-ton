
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row,Card,Col, Form, Input, Button, message } from 'antd';
import { Link, useHistory } from "react-router-dom";


const Home = () => {
  const history = useHistory();
  const [data, setData] = useState({'status': 'error'});
  const baseURL ="http://localhost:5000/";


  const callAPI = async (values) =>{
    await axios.post(`${baseURL}auth`,
      values
    ).then((respons) => {
      console.log('data',respons.data);
      setData(respons.data)
    })
  }
  const onFinish = (values) => {
   // console.log('data',values);
    callAPI(values);
    console.log('responsData',data);
   if(data.status === 'error')
    {
      message.error(data.detail)
    }
    else{
      message.success(data.detail)
      localStorage.setItem('token',data.detail);
    }
  };
  const checkToken = (values) => {
    const token = localStorage.getItem('token');
    console.log('token',token)
    if(token){
      history.push("/");
    }
   };
  useEffect(() => {
    checkToken();
  }, [data]);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Row justify="center">
        <Col span={8}>
          <Card>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submitt
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
   </>
  )
}


export default Home