---
layout: note
title: "Contact Detection"
date: 2026-03-28
excerpt: "Contact detection is crucial for stable locomotion in legged robots. Accurate contact state estimation is typically achieved by estimating the force exerted on the ground and applying a threshold."
---

#Robotics #Control #Contact-detection #Estimation

Accurate contact state estimation is fundamental to achieving stable locomotion in legged robots. 
We often hear that force estimators are unreliable; that they drift over time and are prone to damage because of the constant impulses resulted by the walking of the robot. However, I didn't believe these until I saw it with my own eyes. 
As a part of our [single leg project](/notes/Robotics/Single Leg Project/Single Leg Project/), we installed a pneumatic force sensor on the foot of the robot (well, it was actually a pitot pressure sensor, but it's all the same). We went for this particular sensor, because it was more accurate than any other sensor we tested. At first, it seemed like a good sensor, but over time we got to know its problems:
- It would drift over time
- It would become looser every time we put the robot on the ground
- It needed recalibration every time the communication to the motors or to the Arduino board was lost
That's when I truly understood what all these papers meant :)
To solve the problem, I got into reading some contact detection papers and we implemented several of them on the actual robot.
Generally, the typical approach to contact estimation is to first estimate the force that the foot is exerting on the ground and then by putting some form of a threshold on this force, contact can be detected. This threshold is where most papers introduce novelty in the form of double-thresholds, hysteresis and Schmitt trigger-like thresholds, etc.