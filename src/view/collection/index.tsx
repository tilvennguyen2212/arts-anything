import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppRoute, useWalletAddress, util } from '@sentre/senhub'

import { Button, Empty, Col, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import MoreButton from 'components/moreButton'
import ListingNFTCard from 'components/listingNFTCard'

import { AppDispatch, AppState } from 'model'
import { addViewedSymbol } from 'model/viewed.controller'
import { nextListingNFTs } from 'model/listing.controller'

const Collection = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { symbol } = useParams<{ symbol: string }>()
  const listingNFTs = useSelector((state: AppState) => state.listing[symbol])
  const walletAddress = useWalletAddress()
  const { back } = useAppRoute()

  const isEmpty = useMemo(
    () => !listingNFTs || !Object.keys(listingNFTs).length,
    [listingNFTs],
  )

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
    ;(async () => {
      if (!util.isAddress(walletAddress) || !symbol) return
      await dispatch(addViewedSymbol({ symbol, walletAddress }))
    })()
  }, [dispatch, symbol, walletAddress])

  useEffect(() => {
    if (!listingNFTs) onMore()
  }, [onMore, listingNFTs])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Button
          size="large"
          icon={<IonIcon name="arrow-back-outline" />}
          onClick={() => back('/')}
        >
          Back
        </Button>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {isEmpty ? (
            <Col span={24}>
              <Row gutter={[24, 24]} justify="center">
                <Col>
                  <Empty description="No listing NFT" />
                </Col>
              </Row>
            </Col>
          ) : (
            Object.values(listingNFTs || {}).map(({ tokenMint }, i) => (
              <Col key={i} xs={12} sm={8} lg={6}>
                <ListingNFTCard symbol={symbol} mintAddress={tokenMint} />
              </Col>
            ))
          )}
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
