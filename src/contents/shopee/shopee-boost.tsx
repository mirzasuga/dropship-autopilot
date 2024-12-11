import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetOverlayAnchor } from 'plasmo'
import cssText from "data-text:~style.css"

export const config: PlasmoCSConfig = {
    matches: ["https://seller.shopee.co.id/portal/product/list/live*"],
}

enum ShopeeProductListType {
    GRID = 'grid-mode',
    LIST = 'list',
}

enum ElementInitStatus {
    IDLE = 'IDLE',
    SEARCHING = 'SEARCHING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
    element: document.querySelector('#app > div.app-container > div.page-container.responsive-container.has-sidebar-panel > div > div > div > div > div.product-list-main > div > div.list-active > div > div.list-header'),
    insertPosition: 'afterend',
})

const getElementCheckbox = () => new Promise(resolve => {
    const interval = setInterval(() => {
        const item = document.querySelectorAll('.product-checkbox > label > input');
        if (item.length) {
            clearInterval(interval);
            resolve(item);
        }
    }, 137)
});

const getElementProductListContainer = (): Promise<{ element: any, type: ShopeeProductListType } | null> => new Promise((resolve, reject) => {
    var tried = 0;
    const selector = 'div.product-list-section.product-and-pagination-wrap-v2';
    const interval = setInterval(() => {
        tried = tried + 1;
        const item = document.querySelector(selector)
        if (tried >= 10) {
            clearInterval(interval);
            reject(`Failed get element Product List Container: ${selector}`)
        }
        if (item) {
            clearInterval(interval);
            const listType = item.classList.contains(ShopeeProductListType.GRID) ? ShopeeProductListType.GRID : ShopeeProductListType.LIST;
            resolve({ type: listType, element: item });
        }
    }, 137);
})

const getElementProductItem = (parent = null, type: ShopeeProductListType): Promise<HTMLElement[]> => new Promise((resolve, reject) => {
    const _target = parent ? parent : document;
    const selector = type === ShopeeProductListType.GRID ? '.product-card-item.grid' : 'div.eds-table.product-list-view.mpsku-list > div.eds-table__body-container > div.eds-table__main-body > div > div > div.eds-scrollbar__content > table > tbody > tr';
    var tried = 0;
    const interval = setInterval(() => {
        tried = tried + 1;
        const items = _target.querySelectorAll(selector);
        if (tried >= 10) {
            clearInterval(interval);
            reject(`Failed get element Product List Container: ${selector}`)
        }

        if (items.length) {
            clearInterval(interval);
            resolve(items);
        }
    }, 137);
})

const getElementProductItemCheckbox = (parent = null, type: ShopeeProductListType): Promise<HTMLElement> => new Promise((resolve, reject) => {
    const _target = parent ? parent : document;
    const selector = type === ShopeeProductListType.GRID ? '.product-checkbox > label > input' : 'label > input';
    var tried = 0;

    const interval = setInterval(() => {
        tried = tried + 1;
        const items = _target.querySelectorAll(selector);
        if (tried >= 10) {
            clearInterval(interval);
            reject(`Failed get element Product List Container: ${selector}`);
        }

        if (items.length) {
            clearInterval(interval);
            resolve(items);
        }
    }, 137);
});

function ShopeeBoostUI() {

    const [productIds, setProductIds] = useState([]);

    const [initStatus, setInitStatus] = useState<ElementInitStatus>(ElementInitStatus.IDLE);

    const elmProductCheckboxes = useRef<HTMLElement[]>([]);

    const onListChanges = (id, checked) => {
        setProductIds(oldIds => {
            let newIds = [...oldIds];
            if (checked) {
                newIds = [...newIds, id];
            } else {
                newIds = newIds.filter(i => i !== id);
            }
            return newIds;
        });
    }

    const onProductCheckboxChange = (e) => {
        e.preventDefault();
        console.log('CHANGE', e.target.value, e.target.checked);
        onListChanges(e.target.value, e.target.checked);
    }

    // TODO: Optimze get checkbox;
    const init = async () => {
        try {
            setInitStatus(ElementInitStatus.SEARCHING);

            const productListContainer = await getElementProductListContainer();
            const productItems = await getElementProductItem(productListContainer.element, productListContainer.type);

            for (var i = 0; i < productItems.length; i++) {

                var elCheckbox = await getElementProductItemCheckbox(productItems[i], productListContainer.type);
                elCheckbox[0].addEventListener('change', onProductCheckboxChange);
                elmProductCheckboxes.current = [...elmProductCheckboxes.current, elCheckbox[0]];

            }

            setInitStatus(ElementInitStatus.SUCCESS)
        } catch (error) {
            console.error(error);
            setInitStatus(ElementInitStatus.ERROR);
        }


    }

    useLayoutEffect(() => {
        init();
    }, [])

    useEffect(() => {
        console.log('INITIALIZE ELEMENTs Status: ', initStatus);
    }, [initStatus])

    return (
        <div className='w-full p-8 shadow-md my-8'>
            <h2>Produk Terpilih {`( ${productIds.length} )`}</h2>
            <button className='p-2 bg-teal-400 text-white rounded-md'>
                Start Auto Promo
            </button>
            <button className='p-2 bg-teal-400 text-white rounded-md ml-3'>
                Stop Auto Promo
            </button>
        </div>
    )
}

export default ShopeeBoostUI