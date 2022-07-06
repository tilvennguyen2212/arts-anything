import { Route, Switch } from 'react-router-dom'

import { Row, Col, Typography } from 'antd'
import TextLoop from 'react-text-loop'
import Collections from './collections'
import Collection from './collection'

import { useRoute } from 'hooks/useRoute'
import { ACCEPTED_TOKENS } from 'sdk/magicEdenSDK'

import 'static/styles/light.less'
import 'static/styles/dark.less'

const View = () => {
  const { extend } = useRoute()

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24} />
      <Col span={24} style={{ maxWidth: 1200 }}>
        <Row gutter={[24, 24]} justify="center">
          <Col>
            <Typography.Text style={{ fontSize: 56, fontWeight: 900 }}>
              Buy NFTs by{' '}
              <TextLoop>
                {Object.values(ACCEPTED_TOKENS).map(
                  ({ address, url, symbols }) => (
                    <a
                      key={address}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {symbols}
                    </a>
                  ),
                )}
              </TextLoop>
              .
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Switch>
              <Route exact path={extend('/')} component={Collections} />
              <Route exact path={extend('/:symbol')} component={Collection} />
            </Switch>
          </Col>
        </Row>
      </Col>
      <Col span={24} />
    </Row>
  )
}

export default View
