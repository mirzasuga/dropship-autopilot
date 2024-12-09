import "@plasmohq/messaging/background"

import { startHub } from "@plasmohq/messaging/pub-sub"
import { Storage } from "@plasmohq/storage"

console.log(`BGSW - Starting Hub`)
startHub()

const storage = new Storage();

async function setDefaultHeaders(requestHeaders: chrome.webRequest.HttpHeader[]) {
    await storage.set('SHOPEE_HEADERS', JSON.stringify(requestHeaders));
    console.log('STORAGE SET: SHOPEE_HEADERS');
    return true;
}
async function setDefaultQueryParams(params) {
    await storage.set('SHOPEE_PARAMS', JSON.stringify(params));
    console.log('STORAGE SET: SHOPEE_PARAMS');
    return true;
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        if (details.url.match(/seller.shopee.co.id\/api\/v3\/product\/boost_product/)) {
            console.log('MATCH', details.url, JSON.stringify(details.requestHeaders));
            setDefaultHeaders(details.requestHeaders);
        }

        if (details.url.match(/seller.shopee.co.id\/api\/v2\/login/)) {
            console.log('MATCH', details.url, JSON.stringify(details.requestHeaders));
            const keys = details.requestHeaders.map((head => head.name));
            if (keys.includes('sc-fe-session')) {
                const queryParams = new URL(details.url);
                console.log('QUERY PARAMS', queryParams.searchParams.get('SPC_CDS'), queryParams.searchParams.get('SPC_CDS_VER'));
                const sQueryParams = {
                    SPC_CDS: queryParams.searchParams.get('SPC_CDS'),
                    SPC_CDS_VER: queryParams.searchParams.get('SPC_CDS_VER')
                };
                setDefaultHeaders(details.requestHeaders);
                setDefaultQueryParams(sQueryParams);
            }
        }
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            // console.log('HEADERS', JSON.stringify(details.requestHeaders[i]), details.url);
            // if (details.requestHeaders[i].name === 'User-Agent') {
            //     details.requestHeaders.splice(i, 1);
            //     break;
            // }
        }
        return { requestHeaders: details.requestHeaders };
    },
    { urls: ["*://seller.shopee.co.id/*"] },
    ["requestHeaders", "extraHeaders"]
);

chrome.webRequest.onResponseStarted.addListener(
    function (details) {
        console.log("RESPONSE", details.url, details.responseHeaders);
    },
    {
        urls: ["*://seller.shopese.co.id/*"]
    },
    [
        "responseHeaders", "extraHeaders"
    ]
)