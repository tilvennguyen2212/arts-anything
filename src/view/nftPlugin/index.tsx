import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWalletAddress, util } from '@sentre/senhub'
import { OTC } from '@sentre/otc-sdk'

import { Alert, Button, Col, Modal, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import MagicEdenTitle from './magicEdenTitle'
import CardNFT from './cardNFT'
import TokenToBuy from './tokenToBuy'
import InfoNFT from './infoNFT'

import { AppDispatch, AppState } from 'model'
import { magicEdenSDK } from 'model/collections.controller'
import usePriceExchange from 'hooks/usePriceExchange'
import { Events, setCongratulation } from 'model/event.controller'
// import { useGetTxCreateTicket } from 'hooks/useGetTxCreateTicket'

const otcSDK = new OTC()
const NETWORK_FEE = 0.00001
const CREATE_ACCOUNT_FEE = 0.00203928 + 0.00201144

export type NFTPluginProps = {
  symbol: string
  mintAddress: string
  visible?: boolean
  onClose: () => void
}

const NFTPlugin = ({
  symbol,
  mintAddress,
  visible = false,
  onClose = () => {},
}: NFTPluginProps) => {
  const [loading, setLoading] = useState(false)
  const [counter, setCounter] = useState<number | string>(0)
  const [tokenSymbol, setTokenSymbol] = useState('sol')
  const dispatch = useDispatch<AppDispatch>()
  const { seller, sellerReferral, price, tokenMint, auctionHouse } =
    useSelector((state: AppState) => state.listing[symbol][mintAddress])
  const walletAddress = useWalletAddress()
  // const getTxCreateTicket = useGetTxCreateTicket()

  const tokenName = useMemo(() => tokenSymbol.toUpperCase(), [tokenSymbol])
  const priceNFT = price + NETWORK_FEE + CREATE_ACCOUNT_FEE
  const { estPrice, validBuy } = usePriceExchange(priceNFT, tokenSymbol)

  const onCongrats = useCallback(
    () => dispatch(setCongratulation(Events.None)),
    [dispatch],
  )

  const onBuy = useCallback(async () => {
    try {
      setLoading(true)
      const { wallet } = window.sentre
      let txs = []
      if (tokenSymbol !== 'sol') {
        const setupTransaction = await otcSDK.exchange({
          walletAddress,
          tokenSymbol,
          solAmount: priceNFT,
        })
        txs.push(setupTransaction)
      }
      const buyNowTransaction = await magicEdenSDK.buyNow({
        buyerAddress: walletAddress,
        sellerAddress: seller,
        auctionHouseAddress: auctionHouse,
        sellerReferralAddress: sellerReferral,
        mintAddress: tokenMint,
        price,
      })
      txs.push(buyNowTransaction)
      // Add lottery ticket
      // const txCreateTicket = await getTxCreateTicket(
      //   buyNowTransaction.serializeMessage(),
      // )
      // txs.push(txCreateTicket)

      const signedTxs = await wallet.signAllTransactions(txs)
      let txId = ''
      for (let i = 0; i < signedTxs.length; i++) {
        const signedTx = signedTxs[i]
        const commitment =
          i === signedTxs.length - 1 ? 'finalized' : 'confirmed'
        txId = await magicEdenSDK.sendAndConfirm(signedTx, commitment)
        setCounter(i + 1)
      }
      onClose()
      window.notify({
        type: 'success',
        description: `Successfully buy the NFT. Click to view details.`,
        onClick: () => window.open(util.explorer(txId), '_blank'),
      })
      return onCongrats()
    } catch (er: any) {
      return window.notify({
        type: 'error',
        description: er.response?.data?.message || er.message,
      })
    } finally {
      setCounter(0)
      return setLoading(false)
    }
  }, [
    tokenSymbol,
    walletAddress,
    seller,
    auctionHouse,
    sellerReferral,
    tokenMint,
    price,
    // getTxCreateTicket,
    priceNFT,
    onCongrats,
    onClose,
  ])

  return (
    <Modal
      className="modal-nft-plugin"
      open={visible}
      footer={false}
      onCancel={onClose}
      width={368}
      closeIcon={<IonIcon name="close-outline" />}
      bodyStyle={{ padding: 16 }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <MagicEdenTitle />
        </Col>
        <Col span={24}>
          <CardNFT symbol={symbol} mintAddress={mintAddress} />
        </Col>
        <Col span={24}>
          <InfoNFT symbol={symbol} mintAddress={mintAddress} />
        </Col>
        <Col span={24}>
          <TokenToBuy value={tokenSymbol} onChange={setTokenSymbol} />
        </Col>
        <Col span={24}>
          <Alert
            message={`Estimated payment is ${util
              .numeric(estPrice)
              .format('0,0.[0000]')} ${tokenName}.`}
            type="info"
            showIcon
          />
        </Col>
        {!validBuy && (
          <Col span={24}>
            <Alert
              message={`Not enough ${tokenName} in your balance. Please add more ${tokenName}, or select another token!`}
              type="warning"
              showIcon
            />
          </Col>
        )}
        <Col span={24}>
          <Button
            type="primary"
            onClick={onBuy}
            loading={loading}
            block
            disabled={!validBuy}
          >
            Buy Now {loading && `(${counter}/3 confirmations)`}
          </Button>
        </Col>
        {/* <Col span={24}>
            <Button type="text" block>
              Search NFT
            </Button>
          </Col> */}
      </Row>
    </Modal>
  )
}

export default NFTPlugin
