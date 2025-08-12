---
layout: note
title: "Modern Cryptography"
date: 2025-08-12
excerpt: "Modern cryptography is based on the fundamental theorem of arithmetic, which states that a number has one and exactly one prime factorization, for example $30 = 2 * 3 * 5$."
---

Modern cryptography is based on the fundamental theorem of arithmetic, which states that a number has one and exactly one prime factorization, for example $30 = 2 * 3 * 5$. 

# Public Key and Private Key
Around 1957, a new method of cryptography was introduced based on the idea of one-sided functions. These functions make it easy to go from one direction to the other, but very hard to go the opposite way (this will all make sense soon). 
Imagine two people that have never met each other want to share a message, which is a color in this example. They first set a specific color, let's say yellow, as the base color. They then choose a random color for themselves and mix it with the yellow color.