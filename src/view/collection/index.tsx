import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Button, Col, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import MoreButton from 'components/moreButton'
import NFTCard from './nftCard'

import { useCollection } from 'hooks/useCollection'
import { useRoute } from 'hooks/useRoute'
import { AppDispatch, AppState } from 'model'
import { getCollection } from 'model/collections.controller'
import { nextListingNFTs } from 'model/listing.controller'

const Collection = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { symbol } = useCollection()
  const {
    collections: { [symbol]: collection },
    listing: { [symbol]: listingNFTs },
  } = useSelector((state: AppState) => state)
  const { to, back } = useRoute()
  const { action } = useHistory()

  const onBack = useCallback(() => {
    if (action !== 'PUSH') return to('/')
    return back()
  }, [to, back, action])

  const onMore = useCallback(async () => {
    try {
      setLoading(true)
      await dispatch(nextListingNFTs({ symbol }))
    } catch (er: any) {
      return window.notify({ type: 'warning', description: er.message })
    } finally {
      return setLoading(false)
    }
  }, [dispatch, symbol])

  useEffect(() => {
    if (!collection && symbol) dispatch(getCollection(symbol))
  }, [dispatch, collection, symbol])

  useEffect(() => {
    if (!listingNFTs) onMore()
  }, [onMore, listingNFTs])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Button
          size="large"
          icon={<IonIcon name="arrow-back-outline" />}
          onClick={onBack}
        >
          Back
        </Button>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {Object.values(listingNFTs || {}).map(({ tokenMint }, i) => (
            <Col key={i} xs={12} sm={8} lg={6}>
              <NFTCard symbol={symbol} mintAddress={tokenMint} />
            </Col>
          ))}
        </Row>
      </Col>
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

export default Collection
