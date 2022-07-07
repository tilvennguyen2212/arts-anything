import { useCallback, MouseEvent } from 'react'

import { Avatar, Card, Col, Row, Spin, Typography } from 'antd'
import CollectionSocial from './collectionSocial'

import { useRoute } from 'hooks/useRoute'
import MagicEdenLogo from 'static/images/magic-eden-logo.jpeg'
import { useCollection } from 'hooks/useCollection'

export type CollectionCardProps = { symbol: string }

const CollectionCard = ({ symbol }: CollectionCardProps) => {
  const {
    loading,
    collection: { name, description, image },
  } = useCollection(symbol)
  const { to } = useRoute()

  const onDetails = useCallback(() => to(`/${symbol}`), [to, symbol])
  const onMagicEden = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      return window.open(`https://magiceden.io/marketplace/${symbol}`, '_blank')
    },
    [symbol],
  )

  return (
    <Spin spinning={loading}>
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
            <Row gutter={[8, 8]} align="middle" wrap={false}>
              <Col flex="auto">
                <span onClick={onMagicEden}>
                  <Avatar src={MagicEdenLogo} size={24} />
                </span>
              </Col>
              <Col>
                <CollectionSocial symbol={symbol} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Spin>
  )
}

export default CollectionCard
