var ethUtil = require('ethereumjs-util')
var sigUtil = require('eth-sig-util')
var Eth = require('ethjs')
window.Eth = Eth
console.log('Conflux')
var fs = require('fs')
var terms = fs.readFileSync(__dirname + '/terms.txt').toString()
//Yumingyuan added
const { Conflux, util } = require('js-conflux-sdk');

async function main() {
  const cfx = new Conflux({
    url: 'http://testnet-jsonrpc.conflux-chain.org:12537',
    defaultGasPrice: 100,
    defaultGas: 1000000,
    logger: console,
  });
 
  const balance = await cfx.getBalance('0xbbd9e9be525ab967e633bcdaeac8bd5723ed4d6b');
  console.log(balance); // 937499420597305000n
}
 
main();
connectButton.addEventListener('click', function () {
  connect()
})

function connect () {
	if (typeof window.conflux !== 'undefined') {
			window.conflux.enable()
			console.log('Connect Portal OK!\n')
		}
	else{
			if(confirm('检测到您的浏览器中并未安装conflux钱包插件，点击确定前往下载.'))
			{
			   window.open("https://github.com/Conflux-Chain/conflux-portal/releases")
			}
		}
	console.log('\n')
}

Sha3_Hash.addEventListener('click', function(event) {
		event.preventDefault()
		var msg = 'chelsea'
		result=ConfluxJSSDK.util.sign.sha3(Buffer.from(msg))
		var from = conflux.selectedAddress
		if (!from) return connect()
		console.log('Sha3 Result of '+msg+' is: '+result.toString('hex'))
		console.log('Current address: '+from)
		var up_case=ConfluxJSSDK.util.sign.checksumAddress(from)
		console.log('After called checksumAddress: '+up_case)
		console.log('\n')
})

personalSignButton.addEventListener('click', function(event) {
	event.preventDefault()
	var from = conflux.selectedAddress
	if (!from) return connect()
	var privateKey = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1])
	var buffer32 = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
	var address=ConfluxJSSDK.util.sign.privateKeyToAddress(Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1]))
	console.log('sign result r:'+ConfluxJSSDK.util.sign.ecdsaSign(buffer32, privateKey).r.toString('hex'))
	console.log('sign result s:'+ConfluxJSSDK.util.sign.ecdsaSign(buffer32, privateKey).s.toString('hex'))
	console.log('This address:'+address.toString('hex')+' signed data by ecdsa:'+buffer32.toString('hex'))
	console.log('\n')
})


personalRecoverTest.addEventListener('click', function(event) {
	event.preventDefault()
	var from = conflux.selectedAddress
	if (!from) return connect()
	privateKey = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1])//私钥数据
	buffer32 = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])//待签名数据
	buffer31 = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 30])
	var result=ConfluxJSSDK.util.sign.publicKeyToAddress(ConfluxJSSDK.util.sign.ecdsaRecover(buffer31, ConfluxJSSDK.util.sign.ecdsaSign(buffer32, privateKey)))//验证签名
	console.log('The data signed by:'+result.toString('hex'))
	
  //var text = 'hello!'
  //var msg = ethUtil.bufferToHex(new Buffer(text, 'utf8'))
  // var msg = '0x1' // hexEncode(text)
  //console.log(msg)
  //var from = web3.eth.accounts[0]
  //if (!from) return connect()

  /*  web3.personal.sign not yet implemented!!!
   *  We're going to have to assemble the tx manually!
   *  This is what it would probably look like, though:
    web3.personal.sign(msg, from) function (err, result) {
      if (err) return console.error(err)
      console.log('PERSONAL SIGNED:' + result)
    })
  */

   //console.log('CLICKED, SENDING PERSONAL SIGN REQ')
  //var params = [msg, from]
  //var method = 'personal_sign'

  /*web3.currentProvider.sendAsync({
    method,
    params,
    from,
  }, function (err, result) {
    if (err) return console.error(err)
    if (result.error) return console.error(result.error)
    console.log('PERSONAL SIGNED:' + JSON.stringify(result.result))

    console.log('recovering...')
    const msgParams = { data: msg }
    msgParams.sig = result.result

    method = 'personal_ecRecover'
    var params = [msg, result.result]
    web3.currentProvider.sendAsync({
      method,
      params,
      from,
    }, function (err, result) {
      var recovered = result.result
      console.log('ec recover called back:')
      console.dir({ err, recovered })
      if (err) return console.error(err)
      if (result.error) return console.error(result.error)


      if (recovered === from ) {
        console.log('Successfully ecRecovered signer as ' + from)
      } else {
        console.log('Failed to verify signer when comparing ' + result + ' to ' + from)
      }

    })
  })*/

})

