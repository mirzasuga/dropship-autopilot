import { useState } from "react"

import { sendToBackground, sendToContentScript } from "@plasmohq/messaging"
import { ProductEventEnum } from "~background/messages/product"

function IndexPopup() {
  const [txHash, setTxHash] = useState(undefined)
  const [txInput, setTxInput] = useState(0)
  const [selector, setSelector] = useState("#itero")

  const [csResponse, setCsData] = useState("")

  return (
    <div>
      <input
        type="number"
        value={txInput}
        onChange={(e) => setTxInput(e.target.valueAsNumber)}
      />

      <button
        onClick={async () => {
          const resp = await sendToBackground({
            name: "product",
            body: {
              type: ProductEventEnum.BOOST,
              id: txInput
            }
          })
          console.log({resp});
          setTxHash(resp.data.id)
        }}>
        Hash TX
      </button>

      <p>TX HASH: {txHash}</p>
      <hr />

      <input value={selector} onChange={(e) => setSelector(e.target.value)} />

      <button
        onClick={async () => {
          const csResponse = await sendToContentScript({
            name: "query-selector-text",
            body: selector
          })
          setCsData(csResponse)
        }}>
        Query Text on Web Page
      </button>
      <br />
      <label>Text Data:</label>
      <p>{csResponse}</p>
      <footer>Crafted by @PlasmoHQ</footer>
    </div>
  )
}

export default IndexPopup