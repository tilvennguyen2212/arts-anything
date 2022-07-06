import { Tabs } from 'antd'
import Attributes from './attributes'
import Details from './details'

import { NFTCardProps } from 'view/collection/nftCard'

const InfoNFT = ({ symbol, mintAddress }: NFTCardProps) => {
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
