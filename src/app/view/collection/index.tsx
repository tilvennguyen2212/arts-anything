import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import MoreButton from 'app/components/moreButton'
import NFTCard from './nftCard'

import { useCollection } from 'app/hooks/useCollection'
import { useRoute } from 'app/hooks/useRoute'
import { AppDispatch, AppState } from 'app/model'
import { getCollection } from 'app/model/magicEden.controller'
import { nextListingNFTs } from 'app/model/listing.controller'

const Collection = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { platform, symbol } = useCollection()
  const {
    [platform]: { [symbol]: collection },
    listing: { [symbol]: listingNFTs },
  } = useSelector((state: AppState) => state)
  const { to } = useRoute()

  const onBack = useCallback(() => to(`/${platform}`), [to, platform])
  const onMore = useCallback(async () => {
    setLoading(true)
    try {
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
        <Button icon={<IonIcon name="arrow-back-outline" />} onClick={onBack}>
          Back
        </Button>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {Object.values(listingNFTs || {}).map(({ tokenMint }, i) => (
            <Col key={i} xs={12} sm={8} lg={6} xl={4} xxl={3}>
              <NFTCard
                platform={platform}
                symbol={symbol}
                mintAddress={tokenMint}
              />
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
