import { Avatar, Col, Row, Space, Typography } from 'antd'
import MagicEdenLogo from 'static/images/magic-eden-logo.jpeg'

const MagicEdenTitle = () => {
  return (
    <Row gutter={[16, 16]} align="middle">
      <Col>
        <Avatar src={MagicEdenLogo} />
      </Col>
      <Col flex="auto">
        <Space size={0} direction="vertical">
          <Typography.Text>You are watching NFTs on</Typography.Text>
          <Typography.Text type="secondary" className="caption">
            magiceden.io
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default MagicEdenTitle
