import { Tabs } from 'antd'
import Attributes from './attributes'
import Details from './details'

export type InfoNFTProps = { symbol: string; mintAddress: string }

const InfoNFT = ({ symbol, mintAddress }: InfoNFTProps) => {
  return (
    <Tabs defaultActiveKey="Attributes" style={{ height: 210 }}>
      <Tabs.TabPane tab="Attributes" key="Attributes">
        <Attributes symbol={symbol} mintAddress={mintAddress} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Details" key="Details">
        <Details symbol={symbol} mintAddress={mintAddress} />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default InfoNFT
