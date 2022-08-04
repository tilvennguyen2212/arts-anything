import { useCallback, useEffect, useState } from 'react'
import { useAppRoute } from '@sentre/senhub'

import { Avatar, Col, Empty, Input, Popover, Row, Spin, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { MagicEdenCollection } from 'sdk/magicEdenSDK'
import { magicEdenSDK } from 'model/collections.controller'
import configs from 'configs'

const {
  manifest: { appId },
} = configs
let timeoutId: NodeJS.Timeout | undefined = undefined

export type SearchResultProps = {
  loading: Boolean
  data?: MagicEdenCollection
}
export const SearchResult = ({ loading, data }: SearchResultProps) => {
  const { to } = useAppRoute(appId)
  const onView = useCallback(() => {
    if (data?.symbol) return to(`/${data.symbol}`)
  }, [to, data])

  if (loading || !data)
    return (
      <Row gutter={[24, 24]} justify="center">
        <Col>
          {loading ? (
            <Spin style={{ margin: 16 }} />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Col>
      </Row>
    )
  return (
    <Row
      gutter={[24, 24]}
      align="middle"
      wrap={false}
      style={{ cursor: 'pointer' }}
      onClick={onView}
    >
      <Col>
        <Avatar shape="square" size={56} src={data.image} />
      </Col>
      <Col flex="auto">
        <Row gutter={[4, 4]}>
          <Col span={24}>
            <Typography.Title level={5}>{data.name}</Typography.Title>
          </Col>
          <Col span={24}>
            <Typography.Paragraph
              style={{ margin: 0 }}
              type="secondary"
              ellipsis
            >
              {data.description}
            </Typography.Paragraph>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const Search = () => {
  const [loading, setLoading] = useState(false)
  const [symbol, setSymbol] = useState('')
  const [data, setData] = useState<MagicEdenCollection | undefined>()

  useEffect(() => {
    setLoading(true)
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(async () => {
      try {
        if (!symbol || symbol.length <= 3) return setData(undefined)
        const data = await magicEdenSDK.getCollection(symbol.toLowerCase())
        return setData(data)
      } catch (er: any) {
        return setData(undefined)
      } finally {
        return setLoading(false)
      }
    }, 1000)
  }, [symbol])

  return (
    <Popover
      placement="bottom"
      overlayStyle={{ width: 300 }}
      trigger="focus"
      content={<SearchResult loading={loading} data={data} />}
    >
      <Input
        size="large"
        suffix={<IonIcon name="search-outline" />}
        value={symbol}
        onChange={(e) => setSymbol(e.target.value || '')}
        placeholder="Search by Symbols"
      />
    </Popover>
  )
}

export default Search
