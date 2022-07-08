import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import MoreButton from 'components/moreButton'
import CollectionCard from './collectionCard'

import { AppDispatch, AppState } from 'model'
import { getCollection } from 'model/collections.controller'
import { pushHot } from 'model/category.controller'

const HOT_LIST = [
  'degods',
  'okay_bears',
  'degentown',
  'primates',
  'shadowy_super_coder_dao',
  'trippin_ape_tribe',
  'justape',
  'degenerate_ape_academy',
  'solana_monkey_business',
  'blocksmith_labs',
  'communi3',
  'bubblegoose_ballers',
]

const HotList = () => {
  const [loading, setLoading] = useState(false)
  const hot = useSelector((state: AppState) => state.category.hot)
  const dispatch = useDispatch<AppDispatch>()

  const onMore = useCallback(async () => {
    try {
      setLoading(true)
      for (const symbol of HOT_LIST) {
        try {
          const data = await dispatch(getCollection(symbol)).unwrap()
          await dispatch(pushHot(Object.keys(data)))
        } catch (er: any) {
          console.warn(symbol, er.message)
        }
      }
    } catch (er: any) {
      return window.notify({ type: 'warning', description: er.message })
    } finally {
      return setLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    onMore()
  }, [onMore])

  return (
    <Row gutter={[24, 24]}>
      {hot.map((symbol, i) => (
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

export default HotList
