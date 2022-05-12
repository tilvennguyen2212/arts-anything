import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Row } from 'antd'
import CollectionCard from './collectionCard'

import { AppDispatch, AppState } from 'app/model'
import { NFTPlatform } from 'app/sdk'
import { nextCollections } from 'app/model/magicEden.controller'

export type CollectionListProps = { platform: NFTPlatform; more?: boolean }

const CollectionList = ({ platform, more = true }: CollectionListProps) => {
  const [loading, setLoading] = useState(false)
  const { [platform]: collections } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const onMore = useCallback(async () => {
    setLoading(true)
    try {
      await dispatch(nextCollections())
    } catch (er: any) {
      return window.notify({ type: 'warning', description: er.message })
    } finally {
      return setLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    if (Object.keys(collections).length < 12) onMore()
  }, [collections, onMore])

  return (
    <Row gutter={[24, 24]}>
      {Object.keys(collections).map((symbol, i) => (
        <Col key={i} xs={12} sm={8} lg={6} xl={4} xxl={3}>
          <CollectionCard platform={platform} symbol={symbol} />
        </Col>
      ))}
      {more && (
        <Col span={24}>
          <Row gutter={[24, 24]} justify="center">
            <Col>
              <Button onClick={onMore} loading={loading}>
                More
              </Button>
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  )
}

export default CollectionList
