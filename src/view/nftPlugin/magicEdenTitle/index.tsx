import { Col, Image, Row, Space, Typography } from 'antd'
import MagicEdenLogo from 'static/images/magic-eden-logo.jpeg'

const MagicEdenTitle = () => {
  return (
    <Row gutter={[16, 16]} align="middle">
      <Col>
        <Image height={35} width={49} src={MagicEdenLogo} />
      </Col>
      <Col flex="auto">
        <Space size={0} direction="vertical">
          <Typography.Text>You are watching NFT</Typography.Text>
          <Typography.Text type="secondary" className="caption">
            magiceden.io
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default MagicEdenTitle
