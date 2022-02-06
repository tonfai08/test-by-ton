import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import { Typography,Row,Col,Table, Button,Modal,Form,Input,Select,message } from 'antd';
import axios from "axios";
import { Link,useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Page = (prop) => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [editUser, setEditUser] = useState(undefined);
  const p_link = ["User"];
  const baseURL ="http://localhost:5000/";
  const [ form ] = Form.useForm();

  const { Title } = Typography;
  const EmpGetAll = () =>{
    axios.get(`${baseURL}emp`).then((respons) => {
        setData(respons.data)
    })
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const showModal = (t) =>{
    setEditUser(t);
    form.setFieldsValue(t)
    //console.log(editUser);
  }

  const onFinish = (values) => {
    
    console.log('values:', values);
    const myJSON = JSON.stringify(values);
  // console.log('myJSON:', myJSON);

    axios.put(`${baseURL}emp/${values._id}`,
      values
    ).then((respons) => {
      console.log(respons)
    })
      message.error('Success');
      setEditUser(undefined);
      EmpGetAll();
  };
  const checkToken = () => {
    const token = localStorage.getItem('token');
    console.log('token',token)
    if(!token){
      history.push("/login");
    }
   };
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'first_name',
      dataIndex: 'first_name',
    },
    {
      title: 'last_name',
      dataIndex: 'last_name',
    },
    {
      title: 'role',
      dataIndex: 'role',
    },
    {
      title: 'position',
      dataIndex: 'position',
    },
    {
      title: 'create_date',
      dataIndex: 'create_date',
    },
    {
      title: 'Action',
      key: '_id',
      width: 100,
      render: (t,r) => <a onClick={() => showModal(t)}>Edit</a>,
    },

  ];

    useEffect(() => {
      EmpGetAll();
      checkToken();
    }, []);
console.log(data)
  return (
    <>
      <Layout current={p_link} >
        <Row gutter={16} justify="space-between">
            <Col span={12}>
              <Title level={2}>User
              </Title>
            </Col>
            <Col span={12}>
              <Link  to="/user/new"><Button type="primary">+ Add User</Button></Link>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Table 
                columns={columns}
                dataSource={data} 
              />
            </Col>
          </Row>
      </Layout>
      {editUser !== undefined ?
      <Modal title="Edit" visible={true} onOk={() => setEditUser(undefined)} onCancel={() => setEditUser(undefined)}>
        <Form {...layout} form={form} name="nest-messages" onFinish={onFinish}>
                <Form.Item name="email" label="Email" defaultValue={editUser.email} rules={[{type:"email",required:true  }]} >
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
   </>
  );
};


export default Page;