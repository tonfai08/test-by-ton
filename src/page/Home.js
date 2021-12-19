
import Layout from "../component/Layout";
import { Typography } from 'antd';
const { Title } = Typography;
const Home = () => {
  const p_link = ["Home"];

  return (
    <>
      <Layout current={p_link} > 
          <Title level={2}>Home</Title>
      </Layout>
   </>
  )
}


export default Home