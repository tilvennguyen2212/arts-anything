import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import MoreButton from 'components/moreButton'
import CollectionCard from './collectionCard'

import { AppDispatch, AppState } from 'model'
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
const LIMIT = 12

const HotList = () => {
  const [limit, setLimit] = useState(LIMIT)
  const dispatch = useDispatch<AppDispatch>()
  const hot = useSelector((state: AppState) => state.category.hot)

  const onMore = useCallback(async () => {
    return setLimit(Math.min(HOT_LIST.length, limit + LIMIT))
  }, [limit])

  useEffect(() => {
    dispatch(pushHot(HOT_LIST.slice(0, limit)))
  }, [dispatch, limit])

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
            <MoreButton onMore={onMore} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default HotList
