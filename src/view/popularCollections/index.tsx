import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Infix, useInfix } from '@sentre/senhub'

import { Col, Row, Typography } from 'antd'
import PopularCollectionCard from './popularCollectionCard'

import { AppDispatch, AppState } from 'model'
import { getPopularCollections } from 'model/popularCollections.controller'

const PopularCollections = () => {
  const popularCollections = useSelector(
    (state: AppState) => state.popularCollections,
  )
  const dispatch = useDispatch<AppDispatch>()
  const infix = useInfix()
  const limit = useMemo(() => (infix < Infix.sm ? 3 : 6), [infix])

  useEffect(() => {
    dispatch(getPopularCollections())
  }, [dispatch])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[24, 24]} justify="center">
          <Col>
            <Typography.Title level={3}>
              👑 Collections of the Month
            </Typography.Title>
          </Col>
        </Row>
      </Col>
      {Object.keys(popularCollections)
        .slice(0, limit)
        .map((symbol) => (
          <Col key={symbol} xs={24} sm={12} lg={8}>
            <PopularCollectionCard symbol={symbol} />
          </Col>
        ))}
    </Row>
  )
}

export default PopularCollections
