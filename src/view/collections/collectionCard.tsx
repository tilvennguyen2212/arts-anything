import { MouseEvent, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { AppState } from 'model'
import { NFTPlatform } from 'sdk'
import { useRoute } from 'hooks/useRoute'

export type CollectionCardProps = { platform: NFTPlatform; symbol: string }

const CollectionCard = ({ platform, symbol }: CollectionCardProps) => {
  const {
    [platform]: {
      [symbol]: { name, description, image, website, twitter, discord },
    },
  } = useSelector((state: AppState) => state)
  const { to } = useRoute()

  const onSocialMedia = (e: MouseEvent<HTMLElement>, url: string) => {
    e.stopPropagation()
    return window.open(url, '_blank')
  }
  const onDetails = useCallback(
    () => to(`/${platform}/${symbol}`),
    [to, platform, symbol],
  )

  return (
    <Card
      cover={<img alt={symbol} src={image} />}
      bodyStyle={{ padding: 16 }}
      bordered={false}
      onClick={onDetails}
      hoverable
    >
      <Row gutter={[16, 16]} justify="end">
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
        <Col>
          <Space size={0}>
            <Button
              type="text"
              icon={<IonIcon name="earth-outline" />}
              onClick={(e) => onSocialMedia(e, website)}
              disabled={!website}
            />
            <Button
              type="text"
              icon={<IonIcon name="logo-twitter" />}
              onClick={(e) => onSocialMedia(e, twitter)}
              disabled={!twitter}
            />
            <Button
              type="text"
              icon={<IonIcon name="logo-discord" />}
              onClick={(e) => onSocialMedia(e, discord)}
              disabled={!discord}
            />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default CollectionCard
