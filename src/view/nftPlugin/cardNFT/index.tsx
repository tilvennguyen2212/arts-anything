import { useSelector } from 'react-redux'

import { Avatar, Col, Row, Space, Typography } from 'antd'
import ImageNFT from './imageNFT'

import { AppState } from 'model'
import SolLogo from 'static/images/sol-logo.svg'
import CollectionSocial from 'view/collections/collectionSocial'

export type CardNFTProps = { symbol: string; mintAddress: string }

const CardNFT = ({ symbol, mintAddress }: CardNFTProps) => {
  const {
    collections: {
      [symbol]: { name: collectionName },
    },
    listing: {
      [symbol]: { [mintAddress]: nft },
    },
    metadata: { [mintAddress]: metadata },
  } = useSelector((state: AppState) => state)
  const {
    price,
    extra: { img },
  } = nft
  const { name, image } = metadata || {}

  return (
    <Row gutter={[16, 16]} wrap={false}>
      <Col>
        <ImageNFT src={img || image} size={87} />
      </Col>
      <Col flex="auto">
        <Row gutter={[4, 4]}>
          <Col span={24}>
            <Row gutter={[4, 4]} align="middle" wrap={false}>
              <Col flex="auto">
                <Typography.Text className="caption" type="secondary">
                  {collectionName}
                </Typography.Text>
              </Col>
              <Col>
                <CollectionSocial symbol={symbol} />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Space direction="vertical" size={0}>
              <Typography.Title level={5}>{name}</Typography.Title>
              <Space size={4}>
                <Avatar
                  shape="square"
                  src={SolLogo}
                  size={24}
                  style={{ padding: 3 }}
                />
                <Typography.Title level={3}>{price}</Typography.Title>
              </Space>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default CardNFT
