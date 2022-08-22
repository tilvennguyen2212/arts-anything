import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Row, Spin } from 'antd'
import CollectionCard from '../../components/collectionCard'

import { AppDispatch, AppState } from 'model'
import { loadHot } from 'model/category.controller'

const HotList = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const hot = useSelector((state: AppState) => state.category.hot)

  const onInit = useCallback(async () => {
    setLoading(true)
    try {
      await dispatch(loadHot())
    } catch (er: any) {
      return window.notify({ type: 'warning', description: er.message })
    } finally {
      return setLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    onInit()
  }, [onInit])

  return (
    <Spin spinning={loading}>
      <Row gutter={[24, 24]}>
        {hot.map((symbol) => (
          <Col key={symbol} xs={12} sm={8} lg={6}>
            <CollectionCard symbol={symbol} />
          </Col>
        ))}
      </Row>
    </Spin>
  )
}

export default HotList
