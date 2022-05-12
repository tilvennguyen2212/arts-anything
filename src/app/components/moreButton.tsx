import { Button } from 'antd'
import IonIcon from 'shared/antd/ionicon'

export type MoreButtonProps = {
  onMore?: () => void
  loading?: boolean
  disabled?: boolean
}

const MoreButton = ({
  onMore = () => {},
  loading = false,
  disabled = false,
}: MoreButtonProps) => {
  return (
    <Button
      type="text"
      onClick={onMore}
      loading={loading}
      disabled={disabled}
      icon={<IonIcon name="caret-down-outline" />}
    >
      More
    </Button>
  )
}

export default MoreButton
