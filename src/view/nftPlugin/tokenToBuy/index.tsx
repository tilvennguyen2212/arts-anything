import { useState } from 'react'

import { Button, Col, Row, Typography } from 'antd'

import { ACCEPTED_TOKENS } from 'sdk/constants'

const tokenSelectedStyle = {
  color: '#0752ab',
  borderColor: '#0752ab',
  background: 'transparent',
}

const TokenToBuy = () => {
  const [tokenSelected, setTokenSelected] = useState('')

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Text>Payment by</Typography.Text>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          {Object.values(ACCEPTED_TOKENS).map(({ symbols }) => (
            <Col key={symbols}>
              <Button
                onClick={() => setTokenSelected(symbols)}
                style={
                  symbols === tokenSelected ? tokenSelectedStyle : undefined
                }
              >
                {symbols}
              </Button>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default TokenToBuy
