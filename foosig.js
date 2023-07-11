let CryptoJS = require("crypto-js/core");
let request = {}
request.data = {
    "account_reference": "123",
  "account_type": 27,
  "alias": "testing",
  "currency": "JOD",
  "description": "my example",
  "locale": "en",
  "user_reference": "1234567890"
}

let hmac = CryptoJS.HmacSHA256(request.data ,"qm5wmFXJCxApzceSr");
let xFooSignature = CryptoJS.enc.Base64.stringify(hmac);
console.log(xFooSignature)
