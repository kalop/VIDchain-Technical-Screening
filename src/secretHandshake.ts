export class SecretHandshakeManager {
    readonly REVERSE = 'reverse'

    // 1: 'wink',
    // 10: 'double blink',
    // 100: 'close your eyes',
    // 1000: 'jump',
    // 10000: REVERSE
    codes = ['wink', 'double blink', 'close your eyes', 'jump', this.REVERSE]

    /**
     * Returns an array of numbers
     * The numbers are got from the decimal input
     * The input is decomposed by the base (2^codes.length)
     * @param input Decimal entered by the user to translate to the code
     */
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
    /**
     * Returns an array with the codes of every decimal in the inputs parameter
     * 
     * @param inputs Array with the decomposed decimal
     */
    manageListOfCodes(inputs: Array<number>): Array<string> {
        let result = []
        inputs.forEach(element => {
            result = result.concat(this.getListOfCodes(element))
        })
        return result
    }

    /**
     * Returns an array with the secret code from a decimal
     * Every index of the array "codes" is used to define the filters of the codes, as they are powers of 2
     * 
     * 
     * @param n The decimal entered
     * 
     * "key" is the filter of every code in the list
     * Ex:
     *  'double blink' is in the position 1, then the key = 2¹ = 10
     *  'close your eyes' is in the position 2, then the key = 2² = 4 = 100
     * "check" is the variable to control if a filter is used 
     */
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

    /**
     * Returns an Array with the codes
     * It deletes all the matches with the code "reverse"
     * It reverses the array as many times as the code "reverse" appears
     * 
     * @param codes Array with the codes to check
     */
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

    /**
     * Returns the secret handshake from the decimal passed
     * 
     * @param input Decimal to convert to a code
     */
    getSecretHandshake(input: number): Array<string> {
        let inputs = this.decomposeInput(input)
        let codes = this.manageListOfCodes(inputs)
        let result = this.manageReverseCode(codes)
        return result
    }

}