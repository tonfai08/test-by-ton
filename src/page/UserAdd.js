
import Layout from "../component/Layout";
import { Form, Input, Select, Button ,Typography,Row,Col,message} from 'antd';
import React, { useState, useEffect } from "react";
import axios from "axios";

const { Title } = Typography;

const User = (prop) => {
  const p_link = ["User"];
  const [data, setData] = useState(null);
  const baseURL ="http://localhost:5000/";
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };


  
  const onFinish = (values) => {
    console.log('Success:', values);

    const myJSON = JSON.stringify(values);
    console.log('myJSON:', myJSON);

    axios.post(`${baseURL}emp`,
      values
    ).then((respons) => {
      setData(respons.data)
    })
      message.error('Success');
  };

  return (
    <>
      <Layout current={p_link} >
          <Title level={2}>Add User</Title>
          <Row gutter={16}>
            <Col span={6}>
              <Form {...layout} name="nest-messages" onFinish={onFinish}>
                <Form.Item name="email" label="Email" rules={[{type:"email",required:true  }]} >
                  <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                 <Input.Password />
                </Form.Item>
                <Form.Item name="first_name" label="Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item  name="position" label="ตำแหน่ง">
                  <Select>
                    <Select.Option value="Dev">Dev</Select.Option>
                    <Select.Option value="Ux/Ui">Ux/Ui</Select.Option>
                    <Select.Option value="Sa">Sa</Select.Option>
                    <Select.Option value="Admin">Admin</Select.Option>
                    <Select.Option value="Boss">เขาคือประธานบริษัท</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="role" label="Role">
                  <Select>
                  <Select.Option value="Admin">Admin</Select.Option>
                    <Select.Option value="User">User</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>

        
      </Layout>
   </>
  )
}


export default User