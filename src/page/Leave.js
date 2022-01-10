import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import { Typography,Row,Col, Button,Calendar } from 'antd';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
const { Title } = Typography;
const Leave = () => {
  const p_link = ["Leave"];

  function getListData(value) {
    let listData;
    switch (moment( value, 'MM-DD-YYYY HH:mm:ss',true).format("YYYY-MM-DD")) {
      case "2021-12-01":
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }


  function dateCellRender(value) {
    // const listData = getListData(value);
    //console.log("dataCell",moment( value, 'MM-DD-YYYY HH:mm:ss',true).format("YYYY-MM-DD"))
    const day = moment( value, 'MM-DD-YYYY HH:mm:ss',true).format("YYYY-MM-DD");
    let leave_text;
    if(day === "2021-12-20") {
       leave_text = "ลา";
    }
    else {
       leave_text = "";
    }
    return <div>{leave_text}</div>;
  }
  function onFullRender(date){
    const day = date.day();
    let style;
    if(day === 1) {
     style = { border: "1px solid #d9d9d9"};
    }
    else {
     style = { border: "1px solid red"};
    }
    return <div style={style}>{day}</div>;
  }
  return (
    <>
      <Layout current={p_link} >
        <Row gutter={16} justify="space-between">
            <Col span={12}>
              <Title level={2}>Leave
              </Title>
            </Col>
            <Col span={12}>
              <Link  to="#"><Button type="primary">+ ลา</Button></Link>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Calendar dateCellRender={dateCellRender}/>
            </Col>
          </Row>
      </Layout>
   </>
  )
}


export default Leave