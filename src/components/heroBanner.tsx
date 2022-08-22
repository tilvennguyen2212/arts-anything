import { Row, Col, Typography } from 'antd'
import TextLoop from 'react-text-loop'

import configs from 'configs'

const {
  payment: { whitelist },
} = configs

const HeroBanner = () => {
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col>
        <Typography.Text style={{ fontSize: 64, fontWeight: 900 }}>
          Buy NFTs by{' '}
          <TextLoop>
            {Object.values(whitelist).map(({ address, url, symbol }) => (
              <a
                key={address}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="gradient-text"
              >
                {symbol}
              </a>
            ))}
          </TextLoop>
          .
        </Typography.Text>
      </Col>
    </Row>
  )
}

export default HeroBanner
