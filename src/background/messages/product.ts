import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
 
const storage = new Storage();

export enum ProductEventEnum {
    BOOST = 'BOOST',
    TEST = 'TEST',
}


const handleBoostProduct = async (req: PlasmoMessaging.Request, res: PlasmoMessaging.Response) => {

    chrome.tabs.query(
        { currentWindow: true, active: true },
        async function (tabArray) {
            console.log({ tabArray });
            const tabId = tabArray[0].id;
            chrome.cookies.getAllCookieStores(function (cookiestores){
                var cookieStore = cookiestores.find(obj => {
                    return obj.tabIds.includes(tabId);
                });
                console.log(cookieStore["id"]);
            });
        }
    )
    chrome.cookies.getAll({storeId: "0"}, cookies => {
        const shopeeCookies = cookies.filter(cookie => cookie.domain.includes(/seller.shopee.co.id/))
        console.log('COOKIES', shopeeCookies);
    })

    res.send({
        data: {
            ...req.body
        }
    })
}
const handleTest = (req, res) => {
    res.send({
        data: {
            ...req.body
        }
    })
}

const handleBoostProductv2 = async (req: PlasmoMessaging.Request, res: PlasmoMessaging.Response) => {
    let shopeeHeaders = await storage.get('SHOPEE_HEADERS');
    let shopeeParams = await storage.get('SHOPEE_PARAMS');
    const shopeeCookies = await storage.get('SHOPEE_COOKIES');
    let shopeeCookiesObj = await storage.get('SHOPEE_COOKIES_OBJ');
    if(shopeeHeaders && shopeeParams && shopeeCookiesObj) {

        shopeeHeaders = JSON.parse(shopeeHeaders);
        shopeeParams = JSON.parse(shopeeParams);
        shopeeCookiesObj = JSON.parse(shopeeCookiesObj);

        const mheaders = new Headers();

        for(var i=0; i < shopeeHeaders.length; i++) {
            const name = shopeeHeaders[i].name;
            const _name = (name.split('-').map(e=>e.charAt(0).toUpperCase() + e.slice(1))).join('-')
            console.log('SET HEADER', name, _name, shopeeHeaders[i].value);
            if(!["Sec-Fetch-Site", "Sec-Fetch-Mode", "Sec-Fetch-Dest"].includes(_name)) {
                mheaders.append(_name, shopeeHeaders[i].value);
            }
        }

        var validCookies = [];
        Object.keys(shopeeCookiesObj).map(k => {
            validCookies.push(`${k}=${shopeeCookiesObj[k]}`);
        })
        const strValidCookies = validCookies.join('; ');
        console.log('VALID COOKIES', strValidCookies);
        mheaders.append('Cookie', strValidCookies);
        mheaders.append('Content-Type', 'application/json; charset=UTF-8;');
        // mheaders.append('Sec-Fetch-Site', 'same-origin');
        // mheaders.append('Sec-Fetch-Mode', 'cors');
        // mheaders.append('Sec-Fetch-Dest', 'empty');
        // mheaders.append('priority', 'u=1, i');

        console.log('HTTP HEADERS', mheaders);
        for (const key of mheaders.keys()) {
            console.log('HTTP HEADER KEY', key);
          }
        const url = `https://seller.shopee.co.id/api/v3/product/boost_product/?version=3.1.0&SPC_CDS=${shopeeParams.SPC_CDS}&SPC_CDS_VER=${shopeeParams.SPC_CDS_VER}`;
        const body = JSON.stringify({
            "id": parseInt(req.body.productId)
        });
        console.log('BODY', body);

        fetch(url, {
            method: 'POST',
            headers: mheaders,
            body:body
        }).then(response => {
            if(response.ok) {
                return response.json();
            } else {
                console.log('STATUS', response.status);
                return response.text();
            }
        }).then(response => {
            console.log('RES STATUS:', response);
            console.log('RES STATUS TEXT:', response);
            res.send({shopeeHeaders: shopeeHeaders, url, id: req.body.productId, response});

        });

    } else {
        res.send({result: 'null'});
    }
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    switch (req.body.type) {
        case ProductEventEnum.BOOST:
            handleBoostProductv2(req, res);
            break;
        case ProductEventEnum.TEST:
            handleTest(req, res);
            break;

    }
}

export default handler