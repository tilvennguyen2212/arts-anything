import { Button, Col, Row, Typography } from 'antd'
import { useState } from 'react'

const TokenToBuy = () => {
  const [listTokens] = useState<string[]>(['SOL', 'SNTR', 'USDC', 'OKRS'])
  const [tokenSelected, setTokenSelected] = useState('')

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Text>Payment by</Typography.Text>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          {listTokens.map((token) => (
            <Col key={token}>
              <Button
                className={`${
                  token === tokenSelected ? 'token-selected' : null
                }`}
                onClick={() => setTokenSelected(token)}
              >
                {token}
              </Button>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24}>
        <Button type="primary" block>
          Buy Now
        </Button>
      </Col>
      <Col span={24}>
        <Button type="text" block>
          Search NFT
        </Button>
      </Col>
    </Row>
  )
}

export default TokenToBuy
