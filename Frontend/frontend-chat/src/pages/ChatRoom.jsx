import React, { useEffect, useState } from "react";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

function App() {

    const [stompClient, setStompClient] = useState(null);

    const [sender, setSender] = useState("");

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        const socket = new SockJS("http://localhost:8080/ws");

        const client = Stomp.over(socket);

        client.connect({}, () => {

            console.log("Connected");

            client.subscribe("/chatroom/public", (msg) => {

                const receivedMessage = JSON.parse(msg.body);

                setMessages((prev) => [...prev, receivedMessage]);
            });
        });

        setStompClient(client);

    }, []);

    const sendMessage = () => {

        if (!stompClient) return;

        stompClient.send(
            "/app/message",
            {},
            JSON.stringify({
                sender,
                content: message
            })
        );

        setMessage("");
    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Real Time Chat</h2>

            <input
                type="text"
                placeholder="Your Name"
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

                    <p key={index}>
                        <b>{msg.sender}:</b> {msg.content}
                    </p>
                ))
            }

        </div>
    );
}

export default App;