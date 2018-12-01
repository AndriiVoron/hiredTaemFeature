class TabsConnector {
  constructor() {
    this.channelName = 'ciklum.test';
    this.listeners = [];
    this.channel = new BroadcastChannel(this.channelName);

    this.channel.onmessage = (message) => {
      if (message.data) {
        this.listeners.forEach(cb => cb(message.data.payload));
      }
    };
  }

  sendMessage(data) {
    this.channel.postMessage({
      payload: data,
    });
  }

  addListener(cb) {
    this.listeners.push(cb);
  }

  removeListener(oldCb) {
    this.listeners = this.listeners.filter(cb => cb !== oldCb);
  }
}

export default new TabsConnector();
