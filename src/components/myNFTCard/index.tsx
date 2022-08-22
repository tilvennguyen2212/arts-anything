import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppRoute } from '@sentre/senhub'

import {
  Avatar,
  Button,
  Card,
  Col,
  InputNumber,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { AppState } from 'model'
import { useCollection } from 'hooks/useCollection'
import SolLogo from 'static/images/sol-logo.svg'
import './index.less'

export type MyNFTCardProps = {
  mintAddress: string
  onSell?: (mintAddress: string, price: string) => void
  onCancel?: (mintAddress: string) => void
}

const MyNFTCard = ({
  mintAddress,
  onSell = () => {},
  onCancel = () => {},
}: MyNFTCardProps) => {
  const [price, setPrice] = useState('')
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
            <Col flex="auto">
              {!selling && (
                <InputNumber
                  addonAfter={
                    <Avatar
                      shape="square"
                      src={SolLogo}
                      size={18}
                      style={{ padding: 3 }}
                    />
                  }
                  placeholder="Price in SOL"
                  value={price}
                  onChange={(value) => setPrice(value)}
                  readOnly={selling}
                  controls={false}
                />
              )}
            </Col>
            <Col>
              <Button
                type={!selling ? 'primary' : 'text'}
                onClick={() =>
                  !selling ? onSell(mintAddress, price) : onCancel(mintAddress)
                }
              >
                {!selling ? 'Sell' : 'Cancel'}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default MyNFTCard
