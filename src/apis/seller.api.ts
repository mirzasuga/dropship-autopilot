const BOOST_PRODUCT_REQUEST_HEADERS = [
    { "name": "sec-ch-ua-platform", "value": "\"Windows\"" },
    { "name": "sec-ch-ua", "value": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"" },
    { "name": "sec-ch-ua-mobile", "value": "?0" },
    { "name": "sc-fe-session", "value": "153ECB7FF87F21AB" },
    { "name": "Accept", "value": "application/json, text/plain, */*" },
    { "name": "sc-fe-ver", "value": "21.75766" },
    { "name": "Content-Type", "value": "application/json;charset=UTF-8" },
    { "name": "User-Agent", "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" },
    { "name": "Sec-Fetch-Site", "value": "same-origin" },
    { "name": "Sec-Fetch-Mode", "value": "cors" },
    { "name": "Sec-Fetch-Dest", "value": "empty" }
];

export const boostProduct = (productId) => {
    const payload = {
        url: 'https://seller.shopee.co.id/api/v3/product/boost_product/?version=3.1.0&SPC_CDS=c31f512a-ff4f-4a49-890a-4b0b3db48128&SPC_CDS_VER=2',
        headers: {
            ":authority:": "seller.shopee.co.id",
            ":method:": "POST",
            ":path:": "/api/v3/product/boost_product/?version=3.1.0&SPC_CDS=5395c687-c20d-4a81-b1f4-c8964934ebc7&SPC_CDS_VER=2",
            ":scheme:": "https",
            "accept": "application/json, text/plain, */*",
            "accept-encoding": "gzip, deflate, br, zstd",
            "accept-language": "en-US,en;q=0.9",
            "content-length": "18",
            "content-type": "application/json;charset=UTF-8",
            "cookie": "semua kuki",
            "origin": "https://seller.shopee.co.id",
            "priority": "u=1, i",
            "referer": "https://seller.shopee.co.id/portal/product/list/live/all?page=1&size=48&is_from_login=true",
            "sc-fe-session": "FF1C7F53C7D64B20",
            "sc-fe-ver": "21.75339",
            "sec-ch-ua": `"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"`,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "Windows",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        }
    }
}

export const fetchBoostProduct = async (productId, params = {}) => {
    const url = 'https://seller.shopee.co.id/api/v3/product/boost_product/?version=3.1.0&SPC_CDS=c31f512a-ff4f-4a49-890a-4b0b3db48128&SPC_CDS_VER=2';
    const customHeaders = new Headers();
    customHeaders.append('sec-ch-ua-platform', 'Windows');
    customHeaders.append('sec-ch-ua', '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"');
    customHeaders.append('sec-ch-ua-mobile', '?0');
    customHeaders.append('sc-fe-session', '153ECB7FF87F21AB'); // DYNAMIC
    customHeaders.append('Accept', 'application/json, text/plain, */*');
    customHeaders.append('sc-fe-ver', '21.75766');
    customHeaders.append('Content-Type', 'application/json;charset=UTF-8');
    customHeaders.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');
    customHeaders.append('Sec-Fetch-Site', 'same-origin');
    customHeaders.append('Sec-Fetch-Mode', 'cors');
    customHeaders.append('Sec-Fetch-Dest', 'empty');
    
    
    const response = await fetch(url, {
        body: JSON.stringify({ id: productId }),
        headers: 
    })
}

