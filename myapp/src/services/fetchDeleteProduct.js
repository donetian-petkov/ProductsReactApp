export default function fetchDeleteProduct(id) {

 return  fetch("https://parseapi.back4app.com/classes/Product/" + id, {
     method: "DELETE",
     headers: {
         "X-Parse-Application-Id" : "NTQV9iE7S45PGxM3hL3Zf5s3G9TDrFpc6hYV8CeV",
         "X-Parse-REST-API-Key" : "wiCJvsTuvvTlIBpEOpc4Yqp5QQd5U5XXBFNA6GIv"
     }
 });

}