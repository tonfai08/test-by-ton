
import Layout from "../component/Layout";
import { Typography } from 'antd';
const { Title } = Typography;
const Leave = () => {
  const p_link = ["Leave"];

  return (
    <>
      <Layout current={p_link} >
        <>
          <Title level={2}>Leave</Title>
        </>
      </Layout>
   </>
  )
}


export default Leave