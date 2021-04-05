import * as bigintModArith from 'bigint-mod-arith'

export class DiffieHellman {
    public p: number
    public g: number
    private privateKey: number
    private publicKey: number
    private secretKey: number


    constructor(p: number, g: number) {
        this.p = p
        this.g = g
    }

    /**
     * Creates the privateKey getting a number between p and 1 (not included)
     */
    generatePrivateKey() {
        this.privateKey = Math.floor(Math.random() * (this.p - 2) + 2)
    }

    /**
     * Creates a publicKey
     * It uses BigInt to manage large numbers
     * publicKey = (g ^ privateKey) % p
     */
    generatePublicKey() {
        this.publicKey = Number(bigintModArith.modPow(this.g, this.getPrivateKey(), this.p))
    }

    /**
     * Creates a secretKey
     * It uses BigInt to manage large numbers
     * secretKey = (publicKey ^ privateKey) % p
     */
    generateSecretKey(pk: number) {
        this.secretKey = Number(bigintModArith.modPow(pk, this.getPrivateKey(), this.p))
    }

    getPrivateKey(): number {
        return this.privateKey
    }

    getPublicKey(): number {
        return this.publicKey
    }

    getSecretKey(): number {
        return this.secretKey
    }

}
