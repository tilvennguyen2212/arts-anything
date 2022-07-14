import { Button, Col, Row, Typography } from 'antd'

import configs from 'configs'

const {
  payment: { whitelist },
} = configs

export type TokenToBuyProps = {
  value?: string
  onChange?: (value: string) => void
}

const TokenToBuy = ({
  value = 'sol',
  onChange = () => {},
}: TokenToBuyProps) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Text>Payment by</Typography.Text>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          {['sol', ...Object.keys(whitelist)].map((symbol) => (
            <Col key={symbol}>
              <Button
                onClick={() => onChange(symbol)}
                className={symbol === value ? 'token-selected' : undefined}
              >
                {symbol.toUpperCase()}
              </Button>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default TokenToBuy
