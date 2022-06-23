import { useCallback } from 'react'

import { Avatar, Button, Col, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import CollectionList from './collectionList'

import { useRoute } from 'app/hooks/useRoute'
import { usePlatform } from 'app/hooks/usePlatform'

const Collections = () => {
  const { platform, name, logo } = usePlatform()
  const { to } = useRoute()

  const onHome = useCallback(() => to('/'), [to])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[12, 12]} wrap={false} align="middle">
          <Col flex="auto">
            <Button icon={<IonIcon name="home-outline" />} onClick={onHome}>
              Home
            </Button>
          </Col>
          <Col>
            <Typography.Title type="secondary" level={3}>
              {name}
            </Typography.Title>
          </Col>
          <Col>
            <Avatar src={logo} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <CollectionList platform={platform} />
      </Col>
    </Row>
  )
}

export default Collections
