import { useSelector } from 'react-redux'

import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { AppState } from 'model'
import SolLogo from 'static/images/sol-logo.svg'
import './index.less'
import { useAppRoute } from '@sentre/senhub/dist'
import { useCollection } from 'hooks/useCollection'
import { useMemo } from 'react'

export type MyNFTCardProps = {
  mintAddress: string
  onSell?: (mintAddress: string) => void
  onCancel?: (mintAddress: string) => void
}

const MyNFTCard = ({
  mintAddress,
  onSell = () => {},
  onCancel = () => {},
}: MyNFTCardProps) => {
  const {
    image,
    name,
    collection: symbol,
    listStatus,
  } = useSelector((state: AppState) => state.mine[mintAddress])
  const {
    loading,
    collection: { image: collectionImage },
  } = useCollection({ symbol })
  const { to } = useAppRoute()
  const selling = useMemo(() => listStatus === 'listed', [listStatus])

  return (
    <Card
      cover={
        <div>
          <img width="100%" height="100%" alt={name} src={image} />
          {selling && (
            <Button
              shape="circle"
              className="selling-button"
              icon={<IonIcon name="close" />}
            />
          )}
        </div>
      }
      bodyStyle={{ padding: 16 }}
      bordered={false}
      hoverable
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space onClick={() => to(`/${symbol}`)} style={{ cursor: 'pointer' }}>
            {!loading ? (
              <Avatar src={collectionImage} />
            ) : (
              <Skeleton.Avatar active />
            )}
            {name ? (
              <Typography.Title level={5} ellipsis>
                {name}
              </Typography.Title>
            ) : (
              <Skeleton
                paragraph={{ rows: 1 }}
                title={false}
                round
                active
                loading
              />
            )}
          </Space>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]} wrap={false}>
            <Col flex="auto"></Col>
            <Col>
              {selling ? (
                <Button type="text" onClick={() => onCancel(mintAddress)}>
                  Cancel
                </Button>
              ) : (
                <Button type="primary" onClick={() => onSell(mintAddress)}>
                  Sell
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default MyNFTCard
