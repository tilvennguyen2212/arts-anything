import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPDB, useWalletAddress } from '@sentre/senhub'

import { Col, Row, Empty } from 'antd'
import MoreButton from 'components/moreButton'
import CollectionCard from './collectionCard'

import { AppDispatch, AppState } from 'model'
import { setViewed } from 'model/category.controller'
import configs from 'configs'

const {
  manifest: { appId },
  pagination: { limit: LIMIT },
} = configs

const ViewedList = () => {
  const viewed = useSelector((state: AppState) => state.category.viewed)
  const dispatch = useDispatch<AppDispatch>()
  const [limit, setLimit] = useState(LIMIT)
  const walletAddress = useWalletAddress()
  const pdb = useMemo(() => createPDB(walletAddress, appId), [walletAddress])
  const currentList = useMemo(() => viewed.slice(0, limit), [viewed, limit])
  const isEmpty = useMemo(() => !viewed || !viewed.length, [viewed])
  const noMore = useMemo(
    () => currentList.length === viewed.length,
    [currentList, viewed],
  )

  const onDelete = useCallback(
    async (symbol: string) => {
      const storedList: string[] = await pdb.getItem('history')
      const viewedList = storedList.filter((value) => value !== symbol)
      await pdb.setItem('history', viewedList)
      return dispatch(setViewed(viewedList))
    },
    [dispatch, pdb],
  )

  const onMore = useCallback(async () => {
    return setLimit(Math.min(viewed.length, limit + LIMIT))
  }, [viewed, limit])

  useEffect(() => {
    ;(async () => {
      const storedList: string[] = (await pdb.getItem('history')) || []
      return dispatch(setViewed(storedList))
    })()
  }, [dispatch, pdb])

  return (
    <Row gutter={[24, 24]}>
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
