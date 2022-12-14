import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Infix, useInfix, util } from '@sentre/senhub'

import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import Rarity from 'components/rarity'
import NFTPlugin from 'view/nftPlugin'

import { AppState } from 'model'
import { useMetadata } from 'hooks/useMetadata'
import SolLogo from 'static/images/sol-logo.svg'
import IonIcon from '@sentre/antd-ionicon'

export type ListingNFTCardProps = {
  symbol: string
  mintAddress: string
}

const ListingNFTCard = ({ symbol, mintAddress }: ListingNFTCardProps) => {
  const [visible, setVisible] = useState(false)
  const {
    price,
    rarity,
    extra: { img },
  } = useSelector((state: AppState) => state.listing[symbol][mintAddress])
  const { name, image } = useMetadata(mintAddress)
  const infix = useInfix()
  const isMobile = useMemo(() => infix < Infix.md, [infix])

  return (
    <Card
      cover={
        <img alt={name} src={img || image} onClick={() => setVisible(true)} />
      }
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
              <Space size={4}>
                <Avatar
                  shape="square"
                  src={SolLogo}
                  size={24}
                  style={{ padding: 3 }}
                />
                <Typography.Title level={5}>
                  {util.numeric(price).format('0,0.[0000]')}
                </Typography.Title>
              </Space>
            </Col>
            <Col>
              <Button
                onClick={() => setVisible(true)}
                type="primary"
                icon={isMobile ? undefined : <IonIcon name="card-outline" />}
              >
                Buy
              </Button>
              <NFTPlugin
                symbol={symbol}
                mintAddress={mintAddress}
                visible={visible}
                onClose={() => setVisible(false)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default ListingNFTCard
