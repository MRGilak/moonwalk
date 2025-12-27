---
layout: note
title: "Ciphers"
date: 2025-08-23
excerpt: "Ciphers are mechanical operations that transform individual symbols according to an algorithm. They operate on syntax, unlike codes, which operate on semantics and meaning."
---

#cryptography #computer-science 
# What is a cipher?
What's the difference between a code and a cipher?
A code is a mapping from some meaningful unit-such as a word, sentence, or phrase-into something else-usually a shorter group of symbols. For example, we could make up a code where the word apple is written as 67. Generally codes are ways of saving time. A _codebook_ is simply a list of these mappings.
Ciphers on the other hand do not involve meaning. Instead they are mechanical operations, known as algorithms, that are performed on individual or small chunks of letters. For example, in the Caesar cipher [here](/notes/Computer Science/Cryptography/Introduction to Cryptography/) we saw how each letter in the alphabet was mapped to a different letter. For example, $A \rightarrow D$,  $B \rightarrow E$, and $C \rightarrow F$, when we're using a shift of four. This kind of cipher is known as a **shift cipher**. In this case, we don’t need a codebook. Instead, we follow a series of instructions-also known as an **algorithm**-where we shift each letter by a certain number. The algorithm requires one piece of shared information known as a **key**. This shared key is required for two parties to encrypt and decrypt messages.
So to sum up, codes generally operate on _**semantics,**_ meaning, while ciphers operate on _**syntax**,_ symbols. A code is stored as a mapping in a codebook, while ciphers transform individual symbols according to an algorithm.

# Shift Ciphers
The Caesar Cipher is a type of **shift cipher**. Shift Ciphers work by using the modulo operator to encrypt and decrypt messages. The Shift Cipher has a **key K**, which is an **integer from 0 to 25**.
A cipher should prevent an attacker, who has a copy of the cipher text but does not know the key, from discovering the contents of the message. Since **we only have 26 choices for the key**, someone can easily try all of the 26 keys, one by one, until they recover the message. This type of attack is called a **brute force attack**. This is the reason a shift cipher is insecure.
Check out some other ciphers:
- [Polybius Cipher](https://en.wikipedia.org/wiki/Polybius_square)
- [Vigenère cipher](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher)
- [Gronsfeld Cipher](https://en.wiktionary.org/wiki/Gronsfeld_cipher)
- [Playfair Cipher](https://en.wikipedia.org/wiki/Playfair_cipher)

# XOR bitwise operation
From here on, we work on binary numbers, as anything can be represented using binary values in computers. Bitwise operations simply mean the operation is done on each and every single bit.
Using one-time pad, which was introduced [here](/notes/Computer Science/Cryptography/Introduction to Cryptography/), we know that we must generate a random sequence of 1's and 0's with the same length as the message. Then using bitwise operations, we combine this random sequence with the original message. Three basic operations on binary numbers are *And*, *Or*, and *XOR*. Any other logical operation can be made using them. Between these three, _XOR_ is more secure to use. If we were to use _AND_, a bit in the final encrypted message would be 1 if and only if that same bit was 1 in the original message as well. Similarly, if we were to use _OR_, a bit in the encrypted message would be 0 if and only if the corresponding bit was also 0 in the original message. So using these two operations leaks information. Using _XOR_ on the other hand does not leave any clue to what the original message was, as long as the key used to encrypt the message is completely random.
A very good example is provided [here](https://www.khanacademy.org/computing/computer-science/cryptography/ciphers/a/xor-and-the-one-time-pad). I've done a similar simulation here. Take any image. Each pixel has a color that can be represented with an RGB code, basically 24 bits. We can generate a random sequence of bits as long as $number of pixels * 24$ and do bitwise operations. I've done this with a sample image below.
![Figure_1.png](/assets/Computer Science/Cryptography/Figure_1.png)
The original image is on the top left and the random key is basically noise. As you can see, using the _AND_ operation, which results in a one $75 \%$ of the time, creates a darker image, but the original image can still be seen. Using the _OR_ operation, which results in a one $25 \%$ of time, results in a much lighter image, but again, the original image shines through. Using _XOR_ however, completely hides the original image. As far as you know, the original image could have been __any__ image of that size. 

To continue reading about cryptography, see [Modern Cryptography](/notes/Computer Science/Cryptography/Modern Cryptography/).

Sources:
1. [Khan Academy](https://www.khanacademy.org/computing/computer-science/cryptography).