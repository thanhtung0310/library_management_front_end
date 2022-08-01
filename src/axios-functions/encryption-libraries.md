# encryption libraries

## use encrypt-decrypt-library

### install

```
$ npm install --save encrypt-decrypt-library
```

### encrypt

```js
import Encryption from "encrypt-decrypt-library";

const config = {
  algorithm: process.env.ALGORITHM,
  encryptionKey: process.env.ENCRYPTION_KEY,
  salt: process.env.SALT,
};
const encryption = new Encryption(config);

encryption.encrypt("Hello world");
// xxxxxxx
```

### decrypt

```js
import Encryption from "encrypt-decrypt-library";

const config = {
  algorithm: process.env.ALGORITHM,
  encryptionKey: process.env.ENCRYPTION_KEY,
  salt: process.env.SALT,
};
const encryption = new Encryption(config);

// Encoded as string
encryption.decrypt("gmmBh17Q4QA=");
// xxx

// Encoded as an integer
encryption.decrypt("NF1r855MimY=", true);
// xxx
```

## use blueimp-md5

### install

```
$ npm install blueimp-md5
```

### source code

```js
var encryptedString = md5("tungpt");
```
