import { Col, Row, Segmented } from 'antd'
import { useState } from 'react'
import RecentList from './recentList'
import Search from './search'

import { Category } from 'model/category.controller'
import HotList from './hotList'

const CurrentList = ({ type = 'recent' }: { type?: Category }) => {
  if (type === 'recent') return <RecentList />
  if (type === 'hot') return <HotList />
  return <RecentList />
}

const Collections = () => {
  const [type, setType] = useState<Category>('recent')

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col flex="auto">
            <Segmented
              size="large"
              options={[
                { label: '💎 Recent', value: 'recent' },
                { label: '🔥 Hot', value: 'hot' },
                { label: '⏳ Comming', value: 'comming', disabled: true },
              ]}
              value={type}
              onChange={(e) => setType(e as Category)}
            />
          </Col>
          <Col>
            <Search />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <CurrentList type={type} />
      </Col>
    </Row>
  )
}

export default Collections
