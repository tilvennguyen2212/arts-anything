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
  onCancel?: (mintAddress: string, price: string) => void
  loading?: boolean
}

const MyNFTCard = ({
  mintAddress,
  onSell = () => {},
  onCancel = () => {},
  loading = false,
}: MyNFTCardProps) => {
  const [price, setPrice] = useState('')
  const {
    image,
    name,
    collection: symbol,
    listStatus,
    price: listedPrice,
  } = useSelector((state: AppState) => state.mine[mintAddress])
  const {
    collection: { image: collectionImage },
  } = useCollection(symbol)
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
              icon={<IonIcon name="cash-outline" />}
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
          {name ? (
            <Space
              onClick={() => to(`/${symbol}`)}
              style={{ cursor: 'pointer' }}
            >
              <Avatar src={collectionImage} />
              <Typography.Title level={5} ellipsis>
                {name}
              </Typography.Title>
            </Space>
          ) : (
            <Skeleton
              paragraph={{ rows: 1 }}
              title={false}
              avatar
              round
              active
              loading
            />
          )}
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]} wrap={false}>
            <Col flex="auto">
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
                value={selling ? String(listedPrice) : price}
                onChange={(value) => setPrice(value)}
                readOnly={selling}
                controls={false}
              />
            </Col>
            <Col>
              <Button
                type={!selling ? 'primary' : 'default'}
                onClick={() =>
                  !selling
                    ? onSell(mintAddress, price)
                    : onCancel(mintAddress, String(listedPrice))
                }
                loading={loading}
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
