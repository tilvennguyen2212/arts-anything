import { Avatar, Card, Space, Tooltip, Typography } from 'antd'

import { MagicEdenRarity } from 'app/sdk/magicEdenSDK'

export const RANKS: Record<keyof MagicEdenRarity, string> = {
  moonrank: 'https://moonrank.app/static/moonrank_icon.png',
  howrare: 'https://howrare.com/img/logo.png',
}

export type RarityProps = {
  name: keyof MagicEdenRarity
  rank: number
}

const Rarity = ({ name, rank }: RarityProps) => {
  return (
    <Tooltip title={name}>
      <Card
        bodyStyle={{ padding: 8, cursor: 'pointer' }}
        style={{ minWidth: 80, maxWidth: 96 }}
      >
        <Space>
          <Avatar shape="circle" size="small" src={RANKS[name]} />
          <Space>
            <Typography.Text>{rank}</Typography.Text>
          </Space>
        </Space>
      </Card>
    </Tooltip>
  )
}
export default Rarity
