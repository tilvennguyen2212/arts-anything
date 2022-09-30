import { Tabs } from 'antd'
import { useMemo } from 'react'
import Attributes from './attributes'
import Details from './details'

export type InfoNFTProps = {
  symbol: string
  mintAddress: string
}

const InfoNFT = ({ symbol, mintAddress }: InfoNFTProps) => {
  const items = useMemo(
    () => [
      {
        label: 'Attributes',
        key: 'Attributes',
        children: <Attributes mintAddress={mintAddress} />,
      },
      {
        label: 'Details',
        key: 'Details',
        children: <Details symbol={symbol} mintAddress={mintAddress} />,
      },
    ],
    [symbol, mintAddress],
  )

  return (
    <Tabs defaultActiveKey="Attributes" style={{ height: 210 }} items={items} />
  )
}

export default InfoNFT
