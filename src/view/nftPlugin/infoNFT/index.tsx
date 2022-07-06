import { Tabs } from 'antd'
import Attributes from './attributes'
import Details from './details'

const InfoNFT = () => {
  return (
    <Tabs defaultActiveKey="Attributes" style={{ height: 210 }}>
      <Tabs.TabPane tab="Attributes" key="Attributes">
        <Attributes />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Details" key="Details">
        <Details />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default InfoNFT
