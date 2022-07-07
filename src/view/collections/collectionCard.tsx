import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Avatar, Card, Col, Row, Typography } from 'antd'

import { AppState } from 'model'
import { useRoute } from 'hooks/useRoute'
import MagicEdenLogo from 'static/images/magic-eden-logo.jpeg'
import CollectionSocial from './collectionSocial'

export type CollectionCardProps = { symbol: string }

const CollectionCard = ({ symbol }: CollectionCardProps) => {
  const {
    collections: {
      [symbol]: { name, description, image },
    },
  } = useSelector((state: AppState) => state)
  const { to } = useRoute()

  const onDetails = useCallback(() => to(`/${symbol}`), [to, symbol])

  return (
    <Card
      cover={<img alt={symbol} src={image} />}
      bodyStyle={{ padding: 16 }}
      bordered={false}
      onClick={onDetails}
      hoverable
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5} ellipsis>
            {name}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Paragraph ellipsis={{ rows: 2 }}>
            {description}
          </Typography.Paragraph>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]} align="middle">
            <Col flex="auto">
              <Avatar src={MagicEdenLogo} />
            </Col>
            <Col>
              <CollectionSocial symbol={symbol} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default CollectionCard
