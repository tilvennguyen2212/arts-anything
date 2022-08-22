import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWalletAddress, util } from '@sentre/senhub'

import { Col, Divider, Row, Typography, Empty, Button } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import MoreButton from 'components/moreButton'
import CollectionCard from 'components/collectionCard'

import { AppDispatch, AppState } from 'model'
import { deleteViewedSymbol, getViewedSymbols } from 'model/viewed.controller'
import configs from 'configs'

const {
  pagination: { limit: LIMIT },
} = configs

const ViewedList = () => {
  const viewed = useSelector((state: AppState) => state.viewed)
  const dispatch = useDispatch<AppDispatch>()
  const [limit, setLimit] = useState(LIMIT)
  const walletAddress = useWalletAddress()
  const currentList = useMemo(() => viewed.slice(0, limit), [viewed, limit])
  const isEmpty = useMemo(() => !viewed || !viewed.length, [viewed])
  const noMore = useMemo(
    () => currentList.length === viewed.length,
    [currentList, viewed],
  )

  const onDelete = useCallback(
    async (symbol: string) => {
      if (!util.isAddress(walletAddress) || !symbol) return
      return dispatch(deleteViewedSymbol({ walletAddress, symbol }))
    },
    [dispatch, walletAddress],
  )
  const onClearAll = useCallback(() => {
    if (!util.isAddress(walletAddress)) return
    return dispatch(deleteViewedSymbol({ walletAddress, all: true }))
  }, [dispatch, walletAddress])

  const onMore = useCallback(async () => {
    return setLimit(Math.min(viewed.length, limit + LIMIT))
  }, [viewed, limit])

  useEffect(() => {
    if (util.isAddress(walletAddress))
      dispatch(getViewedSymbols({ walletAddress }))
  }, [dispatch, walletAddress])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[16, 16]} wrap={false}>
          <Col flex="auto">
            <Divider orientation="left" style={{ margin: 0 }}>
              <Typography.Title level={4} type="secondary">
                🔍 Viewed Collections
              </Typography.Title>
            </Divider>
          </Col>
          <Col>
            <Button
              onClick={onClearAll}
              size="small"
              icon={<IonIcon name="trash-outline" />}
            >
              Clear All
            </Button>
          </Col>
        </Row>
      </Col>
      {isEmpty ? (
        <Col span={24}>
          <Row gutter={[24, 24]} justify="center">
            <Col>
              <Empty description="No history found" />
            </Col>
          </Row>
        </Col>
      ) : (
        currentList.map((symbol, i) => (
          <Col key={i} xs={12} sm={8} lg={6}>
            <CollectionCard symbol={symbol} onClose={onDelete} closable />
          </Col>
        ))
      )}
      <Col span={24}>
        <Row gutter={[24, 24]} justify="center">
          <Col>
            <MoreButton onMore={onMore} disabled={noMore} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ViewedList
