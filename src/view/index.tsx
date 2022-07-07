import { Route, Switch } from 'react-router-dom'
import { net } from '@sentre/senhub'

import { Row, Col, Typography } from 'antd'
import TextLoop from 'react-text-loop'
import Collections from './collections'
import Collection from './collection'

import { useRoute } from 'hooks/useRoute'
import { CACHED_WHITELIST } from 'sdk/otcSDK'

import 'static/styles/light.less'
import 'static/styles/dark.less'

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
                {Object.values(CACHED_WHITELIST).map(
                  ({ address, url, symbol }) => (
                    <a
                      key={address}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="gradient-text"
                    >
                      {symbol}
                    </a>
                  ),
                )}
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
              <Typography.Title>
                The application is only supported on mainnet.
              </Typography.Title>
            </Col>
          )}
        </Row>
      </Col>
      <Col span={24} />
    </Row>
  )
}

export default View
