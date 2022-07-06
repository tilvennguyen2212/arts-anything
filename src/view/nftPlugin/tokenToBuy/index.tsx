import { Button, Col, Row, Typography } from 'antd'
import React from 'react'

const TokenToBuy = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Text>
          Tokens you want to use in your wallet to buy
        </Typography.Text>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col>
            <Button>SOL</Button>
          </Col>
          <Col>
            <Button>SOL</Button>
          </Col>
          <Col>
            <Button>SOL</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default TokenToBuy
