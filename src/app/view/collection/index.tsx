import { Col, Row } from 'antd'
import { useCollection } from 'app/hooks/useCollection'

const Collection = () => {
  const { symbol } = useCollection()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>{symbol}</Col>
    </Row>
  )
}

export default Collection
