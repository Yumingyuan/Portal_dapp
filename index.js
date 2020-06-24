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
var message_hash=''
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
message_hash='0x'+ConfluxJSSDK.util.sign.sha3(Buffer.from(JSON.stringify(typedData))).toString('hex')
//调用Portal对message_hash签名
	confluxJS.provider.sendAsync(
        {
          method: 'cfx_sign',
          params: [conflux.selectedAddress,
            message_hash,],//对typedData转为JSON对象后，用Buffer传入sha3函数，并将sha3计算结果转为16进制字符串用Portal签名
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
	var from = conflux.selectedAddress
	if (!from) return connect()
	self_sign_result=ConfluxJSSDK.Message.sign('0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', // privateKey
	'0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba',)
	recover_public_key=ConfluxJSSDK.Message.recover('0x6e913e2b76459f19ebd269b82b51a70e912e909b2f5c002312efc27bcc280f3c29134d382aad0dbd3f0ccc9f0eb8f1dbe3f90141d81574ebb6504156b0d7b95f01',
	'0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba',)
	console.log('Recover result:'+recover_public_key)
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

