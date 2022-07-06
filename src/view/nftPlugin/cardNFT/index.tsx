import { useSelector } from 'react-redux'

import { Avatar, Button, Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import ImageNFT from './imageNFT'
import SolLogo from 'static/images/sol-logo.svg'

import { AppState } from 'model'
import { NFTCardProps } from 'view/collection/nftCard'

const CardNFT = ({ symbol, mintAddress }: NFTCardProps) => {
  const {
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
        <Space direction="vertical" size={0}>
          <Typography.Title level={5}>{name}</Typography.Title>
          <Space size={0}>
            <Button type="text" icon={<IonIcon name="earth-outline" />} />
            <Button type="text" icon={<IonIcon name="logo-twitter" />} />
            <Button type="text" icon={<IonIcon name="logo-discord" />} />
          </Space>
          <Space size={4} align="center">
            <Typography.Text style={{ fontSize: 20 }} strong>
              {price}
            </Typography.Text>
            <Avatar
              shape="square"
              src={SolLogo}
              size={24}
              style={{ padding: 3 }}
            />
          </Space>
        </Space>
      </Col>
    </Row>
  )
}

export default CardNFT
