import { Route, Switch } from 'react-router-dom'
import { net, useAppRoute } from '@sentre/senhub'

import { Row, Col } from 'antd'
import Collections from './collections'
import Collection from './collection'
import MainnetOnly from 'components/mainnetOnly'
import HeroBanner from 'components/heroBanner'
import PopularCollections from './popularCollections'

import 'static/styles/light.less'
import 'static/styles/dark.less'

const View = () => {
  const { extend } = useAppRoute()

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24} style={{ maxWidth: 1200 }}>
        <Row gutter={[24, 24]}>
          <Col span={24} style={{ marginTop: 64, marginBottom: 64 }}>
            <HeroBanner />
          </Col>
          <Col span={24} style={{ marginBottom: 32 }}>
            <PopularCollections />
          </Col>
          {net === 'mainnet' ? (
            <Col span={24}>
              <Switch>
                <Route exact path={extend('/')} component={Collections} />
                <Route exact path={extend('/:symbol')} component={Collection} />
              </Switch>
            </Col>
          ) : (
            <Col span={24}>
              <MainnetOnly />
            </Col>
          )}
        </Row>
      </Col>
      <Col span={24} />
    </Row>
  )
}

export default View
