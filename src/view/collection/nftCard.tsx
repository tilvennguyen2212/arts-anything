import { useSelector } from 'react-redux'

import { Avatar, Card, Col, Row, Skeleton, Space, Typography } from 'antd'
import Rarity from 'components/rarity'
import NFTPlugin from 'view/nftPlugin'

import { AppState } from 'model'
import { useMetadata } from 'hooks/useMetadata'
import SolLogo from 'static/images/sol-logo.svg'

export type NFTCardProps = {
  symbol: string
  mintAddress: string
}

const NFTCard = ({ symbol, mintAddress }: NFTCardProps) => {
  const {
    [mintAddress]: {
      price,
      rarity,
      extra: { img },
    },
  } = useSelector((state: AppState) => state.listing[symbol])
  const { name, image } = useMetadata({ mintAddress, force: true })

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
              <Space size={4}>
                <Avatar
                  shape="square"
                  src={SolLogo}
                  size={24}
                  style={{ padding: 3 }}
                />
                <Typography.Title level={5}>{price}</Typography.Title>
              </Space>
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
