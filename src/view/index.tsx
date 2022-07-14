import { Route, Switch } from 'react-router-dom'
import { net } from '@sentre/senhub'

import { Row, Col, Typography, Space } from 'antd'
import TextLoop from 'react-text-loop'
import Collections from './collections'
import Collection from './collection'

import { useRoute } from 'hooks/useRoute'
import configs from 'configs'

import 'static/styles/light.less'
import 'static/styles/dark.less'

const {
  payment: { whitelist },
} = configs

const View = () => {
  const { extend } = useRoute()

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24} style={{ maxWidth: 1200 }}>
        <Row gutter={[24, 24]} justify="center">
          <Col style={{ marginTop: 64, marginBottom: 64 }}>
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
          {net === 'mainnet' ? (
            <Col span={24}>
              <Switch>
                <Route exact path={extend('/')} component={Collections} />
                <Route exact path={extend('/:symbol')} component={Collection} />
              </Switch>
            </Col>
          ) : (
            <Col span={24} style={{ textAlign: 'center' }}>
              <Space direction="vertical">
                <Typography.Title level={2}>
                  ⚠️ Only supported on Solana mainnet.
                </Typography.Title>
                <Typography.Text>
                  You can open the Control Center, switch to mainnet, and
                  experience the application.
                </Typography.Text>
              </Space>
            </Col>
          )}
        </Row>
      </Col>
      <Col span={24} />
    </Row>
  )
}

export default View
