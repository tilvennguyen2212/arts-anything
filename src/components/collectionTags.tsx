import { Space, Tag } from 'antd'
import { PresetColorType, PresetColorTypes } from 'antd/lib/_util/colors'
import { useCollection } from 'hooks/useCollection'

export type CollectionTagsProps = { symbol: string; size?: number }

const getRandomColor = (seed: string = 'default'): PresetColorType => {
  const buf = Buffer.from(seed, 'utf8')
  const index = buf[0] % PresetColorTypes.length
  return PresetColorTypes[index]
}

const CollectionTags = ({ symbol, size = 0 }: CollectionTagsProps) => {
  const {
    collection: { categories },
  } = useCollection(symbol)

  return (
    <Space wrap={true} size={size}>
      {categories
        .filter((category) => !!category)
        .map((category, index) => (
          <Tag key={index} color={getRandomColor(category)}>
            <span style={{ fontWeight: 800 }}>{category}</span>
          </Tag>
        ))}
    </Space>
  )
}

export default CollectionTags
