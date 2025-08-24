---
layout: note
title: "Introduction to Cryptography"
date: 2025-08-23
excerpt: "Cryptography involves encrypting messages by shifting letters or using random sequences to obscure their meaning, with techniques ranging from the simple Caesar cipher to the theoretically unbreakable"
---

#cryptography #computer-science 
# The Caesar Cipher
One of the earliest examples of cryptography is when Julius Caesar used a type of cryptography to send letters to his commanders. He shifted each letter in the alphabet by a number, which was known in advance by both sides. For example, if it was 3, then _A_ would become _D_, _B_ would become _E_, etc. The receiver then deciphers this by shifting the message letters backward the same amount of times. This is known as the Caesar cipher.
The weakness of this technique is that it can be broken down easily using language frequency analysis. Each language has a unique fingerprint in that which letters show up how much in a text. The ciphered text's frequency analysis could then be matched with the language frequency fingerprint to find the number of shifts.
Check [this interactive tool](https://www.khanacademy.org/computing/computer-science/cryptography/crypt/pi/caesar-cipher-exploration) to familiarize yourself with the Caesar cipher.

# The Polyalphabetic Cipher
To overcome the weakness of the Caesar cipher, let's choose a word as the key this time. For example a five letter word can be chosen. Then this word is transformed into numbers based on their place in the alphabet. The resulting numbers are then written under the message in a repeated fashion and each letter is shifted that many times. For example if the key is ___abcde___, then the key number is ___12345___. The first letter in the message is shifted once, the second letter twice, the third letter 3 times, etc. The sixth letter is again shifted once. This act flattens the distribution of the letters and leaves a lighter fingerprint. Frequency analysis alone won't help decipher this. 
If someone wanted to decipher this, they would have to check the frequency analysis of every 5th letter and see if it matches the language frequency fingerprint. The challenge is that 5, the length of the keyword. is not known beforehand. The longer the keyword, the more difficult it is to break the code.
Check [this interactive tool](https://www.khanacademy.org/computing/computer-science/cryptography/crypt/pi/polyalphabetic-exploration) to interact with the polyalphabetic cipher yourself.

# The One-time Pad
To overcome the problems, instead of using a deterministic word as the key, and repeating the numbers, a random sequence of numbers is generated. This sequence is as long as the message itself and is used to encode the message by shifting each letter by a random amount. The encrypted message will have a uniform frequency of letters, and therefore it will not be prone to any kind of frequency analysis.
If a 5-letter word is encrypted using this method, any 5-letter word is as equally likely to be the ciphered text as any other 5-letter word. This is called ___Perfect Secrecy___.
Perfect Secrecy lies in using _randomness_ to encrypt messages. Perfect secrecy is achieved when even with unlimited computational power, the best someone can do to crack the code is to just guess. 
You can try the one-time pad for yourself [here](https://www.khanacademy.org/computing/computer-science/cryptography/crypt/pi/perfect-secrecy-exploration).

# Frequency Stability Property
Truly random sequences are equally likely to have any combination of letters and numbers. For example, a truly random sequence of bits has roughly as equally many 001's as 010's and 100's and etc. This is called the frequency stability property. It is very hard to regenerate manually, because our brain cannot accept that for example when you throw a coin 20 times, getting 20 heads in a row is as equally likely as any other outcome. Therefore, when we try to generate random sequences manually, we generally fail.

# Pseudo-random Number Generators
In reality, mechanical or electrical machines are used to generate random sequences.
In WW2, the enigma machine was used. It had three (or more) rotors. On each of them were some random shuffled numbers. If the initial state of the machine was known, the operator could regenerate the same sequence of numbers. This initial state (along with some other things, like the number of rotors used) is called a ___key setting___. The collection of all possible key settings is called the ___key space___. The security of a rotos machine depends on both the size of the key space and the randomness of the key setting.
To simulate generating random numbers, this method was proposed by Neumann: First, a truly random number is picked, known as the ___seed___, for example a 3-digit number from actually measuring noise or from picking the exact milliseconds of time at the current moment. Then one would multiply this number with itself and use the middle of the output as the next seed. This process will then be repeated. This is known as the middle-squares method. 
An important difference between truly random sequences and a pseudo-random sequence, like the middle-squares method, is that the pseudo-random sequence must eventually repeat itself. The length before a pseudo-random sequence repeats is called its ___period___. The period of a pseudo-random sequence is strictly limited by the length of the original seed. A 3-digit seed cannot expand past 1000 numbers before repeating.
Another important distinction between random and pseudo-random sequences is that when you generate a pseudo-random sequence, there are many sequences which cannot occur. For example if one-time pad is used to encrypt a 20-letter long message, the possible key space is $26^{20}$, but with a 4-digit seed and a pseudo-random generator it is only $10000$. This brings up the important distinction between what is possible and what is possible in practice. If a seed is long enough that even the most advanced computers cannot try all of the combinations in its seed space (key space), then it is practically secure.

A random walk is sometimes used to visualize a random sequence. The random walk for a seed eventually repeats itself, but the random walk of a truly random sequence doesn't. You can see this in effect [here](https://www.khanacademy.org/computing/computer-science/cryptography/crypt/pi/random-walk-exploration).

Continue learning about cryptography [here](/notes/Computer Science/Cryptography/Ciphers/).

Sources:
1. [Khan Academy](https://www.khanacademy.org/computing/computer-science/cryptography).