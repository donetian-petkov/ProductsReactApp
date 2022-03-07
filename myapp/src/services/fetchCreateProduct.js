export default function fetchCreateProduct(name, price, currency) {

    return fetch('https://parseapi.back4app.com/classes/Product', {
        method: "POST",
        headers: {
            "X-Parse-Application-Id": "NTQV9iE7S45PGxM3hL3Zf5s3G9TDrFpc6hYV8CeV",
            "X-Parse-REST-API-Key": "wiCJvsTuvvTlIBpEOpc4Yqp5QQd5U5XXBFNA6GIv",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, price, currency})
    });

}