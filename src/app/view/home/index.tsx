import { useCallback } from 'react'

import { Button, Col, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import CollectionList from 'app/view/collections/collectionList'

import { useRoute } from 'app/hooks/useRoute'
import { NFTPlatform } from 'app/sdk'

const Home = () => {
  const { to } = useRoute()

  const onDetails = useCallback(
    (platform: NFTPlatform) => to(`/${platform}`),
    [to],
  )

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Button
          type="primary"
          onClick={() => onDetails('magicEden')}
          icon={<IonIcon name="images-outline" />}
        >
          Magic Eden
        </Button>
      </Col>
      <Col span={24}>
        <CollectionList platform="magicEden" more={false} />
      </Col>
    </Row>
  )
}

export default Home
