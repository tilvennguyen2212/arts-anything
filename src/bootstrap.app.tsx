import { Provider } from 'react-redux'
import {
  WalletProvider,
  UIProvider,
  AccountProvider,
  MintProvider,
} from '@sentre/senhub'

import View from 'view'

import model from 'model'
import configs from 'configs'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  return (
    <UIProvider appId={appId} antd={{ prefixCls: appId }}>
      <WalletProvider>
        <MintProvider>
          <AccountProvider>
            <Provider store={model}>
              <View />
            </Provider>
          </AccountProvider>
        </MintProvider>
      </WalletProvider>
    </UIProvider>
  )
}

export * from 'static.app'
