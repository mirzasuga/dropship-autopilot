import type {
    PlasmoCSConfig,
    PlasmoCSUIJSXContainer,
    PlasmoCSUIProps,
    PlasmoRender
} from "plasmo"
import type { FC } from "react"
import { createRoot } from "react-dom/client"

export const config: PlasmoCSConfig = {
    matches: ["https://*.shopee.co.id/portal/product/list/live*"]
}

export const getRootContainer = () =>
    new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            const rootContainerParent = document.querySelector(`#app > div.app-container > div.page-container.responsive-container.has-sidebar-panel > div > div > div > div > div.product-list-main > div > div.list-active > div > div.product-list-section.product-and-pagination-wrap-v2.grid-mode`)
            if (rootContainerParent) {
                console.log('DAPET');
                clearInterval(checkInterval)
                const rootContainer = document.createElement("div")
                rootContainerParent.appendChild(rootContainer)
                resolve(rootContainer)
            }
        }, 137)
    })

const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
    return (
        <span
            style={{
                borderRadius: 4,
                background: "yellow",
                padding: 4,
                position: "absolute",
                top: 0,
                left: 0,
                transform: "translateY(-24px) translateX(42px)"
            }}>
            CSUI ROOT CONTAINER
        </span>
    )
}

export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
    createRootContainer
}) => {
    const rootContainer = await createRootContainer()
    const root = createRoot(rootContainer)
    root.render(<PlasmoOverlay />)
}

export default PlasmoOverlay