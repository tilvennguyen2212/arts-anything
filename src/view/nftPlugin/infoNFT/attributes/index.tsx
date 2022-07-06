import { Card, Row, Col, Typography } from 'antd'
import { MagicEdenAttribute } from 'sdk/types'

const ItemAttribute = ({ attribute }: { attribute: MagicEdenAttribute }) => {
  return (
    <Card className="nft-card-item-attribute" bodyStyle={{ padding: 12 }}>
      <Row align="middle">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Typography.Text
            ellipsis={{ tooltip: true }}
            style={{ fontSize: 10 }}
          >
            {attribute.trait_type}
          </Typography.Text>
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Typography.Text
            ellipsis={{ tooltip: true }}
            style={{ fontSize: 10 }}
          >
            {attribute.value}
          </Typography.Text>
        </Col>
      </Row>
    </Card>
  )
}

const Attributes = () => {
  const nftInfo = {
    attributes: [
      {
        trait_type: 'BACKGROUND',
        value: 'Cream',
      },
      {
        trait_type: 'FUR',
        value: 'Dark Brown',
      },
      {
        trait_type: 'CLOTHES',
        value: 'Double Jacket',
      },
      {
        trait_type: 'BACKGROUND',
        value: 'Cream',
      },
      {
        trait_type: 'FUR',
        value: 'Dark Brown',
      },
      {
        trait_type: 'CLOTHES',
        value: 'Double Jacket',
      },
      {
        trait_type: 'BACKGROUND',
        value: 'Cream',
      },
      {
        trait_type: 'FUR',
        value: 'Dark Brown',
      },
      {
        trait_type: 'CLOTHES',
        value: 'Double Jacket',
      },
    ],
  }
  return (
    <Row
      gutter={[8, 8]}
      className="scrollbar"
      style={{ maxHeight: 150, padding: '0 12px' }}
    >
      {nftInfo.attributes?.map((item: MagicEdenAttribute, index: number) => (
        <Col span={8} key={index}>
          <ItemAttribute attribute={item} />
        </Col>
      ))}
    </Row>
  )
}

export default Attributes
