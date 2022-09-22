import { toUtf8 } from '@cosmjs/encoding'
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx'

export const makeExecuteMessage = ({
  senderAddress,
  contractAddress,
  message,
  funds,
}) => {
    const encodeObj = {
        typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
        value: MsgExecuteContract.fromPartial({
          sender: senderAddress,
          contract: contractAddress,
          msg: toUtf8(JSON.stringify(message)),
          funds: funds || [],
        }),
    }

    return encodeObj
}