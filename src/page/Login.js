
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row,Card,Col, Form, Input, Button, message } from 'antd';


const Home = () => {

  const [data, setData] = useState(null);
  const baseURL ="http://localhost:5000/";


  const callAPI = (values) =>{
    axios.post(`${baseURL}auth`,
      values
    ).then((respons) => {
      setData(respons.data)
    })
  }
  const onFinish = (values) => {
    console.log('data',values);
    callAPI(values);
    console.log(data);
    if(data.status === 'error')
    {
      message.error(data.detail)
    }
    else{
      message.success(data.detail)
    }
  };
  useEffect(() => {

  }, []);
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