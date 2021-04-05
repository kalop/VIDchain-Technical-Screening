import { DiffieHellman } from '../src/diffieHellman'
import { expect } from 'chai'



describe('DiffieHellman', () => {

    it('should create an instance of the class', () => {
        let p = 1999
        let g = 37
        let dh = new DiffieHellman(p, g)
        expect(dh.p).to.equal(p)
        expect(dh.g).to.equal(g)
    })

    it('should generate a private key', () => {
        let g = 33
        let p = 3
        let dh = new DiffieHellman(p, g)
        dh.generatePrivateKey()
        expect(dh.getPrivateKey()).to.equal(2)

        p = 11
        dh = new DiffieHellman(p, g)
        dh.generatePrivateKey()
        expect(dh.getPrivateKey()).to.above(1)
        expect(dh.getPrivateKey()).to.below(p)
    })

    it('should calculate a public key', () => {
        let g = 3
        let p = 11
        let dh = new DiffieHellman(p, g)
        // A
        dh.getPrivateKey = function () {
            return 5
        }
        dh.generatePrivateKey()
        expect(dh.getPrivateKey()).to.equal(5)
        dh.generatePublicKey()
        expect(dh.getPublicKey()).to.equal(1)

        // B
        dh.getPrivateKey = function () {
            return 7
        }
        dh.generatePrivateKey()
        expect(dh.getPrivateKey()).to.equal(7)
        dh.generatePublicKey()
        expect(dh.getPublicKey()).to.equal(9)

    })

    it('should calculate a secret key', () => {
        let g = 3
        let p = 11
        let dh = new DiffieHellman(p, g)

        // A
        dh.getPrivateKey = function () {
            return 5
        }
        dh.generatePrivateKey()
        expect(dh.getPrivateKey()).to.equal(5)
        dh.generatePublicKey()
        expect(dh.getPublicKey()).to.equal(1)
        let pk = 9
        dh.generateSecretKey(pk)
        expect(dh.getSecretKey()).to.equal(1)

        // B
        dh.getPrivateKey = function () {
            return 7
        }
        dh.generatePrivateKey()
        expect(dh.getPrivateKey()).to.equal(7)
        dh.generatePublicKey()
        expect(dh.getPublicKey()).to.equal(9)
        pk = 1
        dh.generateSecretKey(pk)
        expect(dh.getSecretKey()).to.equal(1)

    })




})

describe('User interaction Diffie Hellman', () => {
    it('Process a key exchange to create a common secret', () => {
        // Step 0, supply prime numbers p and g
        let p = 1999
        let g = 37

        // Create objects Alice and Bob
        let alice = new DiffieHellman(p, g)
        let bob = new DiffieHellman(p, g)

        // Step 1, Alice and Bob picks a private key
        alice.generatePrivateKey()
        bob.generatePrivateKey()

        // Step 2, Alice and Bob calculates their public key
        alice.generatePublicKey()
        bob.generatePublicKey()

        // Step3, Alice anb Bob exchange public keyes to calculate secret keys
        alice.generateSecretKey(bob.getPublicKey())
        bob.generateSecretKey(alice.getPublicKey())

        expect(alice.getSecretKey()).to.equal(bob.getSecretKey())

    })
})




