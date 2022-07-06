import { Avatar } from 'antd'

import IMAGE_DEFAULT from 'static/images/nft-default.svg'

export type ImageNFTProps = {
  src?: string
  size?: number
}

const ImageNFT = ({ src = IMAGE_DEFAULT, size }: ImageNFTProps) => {
  return <Avatar shape="square" src={src} size={size} />
}

export default ImageNFT
