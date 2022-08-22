import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import MoreButton from 'components/moreButton'
import CollectionCard from '../../components/collectionCard'

import { AppDispatch, AppState } from 'model'
import { nextCollections } from 'model/collections.controller'
import { pushRecent } from 'model/category.controller'

const RecentList = () => {
  const [loading, setLoading] = useState(false)
  const recent = useSelector((state: AppState) => state.category.recent)
  const dispatch = useDispatch<AppDispatch>()

  const onMore = useCallback(async () => {
    setLoading(true)
    try {
      const data = await dispatch(nextCollections()).unwrap()
      await dispatch(pushRecent(Object.keys(data)))
    } catch (er: any) {
      return window.notify({ type: 'warning', description: er.message })
    } finally {
      return setLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    if (!recent.length) onMore()
  }, [recent, onMore])

  return (
    <Row gutter={[24, 24]}>
      {recent.map((symbol, i) => (
        <Col key={i} xs={12} sm={8} lg={6}>
          <CollectionCard symbol={symbol} />
        </Col>
      ))}
      <Col span={24}>
        <Row gutter={[24, 24]} justify="center">
          <Col>
            <MoreButton onMore={onMore} loading={loading} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default RecentList
