import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useWallet, util } from '@sentre/senhub'

import { Button, Card, Col, Row, Skeleton, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Rarity from 'components/rarity'

import { AppDispatch, AppState } from 'model'
import { sendAndConfirm } from 'sdk/jupAgSDK'
import { getNFTMetadata } from 'model/metadata.controller'
import { magicEdenSDK } from 'model/collections.controller'

const referralAddress: string = 'autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2'

export type NFTCardProps = {
  symbol: string
  mintAddress: string
}

const NFTCard = ({ symbol, mintAddress }: NFTCardProps) => {
  const [loading, setLoading] = useState(false)
  const {
    listing: {
      [symbol]: { [mintAddress]: nft },
    },
    metadata: { [mintAddress]: metadata },
  } = useSelector((state: AppState) => state)
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const dispatch = useDispatch<AppDispatch>()

  const {
    seller,
    price,
    tokenMint,
    auctionHouse,
    rarity,
    extra: { img },
  } = nft
  const { name, image } = metadata || {}

  const onBuy = useCallback(async () => {
    try {
      setLoading(true)
      const { wallet } = window.sentre
      const { setupTransaction, buyNowTransaction } = await magicEdenSDK.buyNow(
        {
          buyerAddress: walletAddress,
          sellerAddress: seller,
          auctionHouseAddress: auctionHouse,
          mintAddress: tokenMint,
          price,
          buyerReferralAddress: referralAddress,
          sellerReferralAddress: referralAddress,
          buyerExpiry: 0,
          sellerExpiry: -1,
        },
      )
      const txs = [setupTransaction, buyNowTransaction]
      const signedTxs = await wallet.signAllTransactions(txs)
      const txIds = await sendAndConfirm(signedTxs)
      return window.notify({
        type: 'success',
        description: 'Successfully buy the NFT. Click to view details.',
        onClick: () => window.open(util.explorer(txIds[1]), '_blank'),
      })
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    } finally {
      return setLoading(false)
    }
  }, [walletAddress, seller, price, tokenMint, auctionHouse])

  useEffect(() => {
    if (account.isAddress(mintAddress))
      dispatch(getNFTMetadata({ mintAddress }))
  }, [dispatch, mintAddress])

  return (
    <Card
      cover={<img alt={name} src={img || image} />}
      bodyStyle={{ padding: 16 }}
      bordered={false}
      hoverable
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          {name ? (
            <Typography.Title level={5} ellipsis>
              {name}
            </Typography.Title>
          ) : (
            <Skeleton
              paragraph={{ rows: 1 }}
              title={false}
              round
              active
              loading
            />
          )}
        </Col>
        <Col span={24}>
          <Space>
            {rarity?.moonrank && (
              <Rarity name="moonrank" rank={rarity?.moonrank.rank} />
            )}
            {rarity?.howrare && (
              <Rarity name="howrare" rank={rarity?.howrare.rank} />
            )}
          </Space>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]} align="middle" wrap={false}>
            <Col flex="auto">
              <Typography.Title level={5}>{price} SOL</Typography.Title>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<IonIcon name="card-outline" />}
                onClick={onBuy}
                loading={loading}
              >
                Buy
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default NFTCard
