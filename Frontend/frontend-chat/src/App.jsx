import React, { useEffect, useState } from "react";

import SockJS from "sockjs-client/dist/sockjs";

import { Client } from "@stomp/stompjs";

function App() {

    const [stompClient, setStompClient] = useState(null);

    const [sender, setSender] = useState("");

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        const socket = new SockJS("http://localhost:8081/ws");

        const client = new Client({

            webSocketFactory: () => socket,

            reconnectDelay: 5000,

            onConnect: () => {

                console.log("Connected");

                client.subscribe("/chatroom/public", (msg) => {

                    const receivedMessage = JSON.parse(msg.body);

                    setMessages((prev) => [...prev, receivedMessage]);
                });
            }
        });

        client.activate();

        setStompClient(client);

        return () => {
            client.deactivate();
        };

    }, []);

    const sendMessage = () => {

        if (!stompClient) return;

        stompClient.publish({

            destination: "/app/message",

            body: JSON.stringify({
                sender: sender,
                content: message
            })
        });

        setMessage("");
    };

    return (

        <div style={{ padding: "20px" }}>

            <h1>Real Time Chat</h1>

            <input
                type="text"
                placeholder="Name"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button onClick={sendMessage}>
                Send
            </button>

            <hr />

            {
                messages.map((msg, index) => (

                    <div key={index}>

                        <b>{msg.sender}</b>: {msg.content}

                    </div>
                ))
            }

        </div>
    );
}

export default App;