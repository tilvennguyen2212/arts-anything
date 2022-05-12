import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { AppState } from 'app/model'
import { NFTPlatform } from 'app/sdk'
import { useRoute } from 'app/hooks/useRoute'

export type CollectionCardProps = { platform: NFTPlatform; symbol: string }

const CollectionCard = ({ platform, symbol }: CollectionCardProps) => {
  const {
    [platform]: {
      [symbol]: { name, description, image, website, twitter, discord },
    },
  } = useSelector((state: AppState) => state)
  const { to } = useRoute()

  const onSocialMedia = (url: string) => window.open(url, '_blank')
  const onDetails = useCallback(() => {
    return to(`/${platform}/${symbol}`)
  }, [to, platform, symbol])

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
              onClick={() => onSocialMedia(website)}
              disabled={!website}
            />
            <Button
              type="text"
              icon={<IonIcon name="logo-twitter" />}
              onClick={() => onSocialMedia(twitter)}
              disabled={!twitter}
            />
            <Button
              type="text"
              icon={<IonIcon name="logo-discord" />}
              onClick={() => onSocialMedia(discord)}
              disabled={!discord}
            />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default CollectionCard