ethjsPersonalSignButton.addEventListener('click', function(event) {
  event.preventDefault()
  
  /*var text = terms
  var msg = ethUtil.bufferToHex(new Buffer(text, 'utf8'))
  var from = web3.eth.accounts[0]
  if (!from) return connect()

  console.log('CLICKED, SENDING PERSONAL SIGN REQ')
  var params = [from, msg]

  // Now with Eth.js
  var eth = new Eth(web3.currentProvider)

  eth.personal_sign(msg, from)
  .then((signed) => {
    console.log('Signed!  Result is: ', signed)
    console.log('Recovering...')

    return eth.personal_ecRecover(msg, signed)
  })
  .then((recovered) => {

    if (recovered === from) {
      console.log('Ethjs recovered the message signer!')
    } else {
      console.log('Ethjs failed to recover the message signer!')
      console.dir({ recovered })
    }
  })*/
})


signTypedDataButton.addEventListener('click', function(event) {
  event.preventDefault()

  const msgParams = [
    {
      type: 'string',
      name: 'Message',
      value: 'Hi, Alice!'
    },
    {
      type: 'uint32',
      name: 'A number',
      value: '1337'
    }
  ]

  var from = web3.eth.accounts[0]
  if (!from) return connect()

  /*  web3.eth.signTypedData not yet implemented!!!
   *  We're going to have to assemble the tx manually!
   *  This is what it would probably look like, though:
    web3.eth.signTypedData(msg, from) function (err, result) {
      if (err) return console.error(err)
      console.log('PERSONAL SIGNED:' + result)
    })
  */

   console.log('CLICKED, SENDING PERSONAL SIGN REQ')
  var params = [msgParams, from]
  console.dir(params)
  var method = 'eth_signTypedData'

  web3.currentProvider.sendAsync({
    method,
    params,
    from,
  }, function (err, result) {
    if (err) return console.dir(err)
    if (result.error) {
      alert(result.error.message)
    }
    if (result.error) return console.error(result)
    console.log('PERSONAL SIGNED:' + JSON.stringify(result.result))

    const recovered = sigUtil.recoverTypedSignatureLegacy({ data: msgParams, sig: result.result })

    if (ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(from)) {
      alert('Successfully ecRecovered signer as ' + from)
    } else {
      alert('Failed to verify signer when comparing ' + result + ' to ' + from)
    }

  })

})

