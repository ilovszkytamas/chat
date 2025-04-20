import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WEBSOCKET_URL = 'http://localhost:8080/chat';

class WebSocketService {
  private activeSubscriptions: { [key: string]: () => void } = {};
  client: Client;
  connected: boolean = false;
  onConnectCallbacks: (() => void)[] = [];

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(`${WEBSOCKET_URL}?token=${encodeURIComponent(localStorage.getItem('token') || '')}`),
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        this.connected = true;
        this.onConnectCallbacks.forEach((cb) => cb());
        this.onConnectCallbacks = [];
      },
      onStompError: (frame) => {
        console.error('Broker error:', frame.headers['message']);
        console.error('Details:', frame.body);
      },
    });
    
    this.client.activate();
  }

  subscribeToConversation(conversationId: number, callback: (msg: any) => void) {
    const destination = `/topic/conversation.${conversationId}`;
    const subscribe = () => {
      const subscription = this.client.subscribe(destination, (message: IMessage) => {
        callback(JSON.parse(message.body));
      });
      console.log(`Subscribing from ${destination}`);
      this.activeSubscriptions[destination] = () => subscription.unsubscribe();
    };

    if (this.connected) {
      subscribe();
    } else {
      this.onConnectCallbacks.push(subscribe);
    }
  }

  unsubscribeFromConversation(conversationId: number) {
    const destination = `/topic/conversation.${conversationId}`;
    const unsubscribe = this.activeSubscriptions[destination];
    if (unsubscribe) {
      console.log(`Unsubscribing from ${destination}`);
      unsubscribe();
      delete this.activeSubscriptions[destination];
    }
  }

  sendMessage(conversationId: number, content: string) {
    const send = () => {
      const message = {
        conversationId,
        content,
      };

      this.client.publish({
        destination: `/app/conversation.${conversationId}`,
        body: JSON.stringify(message),
      });
    };

    if (this.connected) {
      send();
    } else {
      this.onConnectCallbacks.push(send);
    }
  }

  disconnect() {
    if (this.client && this.client.connected) {
      this.client.deactivate();
      this.connected = false;
    }
  }
}

let instance: WebSocketService | null = null;

export const getWebSocketService = (): WebSocketService => {
  if (!instance) {
    instance = new WebSocketService();
  }
  return instance;
};
