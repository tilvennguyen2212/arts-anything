import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppRoute } from '@sentre/senhub'

import { Col, Row, Segmented } from 'antd'
import RecentList from './recentList'
import HotList from './hotList'
import Search from './search'

import { Category } from 'model/category.controller'
import MyNFTs from './myNFTs'

export type ExtendedCategory = Category | 'my-nfts'
const TABS: ExtendedCategory[] = ['recent', 'hot', 'my-nfts']

const CurrentList = ({ type = 'recent' }: { type?: ExtendedCategory }) => {
  if (type === 'recent') return <RecentList />
  if (type === 'hot') return <HotList />
  if (type === 'my-nfts') return <MyNFTs />
  return <RecentList />
}

const Collections = () => {
  const { to } = useAppRoute()
  const { search } = useLocation()
  const tab = useMemo(() => {
    const params = new URLSearchParams(search)
    const value = params.get('tab') as ExtendedCategory
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
                { label: '💎 Newest', value: 'recent' },
                { label: '🔥 Hot (24h)', value: 'hot' },
                { label: '👀 My NFTs', value: 'my-nfts' },
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
