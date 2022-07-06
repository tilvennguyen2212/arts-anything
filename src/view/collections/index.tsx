import { Col, Row, Segmented } from 'antd'
import CollectionList from './collectionList'
import Search from './search'

const Collections = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col flex="auto">
            <Segmented
              size="large"
              options={[
                { label: '💎 Recent', value: 'recent' },
                { label: '🔥 Hot', value: 'hot', disabled: true },
                { label: '⏳ Comming', value: 'comming', disabled: true },
              ]}
            />
          </Col>
          <Col>
            <Search />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <CollectionList />
      </Col>
    </Row>
  )
}

export default Collections
