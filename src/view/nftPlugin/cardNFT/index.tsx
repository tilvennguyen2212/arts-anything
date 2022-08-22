import { useSelector } from 'react-redux'

import { Avatar, Col, Row, Space, Spin, Typography } from 'antd'
import ImageNFT from './imageNFT'

import { AppState } from 'model'
import CollectionSocial from 'components/collectionCard/social'
import { useCollection } from 'hooks/useCollection'
import { useMetadata } from 'hooks/useMetadata'
import SolLogo from 'static/images/sol-logo.svg'

export type CardNFTProps = { symbol: string; mintAddress: string }

const CardNFT = ({ symbol, mintAddress }: CardNFTProps) => {
  const {
    price,
    extra: { img },
  } = useSelector((state: AppState) => state.listing[symbol][mintAddress])
  const {
    loading,
    collection: { name: collectionName },
  } = useCollection(symbol)
  const { name, image } = useMetadata(mintAddress)

  return (
    <Spin spinning={loading}>
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
    </Spin>
  )
}

export default CardNFT
