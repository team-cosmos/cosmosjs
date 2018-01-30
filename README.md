# cosmosjs
Javascript API for Cosmos smart contracts

![logo.png](img/logo.png)

# Installation
To install globally:
```bash
npm install -g cosmosjs
```

To install as a dev dependancy:
```bash
npm install --save-dev cosmosjs
```


# Usage
```javascript
/* Set up web3 */
const ethClient = 'YOUR_ETHEREUM_CLIENT_URL'; // For example - 'https://ropsten.infura.io/ynXBPNoUYJ3C4ZDzqjga';
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider(ethClient));

/* Initialize cosmosjs */
var Cosmos = require('cosmosjs');
var cosmos = Cosmos(web3);
```

Read the [Docs](https://team-cosmos.github.io/cosmosjs/)