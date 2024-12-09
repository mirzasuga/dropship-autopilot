import type { PlasmoMessaging } from "@plasmohq/messaging"
// /^(?:[a-zA-Z0-9-]+\.)?shopee\.co\.id$/

import { Storage } from "@plasmohq/storage"

const storage = new Storage();


async function storeCookie(cookieString, cookieObj) {
    await storage.set('SHOPEE_COOKIES', cookieString);
    await storage.set('SHOPEE_COOKIES_OBJ', JSON.stringify(cookieObj));
    return true;
}

function initCookies(req: PlasmoMessaging.Request, res: PlasmoMessaging.Response) {

    // chrome.tabs.query(
    //     { currentWindow: true, active: true },
    //     async function (tabArray) {
    //         console.log({ tabArray });
    //         const tabId = tabArray[0].id;
    //         console.log({ tabId });

    //         chrome.cookies.getAllCookieStores(function (cookiestores) {
    //             // var cookieStore = cookiestores.find(obj => {
    //             //     return obj.tabIds.includes(tabId);
    //             // });

    //             cookiestores.map(cookieStore => {
    //                 chrome.cookies.getAll({ storeId: cookieStore.id }, cookies => {
    //                     cookies.map(cookie => {
    //                         if(cookie.domain.match(/shopee/)) {
    //                             console.log('COOKIE CDS FOUND', cookie);
    //                         }
    //                     })
    //                     // const shopeeCookies = cookies.filter(cookie => cookie.name.match(/SPC_CDS/))
    //                     // res.send({cookies: shopeeCookies});
    //                 })
    //             })
    //             res.send({cookies: {}});


    //         });

    //     }
    // )
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0];
        const domain = new URL(tab.url).hostname; // Mendapatkan hostname dari URL aktif

        console.log("Domain aktif:", domain);

        // Mengambil cookies berdasarkan domain aktif
        // chrome.cookies.getAll({ domain: domain }, function (cookies) {
        //     console.log(domain, cookies.length)
        //     if (cookies.length > 0) {
        //         console.log("Cookies ditemukan:", cookies);
        //     } else {
        //         console.log("Tidak ada cookies ditemukan.");
        //     }
        // });
        // chrome.cookies.getAll({ domain: ".shopee.co.id" }, function (cookies) {
        //     console.log('.shopee.co.id', cookies.length)
        //     if (cookies.length > 0) {
        //         console.log("Cookies ditemukan:", cookies);
        //     } else {
        //         console.log("Tidak ada cookies ditemukan.");
        //     }
        // });
        chrome.cookies.getAll({ domain: "shopee.co.id" }, function (cookies) {
            console.log('shopee.co.id', cookies.length)
            if (cookies.length > 0) {
                console.log("Cookies ditemukan:", cookies);
                let cookieArr = [];
                let cookieObj = {};
                cookies.map(cookie => {
                    cookieArr.push(`${cookie.name}=${cookie.value}`);
                    cookieObj[cookie.name] = cookie.value;
                })
                const cookieString = cookieArr.join('; ')
                storeCookie(cookieString, cookieObj);
                res.send({cookieString: cookieString});
            } else {
                console.log("Tidak ada cookies ditemukan.");
            }
        });
    });


}


const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    switch (req.body.type) {
        case 'initCookies':
            initCookies(req, res);
            break;
    }
}

export default handler