package com.sockets.websocket.Config;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(Message message){
        return message;
    }
    
}
