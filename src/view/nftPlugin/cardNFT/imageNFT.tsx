import { Image } from 'antd'

import IMAGE_DEFAULT from 'static/images/nft.jpeg'

type ImageNFTProps = {
  src?: string
  size?: number
}

const ImageNFT = ({ src, size = undefined }: ImageNFTProps) => {
  return (
    <Image
      className={`square-image`}
      src={src || IMAGE_DEFAULT}
      preview={false}
      style={{ borderRadius: 4 }}
      height={size}
      width={size}
    />
  )
}

export default ImageNFT
