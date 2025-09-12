---
layout: note
title: "Steganography"
date: 2025-08-23
excerpt: "Steganography hides information in plain sight by making it invisible. It differs from cryptography, which encrypts information using secret codes."
---

Steganography refers to hiding information in plain sight.
In the family of covert communications, steganography has a more well-known sibling in [Cryptography](/notes/Computer Science/Cryptography/Cryptography/). Distinguishing the two from the drop is key. Cryptography is the science of writing in secret code, or encrypting information, while steganography is concerned with making information invisible entirely, or hiding it in plain sight.
Steganography has been used since at least $440\ BC$ by many, including even the Mona Lisa. When computers emerged, a door was opened to hide even more information inside images, like never before. 
To evaluate different methods, the steganography community developed a risk matrix of sorts, calling it the ___trade-off tetrahedron___. The four points represent the key requirements for incognito payload transmission. The _trade-off_ implies that favoring one of the requirements always compromises the other three in some way.
1. **Robustness**: The characteristics of a hidden message that ensure it survives any non-malicious data processing while in transit from sender to recipient.
2. **Security**: The built-in protection against a hostile entity’s attempts to remove or disable the hidden message.
3. **Imperceptibility**:  A hidden message’s ability to exist while not degrading the perceptual content of the host image.
4. **Capacity**: The amount of information that can be hidden inside the cover image.
Of all the digital steganography techniques, one stands out that has a relatively acceptable trade-off in the tetrahedron and that's ___Least Significant Bit Substitution___ (LSB).

# Least Significant Bit Substitution
LSB hides data inside the information least important to the quality of an image, thereby minimizing image distortion. The process is simple. You select a host image and convert it to a bit array. You then locate each binary sequence's least important bit. These are the bits that you can alter without much degradation of the original image. You can make minor alterations to each least significant bit to hide information.
To remain under the radar, steganographers using the LSB method can only manipulate 15% of an image’s content. Another method was introduced in 1990 in [this paper](https://www.spiedigitallibrary.org/conference-proceedings-of-spie/3528/0000/Principles-and-applications-of-BPCS-steganography/10.1117/12.337436.short) to increase this number.
# Bit-Plane Complexity Segmentation (BPCS)
The authors devised a method of splitting an image into two distinct regions: an _informative region_ and a _noise-like region_. An informative region consists of a _simple_ pattern that the eye can recognize instantaneously; a noise-like region consists of a pattern so _complex_ our brains simply don’t register it. To map these regions, steganographers slice images into 8 planes. To make it even easier, a grid is placed over the image and a noise value is attributed to each cell. This is achieved by measuring the amount of pixel contrast inside each segment. This is also known as an _image’s border value_. This method is used to camouflage the informative region of a secret image into the noisy region of a host image.

Sources:
- [exo substack](https://exo.substack.com/p/the-exo-guide-to-data-cloaking).