signTypedDataV3Button.addEventListener('click', function(event) {
  event.preventDefault()
  
  web3.currentProvider.sendAsync({
    method: 'net_version',
    params: [],
    jsonrpc: "2.0"
  }, function (err, result) {
    const netId = result.result
    const msgParams = JSON.stringify({types:{
      EIP712Domain:[
        {name:"name",type:"string"},
        {name:"version",type:"string"},
        {name:"chainId",type:"uint256"},
        {name:"verifyingContract",type:"address"}
      ],
      Person:[
        {name:"name",type:"string"},
        {name:"wallet",type:"address"}
      ],
      Mail:[
        {name:"from",type:"Person"},
        {name:"to",type:"Person"},
        {name:"contents",type:"string"}
      ]
    },
    primaryType:"Mail",
    domain:{name:"Ether Mail",version:"1",chainId:netId,verifyingContract:"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},
    message:{
      from:{name:"Cow",wallet:"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"},
      to:{name:"Bob",wallet:"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"},
      contents:"Hello, Bob!"}
    })
  
      
  
    var from = web3.eth.accounts[0]
  
    console.log('CLICKED, SENDING PERSONAL SIGN REQ', 'from', from, msgParams)
    var params = [from, msgParams]
    console.dir(params)
    var method = 'eth_signTypedData_v3'
  
    web3.currentProvider.sendAsync({
      method,
      params,
      from,
    }, function (err, result) {
      if (err) return console.dir(err)
      if (result.error) {
        alert(result.error.message)
      }
      if (result.error) return console.error('ERROR', result)
      console.log('TYPED SIGNED:' + JSON.stringify(result.result))
  
      const recovered = sigUtil.recoverTypedSignature({ data: JSON.parse(msgParams), sig: result.result })
  
      if (ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(from)) {
        alert('Successfully ecRecovered signer as ' + from)
      } else {
        alert('Failed to verify signer when comparing ' + result + ' to ' + from)
      }
  
    })
  
  })

})

signTypedDataV4Button.addEventListener('click', function(event) {
  event.preventDefault()

  const msgParams = JSON.stringify({
    domain: {
      chainId: 1,
      name: 'Ether Mail',
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      version: '1'
    },
    message: {
      contents: 'Hello, Bob!',
      from: {
        name: 'Cow',
        wallets: [
          '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
          '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF'
        ]
      },
      to: [
        {
          name: 'Bob',
          wallets: [
            '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
            '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
            '0xB0B0b0b0b0b0B000000000000000000000000000'
          ]
        }
      ]
    },
    primaryType: 'Mail',
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
      ],
      Group: [{ name: 'name', type: 'string' }, { name: 'members', type: 'Person[]' }],
      Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person[]' },
        { name: 'contents', type: 'string' }
      ],
      Person: [{ name: 'name', type: 'string' }, { name: 'wallets', type: 'address[]' }]
    }
  });

  var from = web3.eth.accounts[0]

  var params = [from, msgParams]
  var method = 'eth_signTypedData_v4'

  web3.currentProvider.sendAsync({
    method,
    params,
    from,
  }, function (err, result) {
    if (err) return console.dir(err)
    if (result.error) {
      alert(result.error.message)
    }
    if (result.error) return console.error('ERROR', result)
    console.log('TYPED SIGNED:' + JSON.stringify(result.result))

    const recovered = sigUtil.recoverTypedSignature_v4({ data: JSON.parse(msgParams), sig: result.result })

    if (ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(from)) {
      alert('Successfully recovered signer as ' + from)
    } else {
      alert('Failed to verify signer when comparing ' + result + ' to ' + from)
    }

  })

})

ethjsSignTypedDataButton.addEventListener('click', function(event) {
  event.preventDefault()

  const msgParams = [
    {
      type: 'string',
      name: 'Message',
      value: 'Hi, Alice!'
    },
    {
      type: 'uint32',
      name: 'A number',
      value: '1337'
    }
  ]

  var from = web3.eth.accounts[0]
  if (!from) return connect()

  console.log('CLICKED, SENDING PERSONAL SIGN REQ')
  var params = [msgParams, from]

  var eth = new Eth(web3.currentProvider)

  eth.signTypedData(msgParams, from)
  .then((signed) => {
    console.log('Signed!  Result is: ', signed)
    console.log('Recovering...')

    const recovered = sigUtil.recoverTypedSignature({ data: msgParams, sig: signed })

    if (ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(from)) {
      alert('Successfully ecRecovered signer as ' + from)
    } else {
      alert('Failed to verify signer when comparing ' + signed + ' to ' + from)
    }

  })
})
