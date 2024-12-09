import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetOverlayAnchor } from 'plasmo'
import { sendToBackground } from '@plasmohq/messaging';
import { usePort } from '@plasmohq/messaging/hook';
import { ProductEventEnum } from '~background/messages/product';
import { useStorage } from "@plasmohq/storage/hook"

export const config: PlasmoCSConfig = {
    matches: ["https://*.shopee.co.id/portal/product/list/live*"],
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
    element: document.querySelector('#app > div.app-container > div.page-container.responsive-container.has-sidebar-panel > div > div > div > div > div.product-list-main > div > div.list-active > div > div.list-header'),
    insertPosition: 'afterend',
})

const intervalGetCheckbox = () => new Promise(resolve => {
    const interval = setInterval(() => {
        const item = document.getElementsByClassName('product-checkbox');
        if (item.length) {
            clearInterval(interval);
            resolve(item);
        }
    }, 137)
})

function ShopeeProductsUI() {

    const [ids, setIds] = useState([]);

    const mailPort = usePort('mails');
    const [SSS] = useStorage('MIRZA_STORAGE');
    const [shopeeHeaders] = useStorage('SHOPEE_HEADERS');
    const [shopeeCookies] = useStorage('SHOPEE_COOKIES');
    const [shopeeCookiesObj] = useStorage('SHOPEE_COOKIES_OBJ');
    
    useEffect(() => {
        console.log('SSS', SSS);
    }, [SSS]);

    useEffect(() => {
        console.log('SHOPEE_HEADERS', shopeeHeaders);
    }, [shopeeHeaders])
    useEffect(() => {
        console.log('SHOPEE_COOKIES', shopeeCookies);
    }, [shopeeCookies])
    useEffect(() => {
        if(shopeeCookiesObj) {
            console.log('SHOPEE_COOKIES_OBJ', JSON.parse(shopeeCookiesObj));
        }
    }, [shopeeCookiesObj])

    const onListChanges = (id, checked) => {
        setIds(oldIds => {
            let newIds = [...oldIds];
            if (checked) {
                newIds = [...newIds, id];
            } else {
                newIds = newIds.filter(i => i !== id);
            }
            return newIds;
        });
    }
    const productCheckboxes = useRef([]);

    const getChecks = async () => {
        const checkboxes = await intervalGetCheckbox();
        if (checkboxes.length) {
            for (var i = 0; i < checkboxes.length; i++) {
                const item = checkboxes[i].querySelector('label > input');
                if (item) {
                    productCheckboxes.current.push(item);
                    item.addEventListener('change', onCheckboxChange)
                }
            }
        }
    };
    const onCheckboxChange = e => {
        onListChanges(e.target.value, e.target.checked);
    };

    const subs = () => {
        for (var i = 0; i < productCheckboxes.current.length; i++) {
            productCheckboxes.current[i].addEventListener('change', onCheckboxChange)
        }
    }
    const callInitCookies = async () => {
        const resp = await sendToBackground({
            name: 'utils', body: {
                type: 'initCookies',
                domain: 'shopee.co.id'
            }
        })

        console.log('COOKIE INITIALIZE', resp);
    }

    const callTestPort = async () => {
        mailPort.send({hello: "World"});
    }
    const getStorage = async () => {

    }

    useEffect(() => {
        const portListener = mailPort.listen(portMessage => {
            console.log('PORT MESSAGE', portMessage);
        });
        return () => {
            portListener.disconnect();
        }
    }, []);


    const boostProducts = (e) => {
        e.preventDefault();
        console.log('BOOSTING PRODUCTS', ids);
    }

    // getChecks();
    useEffect(() => {
        getChecks();
        callInitCookies();
    }, []);

    useEffect(() => {
        subs();
    }, [productCheckboxes.current]);

    return (
        <div style={{ width: '100%', height: 100, background: 'pink' }}>
            {ids.join(',')}
            <br />
            <button
                onClick={async () => {
                    const resp = await sendToBackground({
                        name: "product",
                        body: {
                            type: ProductEventEnum.BOOST,
                            productId: ids[0],
                        }
                    })
                    console.log({ resp });
                }}>
                Hash TX
            </button>
            <button
                onClick={boostProducts}>
                Boost Produk Terpilih ({ids.length})
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    callInitCookies();
                }}>
                INIT COOKIES
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    callTestPort();
                }}>
                TEST PORT
            </button>
        </div>
    )
}

export default ShopeeProductsUI