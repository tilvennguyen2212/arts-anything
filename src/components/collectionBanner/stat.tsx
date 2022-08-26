import { util } from '@sentre/senhub'

import { Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { useStat } from 'hooks/useStat'

type StatElementProps = { title?: string; value?: number }

const StatElement = ({ title = '', value = 0 }: StatElementProps) => {
  return (
    <Space align="center" direction="vertical" size={4}>
      <Typography.Title level={4}>
        <IonIcon style={{ fontSize: 16, marginRight: 6 }} name="logo-solana" />
        <span>{util.numeric(value).format('0,0.[000]')}</span>
      </Typography.Title>
      <Typography.Text type="secondary" className="caption">
        {title}
      </Typography.Text>
    </Space>
  )
}

export type StatProps = { symbol: string }

const Stat = ({ symbol }: StatProps) => {
  const { stat } = useStat(symbol)

  return (
    <Row gutter={[8, 24]} justify="space-around">
      <Col>
        <StatElement title="Floor Price" value={stat.floorPrice / 10 ** 9} />
      </Col>
      <Col>
        <StatElement
          title="Average Price"
          value={stat.avgPrice24hr / 10 ** 9}
        />
      </Col>
      <Col>
        <StatElement title="Total Volume" value={stat.volumeAll / 10 ** 9} />
      </Col>
    </Row>
  )
}

export default Stat
