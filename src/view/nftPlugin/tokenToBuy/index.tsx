import { Button, Col, Row, Space, Tooltip, Typography } from 'antd'

import configs from 'configs'
import { onDetail } from 'view/events/tradingContest/announcement'

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
              <Tooltip
                title={
                  <Typography.Text
                    onClick={onDetail}
                    style={{ cursor: 'pointer' }}
                  >
                    You're eligible to join the Trading Contest! Click here to
                    read more!
                  </Typography.Text>
                }
              >
                <Button
                  onClick={() => onChange(symbol)}
                  className={symbol === value ? 'token-selected' : undefined}
                >
                  <Space>
                    {symbol.toUpperCase()}
                    {symbol !== 'sol' && '🔥'}
                  </Space>
                </Button>
              </Tooltip>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default TokenToBuy
