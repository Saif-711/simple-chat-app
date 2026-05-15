# Chat Application

A very simple real-time chat application built using WebSocket technology with Spring Boot and React.

## Overview

This project demonstrates the difference between traditional HTTP communication (`GET` / `POST`) and real-time communication using WebSockets.

In normal HTTP requests:
- The client sends a request.
- The server responds.
- For continuous updates, the client must repeatedly send requests (polling).

This creates:
- High server load
- More network traffic
- Slower real-time updates

To solve this problem, this project uses **WebSocket** communication.

With WebSockets:
- A persistent connection stays open between client and server.
- Messages are sent instantly in real time.
- No need for repeated `GET` requests.

## Technologies Used

- Java
- Spring Boot
- WebSocket
- STOMP Protocol
- SockJS
- React
- Vite

## Features

- Real-time messaging
- Instant message broadcasting
- Low server overhead
- Simple frontend interface
- WebSocket connection using STOMP + SockJS

## How It Works

### Traditional HTTP Communication

```text
Client ---> GET/POST Request ---> Server
Client <--- Response ------------ Server
