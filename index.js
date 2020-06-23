var ethUtil = require('ethereumjs-util')
var sigUtil = require('eth-sig-util')
var Eth = require('ethjs')
//var keccak256 = require('keccak256')
window.Eth = Eth
console.log('Conflux')
var fs = require('fs')
var terms = fs.readFileSync(__dirname + '/terms.txt').toString()
//Yumingyuan added
const { Conflux, util } = require('js-conflux-sdk');
var chainid=0x1
var cfx_sign_result=''
connectButton.addEventListener('click', function () {
  connect()
})

function connect () {
	if (typeof window.conflux !== 'undefined') {
			window.conflux.enable()
			console.log('Connect Portal OK!\n')
			conflux.on('chainIdChanged', (chainId) => {
				chainid = chainId
			})
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

cfxSignButton.addEventListener('click', function(event) {
	event.preventDefault()
	var from = conflux.selectedAddress
	if (!from) return connect()
	const typedData = {
	types: {
	  EIP712Domain: [
		{ name: 'name', type: 'string' },
		{ name: 'version', type: 'string' },
		{ name: 'chainId', type: 'uint256' },
		{ name: 'verifyingContract', type: 'address' },
	  ],
	  Person: [
		{ name: 'name', type: 'string' },
		{ name: 'wallet', type: 'address' },
	  ],
	  Mail: [
		{ name: 'from', type: 'Person' },
		{ name: 'to', type: 'Person' },
		{ name: 'contents', type: 'string' },
	  ],
	},
	primaryType: 'Mail',
	domain: {
	  name: 'Ether Mail',
	  version: '1',
	  chainId: 3,
	  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
	},
	message: {
	  sender: {
		name: 'Cow',
		wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
	  },
	  recipient: {
		name: 'Bob',
		wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
	  },
	  contents: 'Hello, Bob!',
	},
}
//调用Portal签名
	confluxJS.provider.sendAsync(
        {
          method: 'cfx_sign',
          params: [conflux.selectedAddress,
            ConfluxJSSDK.util.sign.sha3(Buffer.from(JSON.stringify(typedData))).toString('hex'),],//对typedData转为JSON对象后，用Buffer传入sha3函数，并将sha3计算结果转为16进制字符串用Portal签名
          from: conflux.selectedAddress,
        },
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            if (result.warning) {
              console.warn(result.warning)
            }
			console.log('CFX_sign Signed result:'+JSON.stringify(result))
			cfx_sign_result=JSON.stringify(result)
          }
        }
      )
})


personalRecoverTest.addEventListener('click', function(event) {
	event.preventDefault()
	const typedData1 = {
	types: {
	  EIP712Domain: [
		{ name: 'name', type: 'string' },
		{ name: 'version', type: 'string' },
		{ name: 'chainId', type: 'uint256' },
		{ name: 'verifyingContract', type: 'address' },
	  ],
	  Person: [
		{ name: 'name', type: 'string' },
		{ name: 'wallet', type: 'address' },
	  ],
	  Mail: [
		{ name: 'from', type: 'Person' },
		{ name: 'to', type: 'Person' },
		{ name: 'contents', type: 'string' },
	  ],
	},
	primaryType: 'Mail',
	domain: {
	  name: 'Ether Mail',
	  version: '1',
	  chainId: 3,
	  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccb',
	},
	message: {
	  sender: {
		name: 'Cow',
		wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
	  },
	  recipient: {
		name: 'Bob',
		wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
	  },
	  contents: 'Hello, Bob!',
	},
}
	confluxJS.provider.sendAsync(
        {
          method: 'cfx_sign',
          params: [conflux.selectedAddress,
            ConfluxJSSDK.util.sign.sha3(Buffer.from(JSON.stringify(typedData1))).toString('hex'),],//对typedData转为JSON对象后，用Buffer传入sha3函数，并将sha3计算结果转为16进制字符串用Portal签名
          from: conflux.selectedAddress,
        },
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            if (result.warning) {
              console.warn(result.warning)
            }
			if (JSON.stringify(result)===cfx_sign_result)
			{
				console.log('The signed result is same')
			}
			else{
				console.log('The signed result is different!')
			}
          }
        }
      )
})

ethjsPersonalSignButton.addEventListener('click', function(event) {
  event.preventDefault()
  var from = conflux.selectedAddress
	if (!from) return connect()
  console.log('We changed cfx_sign to use the personal_sign logic. We recommend using cfx_sign method instead of personal_sign. Try Sign Typed Data below!')
})


signTypedDataButton.addEventListener('click', function(event) {
  event.preventDefault()
	var from = conflux.selectedAddress
	if (!from) return connect()
  const typedData = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
          ],
          Person: [
            { name: 'name', type: 'string' },
            { name: 'wallet', type: 'address' },
          ],
          Mail: [
            { name: 'from', type: 'Person' },
            { name: 'to', type: 'Person' },
            { name: 'contents', type: 'string' },
          ],
        },
        primaryType: 'Mail',
        domain: {
          name: 'Ether Mail',
          version: '1',
          chainid,
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        message: {
          sender: {
            name: 'Cow',
            wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
          },
          recipient: {
            name: 'Bob',
            wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
          },
          contents: 'Hello, Bob!',
        },
      }
	  confluxJS.provider.sendAsync(
        {
          method: 'cfx_signTypedData_v3',
          params: [conflux.selectedAddress, JSON.stringify(typedData)],
          from: conflux.selectedAddress,
        },
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
			  console.log('typed data signed result:'+JSON.stringify(result))
            //sendSignedTypedData.disabled = false
          }
        }
      )
})

signTypedDataV3Button.addEventListener('click', function(event) {
  event.preventDefault()
  
  var from = conflux.selectedAddress
	if (!from) return connect()
  const typedData = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
          ],
          Person: [
            { name: 'name', type: 'string' },
            { name: 'wallet', type: 'address' },
          ],
          Mail: [
            { name: 'from', type: 'Person' },
            { name: 'to', type: 'Person' },
            { name: 'contents', type: 'string' },
          ],
        },
        primaryType: 'Mail',
        domain: {
          name: 'Ether Mail',
          version: '1',
          chainid,
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        message: {
          sender: {
            name: 'Cow',
            wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
          },
          recipient: {
            name: 'Bob',
            wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
          },
          contents: 'Hello, Bob!',
        },
      }
	  confluxJS.provider.sendAsync(
        {
          method: 'cfx_signTypedData_v3',
          params: [conflux.selectedAddress, JSON.stringify(typedData)],
          from: conflux.selectedAddress,
        },
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
			  console.log('typed data signed result:'+JSON.stringify(result))
            //sendSignedTypedData.disabled = false
          }
        }
      )

})

signTypedDataV4Button.addEventListener('click', function(event) {
  event.preventDefault()

  var from = conflux.selectedAddress
	if (!from) return connect()
		console.log('Wait for API')
})

ethjsSignTypedDataButton.addEventListener('click', function(event) {
  event.preventDefault()
  var from = conflux.selectedAddress
	if (!from) return connect()
		console.log('Wait for API')
  /*
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

  })*/
})
