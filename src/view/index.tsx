import { Route, Switch } from 'react-router-dom'

import { Row, Col } from 'antd'
import Collections from './collections'
import Collection from './collection'

import { useRoute } from 'hooks/useRoute'

import 'static/styles/light.less'
import 'static/styles/dark.less'

const View = () => {
  const { extend } = useRoute()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Switch>
          <Route exact path={extend('/')} component={Collections} />
          <Route exact path={extend('/:symbol')} component={Collection} />
        </Switch>
      </Col>
      <Col span={24} />
    </Row>
  )
}

export default View
