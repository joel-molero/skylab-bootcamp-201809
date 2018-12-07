# Atlantis

## Intro
--------

This is an aplication which allows the user to communicate with another person via videocall, or participate in a group chat.

## Functional description
--------

The Atlantis App allows peer-to-peer video communication without the need of any external programs. With the use os WebRTC technology a connection is made browser to browser.

## Technical description
-----
Atlantis is a web application meant to run within a browser environment. It consists of a ReactJS frontend that connects to the webRTC APIs:

RTCPeerConnection: Responsible of establishing the connection between the peers and exchanging data.

RTCSessionDescription: Responsible of setting the configuration before establishing the connection.

RTCIceCandidate: Represents a candidate Internet Connectivity Establishment configuration which may be used to establish an RTCPeerConnection. It describes the protocols for WebRTC to be able to estabilish a connection.

These APIs expose the most used functions, for example:

getUserMedia()  getTracks()   setRemoteDescription()



## Functional Diagram

![](./images/Functional_diagram.png)