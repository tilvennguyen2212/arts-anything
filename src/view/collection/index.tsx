import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { createPDB, useWallet } from '@sentre/senhub'

import { Button, Empty, Col, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import MoreButton from 'components/moreButton'
import NFTCard from './nftCard'

import { useRoute } from 'hooks/useRoute'
import { AppDispatch, AppState } from 'model'
import { setViewed } from 'model/category.controller'
import { nextListingNFTs } from 'model/listing.controller'
import configs from 'configs'

const {
  manifest: { appId },
} = configs

const Collection = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { symbol } = useParams<{ symbol: string }>()
  const {
    listing: { [symbol]: listingNFTs },
  } = useSelector((state: AppState) => state)
  const { to, back } = useRoute()
  const { action } = useHistory()
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const pdb = useMemo(() => createPDB(walletAddress, appId), [walletAddress])

  const isEmpty = useMemo(
    () => !listingNFTs || !Object.keys(listingNFTs).length,
    [listingNFTs],
  )

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
    ;(async () => {
      if (!symbol) return
      const storedList: string[] = (await pdb.getItem('history')) || []
      const index = storedList.findIndex((value) => value === symbol)
      if (index >= 0) storedList.splice(index, 1)
      storedList.unshift(symbol)
      await pdb.setItem('history', storedList)
      await dispatch(setViewed(storedList))
    })()
  }, [dispatch, symbol, pdb])

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
                <NFTCard symbol={symbol} mintAddress={tokenMint} />
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
