import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { Button, Card, Col, Row, Skeleton, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Rarity from 'app/components/rarity'

import { AppDispatch, AppState } from 'app/model'
import { NFTPlatform } from 'app/sdk'
import { getNFTMetadata } from 'app/model/metadata.controller'
import { magicEdenSDK } from 'app/model/magicEden.controller'
import { useWallet } from '@senhub/providers'
import { sendAndConfirm } from 'app/sdk/jupAgSDK'

export type NFTCardProps = {
  platform: NFTPlatform
  symbol: string
  mintAddress: string
}

const NFTCard = ({ platform, symbol, mintAddress }: NFTCardProps) => {
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
      const { splt, wallet } = window.sentre
      const accountAddress = await splt.deriveAssociatedAddress(
        walletAddress,
        tokenMint,
      )
      const { signedTx } = await magicEdenSDK.buyNow({
        buyerAddress: walletAddress,
        sellerAddress: seller,
        auctionHouseAddress: auctionHouse,
        mintAddress: tokenMint,
        accountAddress,
        price,
      })
      // const tx = await wallet.signTransaction(signedTx)
      // const [txId] = await sendAndConfirm([tx])
      // return console.log(txId)
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
