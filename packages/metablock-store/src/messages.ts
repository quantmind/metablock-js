import { action, makeObservable, observable } from "mobx";

const defaultDuration = 6000;

export class Message {
  level: string;
  text: string;
  duration: number;

  constructor(level: string, text: string, duration: number) {
    this.level = level;
    this.text = text;
    this.duration = duration;
  }
}

class MessageStore {
  message?: Message = undefined;

  constructor() {
    makeObservable(this, {
      message: observable,
      success: action,
      info: action,
      error: action,
      clear: action,
    });
  }

  success(text: string, duration = defaultDuration) {
    this.message = new Message("success", text, duration);
  }

  info(text: string, duration = defaultDuration) {
    this.message = new Message("info", text, duration);
  }

  error(text: string, duration = defaultDuration) {
    this.message = new Message("error", text, duration);
  }

  clear() {
    this.message = undefined;
  }
}

export default MessageStore;
