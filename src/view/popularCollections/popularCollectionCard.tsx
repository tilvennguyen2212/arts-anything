import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useAppRoute, util } from '@sentre/senhub'

import { Avatar, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { AppState } from 'model'
import SolLogo from 'static/images/sol-logo.svg'

const AVATAR_SIZE = 64

export const getMedal = (rank = 0) => {
  if (rank === 1) return '#FEE101'
  if (rank === 2) return '#D7D7D7'
  if (rank === 3) return '#A77044'
  return '#0074FD'
}

export type PopularCollectionCardProps = { symbol: string }

const PopularCollectionCard = ({ symbol }: PopularCollectionCardProps) => {
  const { image, name, rank, totalVol } =
    useSelector((state: AppState) => state.popularCollections[symbol]) || {}
  const { to } = useAppRoute()

  const onDetails = useCallback(() => to(`/${symbol}`), [to, symbol])

  return (
    <Card bodyStyle={{ padding: 16 }} onClick={onDetails} hoverable>
      <Row gutter={[16, 16]} wrap={false} align="middle">
        <Col>
          <Avatar src={image} size={AVATAR_SIZE} shape="square" />
        </Col>
        <Col flex="auto">
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Row gutter={[8, 8]} wrap={false} align="middle">
                <Col>
                  <Space>
                    <Typography.Title level={4}>#{rank}</Typography.Title>
                    <IonIcon
                      name="ribbon"
                      style={{ fontSize: 18, color: getMedal(rank) }}
                    />
                  </Space>
                </Col>
                <Col flex="auto">
                  <Typography.Title level={5} ellipsis>
                    {name}
                  </Typography.Title>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Space>
                <Typography.Text type="secondary">Volume:</Typography.Text>
                <Typography.Text>
                  {util.numeric(totalVol).format('0,0.[00]')}
                </Typography.Text>
                <Avatar
                  shape="square"
                  src={SolLogo}
                  size={18}
                  style={{ padding: 3 }}
                />
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default PopularCollectionCard
