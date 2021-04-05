export class SecretHandshakeManager {
    readonly REVERSE = 'reverse'

    // 1: 'wink',
    // 10: 'double blink',
    // 100: 'close your eyes',
    // 1000: 'jump',
    // 10000: REVERSE
    codes = ['wink', 'double blink', 'close your eyes', 'jump', this.REVERSE]

    manageListOfCodes(inputs: Array<number>): Array<string> {
        let result = []
        inputs.forEach(element => {
            result = result.concat(this.getListOfCodes(element))
        })
        return result
    }

    getListOfCodes(n: number): Array<string> {
        let result = []
        for (let index = this.codes.length - 1; index >= 0; index--) {
            let key = Math.pow(2, index)
            let check = Math.floor(n / key)
            n = n % key
            if (check) {
                result.push(this.codes[index])
            }
        }
        return result.reverse()
    }

    manageReverseCode(codes: Array<string>): Array<string> {
        let reverseCount = 0
        codes.forEach(element => {
            if (element == this.REVERSE) {
                reverseCount++
            }
        })
        let result = codes.filter(item => item !== this.REVERSE)
        for (let index = 0; index < reverseCount; index++) {
            result = result.reverse()
        }
        return result
    }

    decomposeInput(input: number): Array<number> {
        let result = []
        let base = Math.pow(2, this.codes.length)
        let quocient = input
        while (quocient != 0) {
            let remainder = quocient % base
            quocient = Math.floor(quocient / base)
            result.push(remainder)
        }

        if (result.length == 0) {
            return [input]
        }
        return result
    }

    getSecretHandshake(input: number): Array<string> {

        let inputs = this.decomposeInput(input)
        let codes = this.manageListOfCodes(inputs)
        let result = this.manageReverseCode(codes)
        return result
    }

}