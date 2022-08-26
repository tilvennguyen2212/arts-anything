import { useCallback, MouseEvent, useMemo } from 'react'
import { useAppRoute, util } from '@sentre/senhub'

import { Avatar, Button, Card, Col, Row, Tooltip, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import CollectionSocial from './social'

import { useCollection } from 'hooks/useCollection'
import MagicEdenLogo from 'static/images/magic-eden-logo.jpeg'
import './index.less'
import { useStat } from 'hooks/useStat'

export type CollectionCardProps = {
  symbol: string
  closable?: boolean
  onClose?: (symbol: string) => void
}

const CollectionCard = ({
  symbol,
  closable = false,
  onClose = () => {},
}: CollectionCardProps) => {
  const {
    loading: collectionLoading,
    collection: { name, description, image },
  } = useCollection(symbol)
  const {
    loading: statLoading,
    stat: { floorPrice },
  } = useStat(symbol)
  const { to } = useAppRoute()

  const loading = useMemo(
    () => collectionLoading || statLoading,
    [collectionLoading, statLoading],
  )
  const onDetails = useCallback(() => to(`/${symbol}`), [to, symbol])
  const onMagicEden = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      return window.open(`https://magiceden.io/marketplace/${symbol}`, '_blank')
    },
    [symbol],
  )
  const onClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      return onClose(symbol)
    },
    [symbol, onClose],
  )

  return (
    <Card
      cover={
        <div>
          <img width="100%" height="100%" alt={symbol} src={image} />
          {floorPrice && (
            <Tooltip title="Floor Price">
              <Button
                className="floor-button"
                icon={<IonIcon name="logo-solana" />}
              >
                <span style={{ fontWeight: 800 }}>
                  {util.numeric(floorPrice / 10 ** 9).format('0,0.[000]')}
                </span>
              </Button>
            </Tooltip>
          )}
          {closable && (
            <Button
              shape="circle"
              className="close-button"
              icon={<IonIcon name="close" />}
              onClick={onClick}
            />
          )}
        </div>
      }
      bodyStyle={{ padding: 16 }}
      bordered={false}
      onClick={onDetails}
      loading={loading}
      hoverable
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5} ellipsis>
            {name}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Paragraph ellipsis={{ rows: 2 }}>
            {description}
          </Typography.Paragraph>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]} align="middle" wrap={false}>
            <Col flex="auto">
              <span onClick={onMagicEden}>
                <Avatar src={MagicEdenLogo} size={24} />
              </span>
            </Col>
            <Col>
              <CollectionSocial symbol={symbol} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default CollectionCard
