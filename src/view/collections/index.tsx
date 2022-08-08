import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppRoute } from '@sentre/senhub'

import { Col, Row, Segmented } from 'antd'
import RecentList from './recentList'
import HotList from './hotList'
import ViewedList from './viewedList'
import Search from './search'

import { Category } from 'model/category.controller'

const TABS: Category[] = ['recent', 'hot', 'viewed']

const CurrentList = ({ type = 'recent' }: { type?: Category }) => {
  if (type === 'recent') return <RecentList />
  if (type === 'hot') return <HotList />
  if (type === 'viewed') return <ViewedList />
  return <RecentList />
}

const Collections = () => {
  const { to } = useAppRoute()
  const { search } = useLocation()
  const tab = useMemo(() => {
    const params = new URLSearchParams(search)
    const value = params.get('tab') as Category
    if (!TABS.includes(value)) return 'recent'
    return value
  }, [search])

  const setTab = useCallback((value: Category) => to(`?tab=${value}`), [to])

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
              value={tab}
              onChange={(e) => setTab(e as Category)}
            />
          </Col>
          <Col>
            <Search />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <CurrentList type={tab} />
      </Col>
    </Row>
  )
}

export default Collections