// _gcl_au=1.1.616930808.1730575859;
// _fbp=fb.2.1730575859381.301608893124312584;
// SPC_F=bQj827KeaQg75j7l4ryqWFWZoV7h9PbA;
// REC_T_ID=87164e1f-9950-11ef-8885-3a96df981d41;
// SPC_CLIENTID=YlFqODI3S2VhUWc3gpfledhnonfgrviy;
// SC_DFP=YGSTYCvQsScidCgjXTNGdnSKqIVipnuZ;
// _QPWSDCXHZQA=ca161323-43bf-4850-d30f-d515e68238c0;
// REC7iLP4Q=3f343720-f3ab-4807-ba79-b5b5409cb4e2;
// _ga_9PRZT3F0WM=GS1.1.1731129726.1.0.1731129807.60.0.0;
// fulfillment-language=id;
// SPC_R_T_ID=6wHm3QMPmulz4pvbcMEdI0OCiEAyqQnP0xMWNqAiF4y/RUz+w3k4rQqPuw0ODswHEThkZLzDU7u26SlwO81ff3d+c7MmpgtAh9cN71mu9W2O9vTYMX2xntpAYhq5QzDuNKxn2sKpSTAUFUmFpGb64/XPpuz8Aa96ia0npEaszlQ=;
// SPC_R_T_IV=YnZIamVjQ0JORFMzZTcwZw==;
// SPC_T_ID=6wHm3QMPmulz4pvbcMEdI0OCiEAyqQnP0xMWNqAiF4y/RUz+w3k4rQqPuw0ODswHEThkZLzDU7u26SlwO81ff3d+c7MmpgtAh9cN71mu9W2O9vTYMX2xntpAYhq5QzDuNKxn2sKpSTAUFUmFpGb64/XPpuz8Aa96ia0npEaszlQ=;
// SPC_T_IV=YnZIamVjQ0JORFMzZTcwZw==;
// _ga=GA1.1.2008770868.1730575861;
// SPC_EC=.VFljY2ZpbWl5NEh2ZG80cf9zBov0rA9wORenvWUEiVNB4JTHbHGEWJRQ4O/uLdZc2t/YmDOx8MpuSvt6SxXhnvlgt3IUZsK+9fc+HzfTBh2YtYVjvUDVtCZ8THnqfzCJ2nJ9z4yRD/Flxays5yFQD1SV6Im+Z3wN9KXB1t1IBF/DJvwjuqyURolFSeFejMI/KnpUzFYg7E5BeaCS2GmtwXIGzKmXa/haNnGUmcPWv04=;
// SPC_ST=.VFljY2ZpbWl5NEh2ZG80cf9zBov0rA9wORenvWUEiVNB4JTHbHGEWJRQ4O/uLdZc2t/YmDOx8MpuSvt6SxXhnvlgt3IUZsK+9fc+HzfTBh2YtYVjvUDVtCZ8THnqfzCJ2nJ9z4yRD/Flxays5yFQD1SV6Im+Z3wN9KXB1t1IBF/DJvwjuqyURolFSeFejMI/KnpUzFYg7E5BeaCS2GmtwXIGzKmXa/haNnGUmcPWv04=;
// SPC_SC_SESSION=d4580c342ef11bfc629fd27ffd425d5b_1_112939773;
// SPC_STK=NOXvuVoMcKip7mM1vXPfzZfwY0QL+fAKdi6dVDN0aAnkqi/xY+sitXSadn6uiSr1MGt+I6x/X1aTBDJR2f8PDv4vLUb+wwVfkWD3UXYYkOcuGf9t9eCzNAlDIUCvW7FzzZZmUXkvz4zH9Q6v/0I2THbZ5BtxpTuvLuuDR8BtNEA=;
// _ga_SW6D8G0HXK=GS1.1.1733456260.16.0.1733456266.54.0.0;
// SPC_CDS=c31f512a-ff4f-4a49-890a-4b0b3db48128;
// SPC_CDS_CHAT=07e7d8fe-1f27-4433-9167-9102564b25cb;
// _sapid=4c060fa466e727c3495bc3a6ab72c94868014c64d3e0b07252bb6731;
// CTOKEN=YjuGJbZUEe%2BlxVZ2K9pKZQ%3D%3D;
// shopee_webUnique_ccd=TThLKKf1JIatxnbdRqTiaA%3D%3D%7CST318hEMCqroTwZGBbTx6v4ADVLtCbcn%2FL4TW30hBna4FuSHlNs4Fyb%2FE0gYZMnIFzlkGwRvD6iQ6pcQewg%3D%7C6y%2FtNO5%2FwL7Qocyq%7C08%7C3;
// ds=64f0c828570f7bfb40bc1d9e3908a466

// PRODUCT ID FROM SELECTOR: 26710640310

