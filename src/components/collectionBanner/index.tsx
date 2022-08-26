import { Card, Col, Row, Spin, Typography } from 'antd'
import CollectionSocial from 'components/collectionSocial'
import CollectionTags from 'components/collectionTags'
import Stat from './stat'

import { useCollection } from 'hooks/useCollection'
import './index.less'

export type CollectionBannerProps = { symbol: string }

const CollectionBanner = ({ symbol }: CollectionBannerProps) => {
  const { loading, collection } = useCollection(symbol)

  return (
    <Spin spinning={loading}>
      <Card
        style={{
          backgroundImage: `url("${collection.image}")`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Card className="glass">
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Row gutter={[16, 16]} wrap={false} align="middle">
                <Col flex="auto">
                  <Typography.Title level={3}>
                    {collection.name}
                  </Typography.Title>
                </Col>
                <Col>
                  <CollectionSocial symbol={symbol} />
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ marginBottom: -8 }}>
              <CollectionTags symbol={symbol} />
            </Col>
            <Col span={24}>
              <Typography.Text>{collection.description}</Typography.Text>
            </Col>
            <Col span={24}>
              <Stat symbol={symbol} />
            </Col>
          </Row>
        </Card>
      </Card>
    </Spin>
  )
}

export default CollectionBanner
