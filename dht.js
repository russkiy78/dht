var ed = require('ed25519-supercop')
var keypair = ed.createKeyPair(ed.createSeed())

var value = new Buffer(200)// the payload you want to send
value.fill('1')

var opts = {
    k: keypair.publicKey,
    seq: 0,
    v: value,
    sign: function (buf) {
        return ed.sign(buf, keypair.publicKey, keypair.secretKey)
    }
}

console.log(opts)


var DHT = require('bittorrent-dht')
var dht = new DHT

var hash

dht.put(opts, function (err, hash) {
    console.error('error=', err)
    console.log('hash=', hash)

    dht.get(hash, function (err, res) {
        console.log( '--------------')
        console.log(  res)
    })

    dht.get(hash, function (err, res) {
        console.log( '--------------')
        console.log(  res)
        console.log(  dht.toJSON())
    })
})
