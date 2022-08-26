import { MouseEvent } from 'react'

import { Button, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { useCollection } from 'hooks/useCollection'

export type CollectionSocialProps = { symbol: string }

const CollectionSocial = ({ symbol }: CollectionSocialProps) => {
  const {
    collection: { website, twitter, discord },
  } = useCollection(symbol)

  const onSocialMedia = (e: MouseEvent<HTMLElement>, url: string) => {
    e.stopPropagation()
    return window.open(url, '_blank')
  }

  return (
    <Space size={0}>
      <Button
        type="text"
        icon={<IonIcon name="earth-outline" />}
        onClick={(e) => onSocialMedia(e, website)}
        disabled={!website}
      />
      <Button
        type="text"
        icon={<IonIcon name="logo-twitter" />}
        onClick={(e) => onSocialMedia(e, twitter)}
        disabled={!twitter}
      />
      <Button
        type="text"
        icon={<IonIcon name="logo-discord" />}
        onClick={(e) => onSocialMedia(e, discord)}
        disabled={!discord}
      />
    </Space>
  )
}

export default CollectionSocial
