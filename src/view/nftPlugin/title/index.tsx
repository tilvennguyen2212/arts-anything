import { Row, Col, Button } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Address from './address'

const Title = () => {
  return (
    <Row align="middle" justify="center" style={{ padding: '0 -8px' }}>
      <Col>
        <Button
          type="text"
          icon={<IonIcon name="menu-outline" style={{ fontSize: 24 }} />}
        />
      </Col>
      <Col flex="auto" style={{ textAlign: 'center' }}>
        <Address address="s9PuJosqhC8pdKJThNxH97wUFKZHyUGAUyVwpzPg49j" />
      </Col>
    </Row>
  )
}

export default Title
