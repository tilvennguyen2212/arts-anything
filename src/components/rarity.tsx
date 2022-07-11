import { useMemo } from 'react'
import { useUI } from '@sentre/senhub'

import { Avatar, Card, Space, Tooltip, Typography } from 'antd'

import { MagicEdenRarity } from 'sdk/magicEdenSDK'

export const RANKS: Record<keyof MagicEdenRarity, string> = {
  moonrank: 'https://moonrank.app/static/favicon.ico',
  howrare: 'https://howrare.com/img/logo.png',
}

export type RarityProps = {
  name: keyof MagicEdenRarity
  rank: number
}

const Rarity = ({ name, rank }: RarityProps) => {
  const {
    ui: { width },
  } = useUI()
  const isMobile = useMemo(() => width < 768, [width])

  return (
    <Tooltip title={name}>
      <Card
        bodyStyle={{ padding: isMobile ? 4 : 8, cursor: 'pointer' }}
        style={{ minWidth: 60, maxWidth: 96 }}
      >
        <Space>
          <Avatar shape="circle" size={isMobile ? 16 : 24} src={RANKS[name]} />
          <Space>
            <Typography.Text>{rank}</Typography.Text>
          </Space>
        </Space>
      </Card>
    </Tooltip>
  )
}
export default Rarity
