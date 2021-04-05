import { SecretHandshakeManager } from '../src/secretHandshake'
import { expect } from 'chai'


describe('SecretHandshakeManager', () => {

    it('should initialize a list of codes', () => {
        let shm = new SecretHandshakeManager()
        expect(shm.codes.length).to.equal(5)
    })

    it('should has a particular code named reverse', () => {
        let shm = new SecretHandshakeManager()
        expect(shm.REVERSE).to.equal('reverse')
    })


    it('should return the list of codes, without apply particular codes', () => {
        let shm = new SecretHandshakeManager()
        expect(shm.getListOfCodes(0)).to.eql([])
        expect(shm.getListOfCodes(1)).to.eql(['wink'])
        expect(shm.getListOfCodes(2)).to.eql(['double blink'])
        expect(shm.getListOfCodes(4)).to.eql(['close your eyes'])
        expect(shm.getListOfCodes(8)).to.eql(['jump'])
        expect(shm.getListOfCodes(16)).to.eql(['reverse'])

        expect(shm.getListOfCodes(3)).to.eql(['wink', 'double blink'])
        expect(shm.getListOfCodes(19)).to.eql(['wink', 'double blink', 'reverse'])
    })

    it('should manage the particular code reverse', () => {
        let shm = new SecretHandshakeManager()
        let codes = []
        expect(shm.manageReverseCode(codes)).to.eql([])

        codes = ['reverse']
        expect(shm.manageReverseCode(codes)).to.eql([])

        codes = ['wink', 'reverse']
        expect(shm.manageReverseCode(codes)).to.eql(['wink'])

        codes = ['wink', 'double blink', 'reverse']
        expect(shm.manageReverseCode(codes)).to.eql(['double blink', 'wink'])

        codes = ['wink', 'double blink', 'reverse', 'reverse']
        expect(shm.manageReverseCode(codes)).to.eql(['wink', 'double blink'])

    })

    it('should decompose the input depending on the codes length', () => {
        let shm = new SecretHandshakeManager()
        expect(shm.decomposeInput(0)).to.eql([0])
        expect(shm.decomposeInput(1)).to.eql([1])
        expect(shm.decomposeInput(3)).to.eql([3])
        expect(shm.decomposeInput(16)).to.eql([16])
        expect(shm.decomposeInput(31)).to.eql([31])
        expect(shm.decomposeInput(32)).to.eql([0, 1])
        expect(shm.decomposeInput(123)).to.eql([27, 3])
        expect(shm.decomposeInput(1123)).to.eql([3, 3, 1])
        expect(shm.decomposeInput(528)).to.eql([16, 16])
    })

    it('should concat the lists of codes', () => {
        let shm = new SecretHandshakeManager()
        //19
        expect(shm.manageListOfCodes([19])).to.eql(['wink', 'double blink', 'reverse'])
        //123
        expect(shm.manageListOfCodes([27, 3])).to.eql(['wink', 'double blink', 'jump', 'reverse', 'wink', 'double blink'])
        //1123
        expect(shm.manageListOfCodes([3, 3, 1])).to.eql(['wink', 'double blink', 'wink', 'double blink', 'wink'])
        //528
        expect(shm.manageListOfCodes([16, 16])).to.eql(['reverse', 'reverse'])
        //627
        expect(shm.manageListOfCodes([19, 19])).to.eql(['wink', 'double blink', 'reverse', 'wink', 'double blink', 'reverse'])
    })

    it('should return the secret handshake', () => {
        let shm = new SecretHandshakeManager()
        expect(shm.getSecretHandshake(0)).to.eql([])
        expect(shm.getSecretHandshake(3)).to.eql(['wink', 'double blink'])
        expect(shm.getSecretHandshake(19)).to.eql(['double blink', 'wink'])
        // 19, 19
        expect(shm.getSecretHandshake(627)).to.eql(['wink', 'double blink', 'wink', 'double blink'])
        // 19,19,19
        expect(shm.getSecretHandshake(20083)).to.eql(['double blink', 'wink', 'double blink', 'wink', 'double blink', 'wink'])

        expect(shm.getSecretHandshake(31)).to.eql(['jump', 'close your eyes', 'double blink', 'wink'])
        expect(shm.getSecretHandshake(32)).to.eql(['wink'])


    })


})