import { useCallback, useEffect, useState } from 'react'
import { useAppRoute } from '@sentre/senhub'

import { Avatar, Col, Empty, Input, Popover, Row, Spin, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { MagicEdenCollection, MIN_SEARCH_LENGTH } from 'sdk/magicEdenSDK'
import { magicEdenSDK } from 'model/collections.controller'

let timeoutId: NodeJS.Timeout | undefined = undefined

export type SearchResultProps = {
  loading: Boolean
  collections?: MagicEdenCollection[]
}
export const SearchResult = ({ loading, collections }: SearchResultProps) => {
  const { to } = useAppRoute()
  const onView = useCallback(
    (symbol: string) => {
      if (symbol) return to(`/${symbol}`)
    },
    [to],
  )

  if (loading || !collections)
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
    <Row gutter={[24, 24]}>
      {collections.map((data) => (
        <Col key={data.symbol} span={24}>
          <Row
            gutter={[24, 24]}
            align="middle"
            wrap={false}
            style={{ cursor: 'pointer' }}
            onClick={() => onView(data.symbol)}
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
        </Col>
      ))}
    </Row>
  )
}

const Search = () => {
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [data, setData] = useState<MagicEdenCollection[] | undefined>()

  useEffect(() => {
    setLoading(true)
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(async () => {
      try {
        if (!keyword || keyword.length <= MIN_SEARCH_LENGTH)
          return setData(undefined)
        const data = await magicEdenSDK.searchCollections(keyword)
        return setData(data)
      } catch (er: any) {
        return setData(undefined)
      } finally {
        return setLoading(false)
      }
    }, 1000)
  }, [keyword])

  return (
    <Popover
      placement="bottom"
      overlayStyle={{ width: 300 }}
      trigger="focus"
      content={<SearchResult loading={loading} collections={data} />}
    >
      <Input
        size="large"
        suffix={<IonIcon name="search-outline" />}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value || '')}
        placeholder="Search by Symbols"
      />
    </Popover>
  )
}

export default Search
