# VIDchain-Technical-Screening


Run the tests: 
```
npm test
```


## Secret Handshake
For the solution of this exercise it has been used an Array to collect the different codes.

This way there is no upper limit to get a code from a decimal. Every decimal entered it'll be decomposed.
The quantity of possible codes are used to get the base to decompose every decimal.

Additionally, it's easy to add another code into the system.

Ex:
For a list of 5 codes
The base is 32 because 2⁵ = 32
Then, if the decimal entered is 123, the decimals used to build the codes are = [27, 3]