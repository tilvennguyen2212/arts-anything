import { useState } from 'react'

import { Col, Row, Segmented } from 'antd'
import RecentList from './recentList'
import HotList from './hotList'
import ViewedList from './viewedList'
import Search from './search'

import { Category } from 'model/category.controller'

const CurrentList = ({ type = 'recent' }: { type?: Category }) => {
  if (type === 'recent') return <RecentList />
  if (type === 'hot') return <HotList />
  if (type === 'viewed') return <ViewedList />
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
                { label: '👀 Viewed', value: 'viewed' },
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
