import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Button, Card, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { AppState } from 'app/model'
import { NFTPlatform } from 'app/sdk'

export type NFTCardProps = {
  platform: NFTPlatform
  symbol: string
  mintAddress: string
}

const NFTCard = ({ platform, symbol, mintAddress }: NFTCardProps) => {
  const {
    listing: {
      [symbol]: { [mintAddress]: nft },
    },
  } = useSelector((state: AppState) => state)

  const {
    tokenAddress,
    seller,
    price,
    extra: { img },
  } = nft

  const onBuy = useCallback(() => {
    return console.log(platform, symbol)
  }, [platform, symbol])

  return (
    <Card
      cover={<img alt={symbol} src={img} />}
      bodyStyle={{ padding: 16 }}
      bordered={false}
      hoverable
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5} ellipsis>
            {tokenAddress}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Paragraph ellipsis={{ rows: 2 }}>
            {seller}
          </Typography.Paragraph>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]} align="middle" wrap={false}>
            <Col flex="auto">
              <Typography.Title level={5}>{price} SOL</Typography.Title>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<IonIcon name="card-outline" />}
                onClick={onBuy}
              >
                Buy
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default NFTCard