[{"name":"sec-ch-ua-platform","value":"\"Windows\""},{"name":"sec-ch-ua","value":"\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\""},{"name":"sec-ch-ua-mobile","value":"?0"},{"name":"sc-fe-session","value":"16F7898908781121"},{"name":"Accept","value":"application/json, text/plain, */*"},{"name":"sc-fe-ver","value":"21.75766"},{"name":"Content-Type","value":"application/json;charset=UTF-8"},{"name":"User-Agent","value":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"},{"name":"Sec-Fetch-Site","value":"same-origin"},{"name":"Sec-Fetch-Mode","value":"cors"},{"name":"Sec-Fetch-Dest","value":"empty"}]
[{"name":"sc-fe-session","value":"16F7898908781121"},{"name":"accept","value":"application/json, text/plain, */*"},{"name":"sc-fe-ver","value":"21.75766"},{"name":"Content-Type","value":"text/plain;charset=UTF-8"},{"name":"User-Agent","value":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"}]
"_gcl_au=1.1.616930808.1730575859; _fbp=fb.2.1730575859381.301608893124312584; SPC_F=bQj827KeaQg75j7l4ryqWFWZoV7h9PbA; REC_T_ID=87164e1f-9950-11ef-8885-3a96df981d41; SPC_CLIENTID=YlFqODI3S2VhUWc3gpfledhnonfgrviy; SC_DFP=YGSTYCvQsScidCgjXTNGdnSKqIVipnuZ; _QPWSDCXHZQA=ca161323-43bf-4850-d30f-d515e68238c0; REC7iLP4Q=3f343720-f3ab-4807-ba79-b5b5409cb4e2; _ga_9PRZT3F0WM=GS1.1.1731129726.1.0.1731129807.60.0.0; fulfillment-language=id; SPC_R_T_ID=6wHm3QMPmulz4pvbcMEdI0OCiEAyqQnP0xMWNqAiF4y/RUz+w3k4rQqPuw0ODswHEThkZLzDU7u26SlwO81ff3d+c7MmpgtAh9cN71mu9W2O9vTYMX2xntpAYhq5QzDuNKxn2sKpSTAUFUmFpGb64/XPpuz8Aa96ia0npEaszlQ=; SPC_R_T_IV=YnZIamVjQ0JORFMzZTcwZw==; SPC_T_ID=6wHm3QMPmulz4pvbcMEdI0OCiEAyqQnP0xMWNqAiF4y/RUz+w3k4rQqPuw0ODswHEThkZLzDU7u26SlwO81ff3d+c7MmpgtAh9cN71mu9W2O9vTYMX2xntpAYhq5QzDuNKxn2sKpSTAUFUmFpGb64/XPpuz8Aa96ia0npEaszlQ=; SPC_T_IV=YnZIamVjQ0JORFMzZTcwZw==; _ga=GA1.1.2008770868.1730575861; SPC_EC=.VFljY2ZpbWl5NEh2ZG80cf9zBov0rA9wORenvWUEiVNB4JTHbHGEWJRQ4O/uLdZc2t/YmDOx8MpuSvt6SxXhnvlgt3IUZsK+9fc+HzfTBh2YtYVjvUDVtCZ8THnqfzCJ2nJ9z4yRD/Flxays5yFQD1SV6Im+Z3wN9KXB1t1IBF/DJvwjuqyURolFSeFejMI/KnpUzFYg7E5BeaCS2GmtwXIGzKmXa/haNnGUmcPWv04=; SPC_ST=.VFljY2ZpbWl5NEh2ZG80cf9zBov0rA9wORenvWUEiVNB4JTHbHGEWJRQ4O/uLdZc2t/YmDOx8MpuSvt6SxXhnvlgt3IUZsK+9fc+HzfTBh2YtYVjvUDVtCZ8THnqfzCJ2nJ9z4yRD/Flxays5yFQD1SV6Im+Z3wN9KXB1t1IBF/DJvwjuqyURolFSeFejMI/KnpUzFYg7E5BeaCS2GmtwXIGzKmXa/haNnGUmcPWv04=; SPC_SC_SESSION=d4580c342ef11bfc629fd27ffd425d5b_1_112939773; SPC_STK=NOXvuVoMcKip7mM1vXPfzZfwY0QL+fAKdi6dVDN0aAnkqi/xY+sitXSadn6uiSr1MGt+I6x/X1aTBDJR2f8PDv4vLUb+wwVfkWD3UXYYkOcuGf9t9eCzNAlDIUCvW7FzzZZmUXkvz4zH9Q6v/0I2THbZ5BtxpTuvLuuDR8BtNEA=; _ga_SW6D8G0HXK=GS1.1.1733456260.16.0.1733456266.54.0.0; SPC_CDS=c31f512a-ff4f-4a49-890a-4b0b3db48128; SPC_CDS_CHAT=07e7d8fe-1f27-4433-9167-9102564b25cb; _sapid=4c060fa466e727c3495bc3a6ab72c94868014c64d3e0b07252bb6731; CTOKEN=ZVNoebZkEe%2BHxiaWyZD7dg%3D%3D; shopee_webUnique_ccd=wYTnEHVgaN5LV75Ty6k3qQ%3D%3D%7C0T318hEMCqroTwZGBbTx6v4ADVLtCbcn%2FL4TW1cxb3a4FuSHlNs4Fyb%2FE0gYZMnIFzlkGwRvD6iQ6pcQewg%3D%7C6y%2FtNO5%2FwL7Qocyq%7C08%7C3; ds=6c6f2cb05217e1a4666e170951bcc0ff"