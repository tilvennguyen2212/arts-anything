import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { Card, Col, Row, Skeleton, Space, Typography } from 'antd'
import Rarity from 'components/rarity'
import NFTPlugin from 'view/nftPlugin'

import { AppDispatch, AppState } from 'model'
import { getNFTMetadata } from 'model/metadata.controller'

export type NFTCardProps = {
  symbol: string
  mintAddress: string
}

const NFTCard = ({ symbol, mintAddress }: NFTCardProps) => {
  const {
    listing: {
      [symbol]: { [mintAddress]: nft },
    },
    metadata: { [mintAddress]: metadata },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const {
    price,
    rarity,
    extra: { img },
  } = nft
  const { name, image } = metadata || {}

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
              <NFTPlugin symbol={symbol} mintAddress={mintAddress} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default NFTCard
