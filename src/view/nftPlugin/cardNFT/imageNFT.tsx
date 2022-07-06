import { Avatar } from 'antd'

import IMAGE_DEFAULT from 'static/images/nft-default.svg'

type ImageNFTProps = {
  src?: string
  size?: number
}

const ImageNFT = ({ src, size = undefined }: ImageNFTProps) => {
  return <Avatar shape="square" src={src || IMAGE_DEFAULT} size={size} />
}

export default ImageNFT
