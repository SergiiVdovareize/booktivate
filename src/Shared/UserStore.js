import { makeAutoObservable } from "mobx";
import { USER_NAME } from "./config";

export class UserStore {
  username = USER_NAME;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  setUsername = (name) => {
    this.username = name;
  };

  get apiBase() {
    return `https://tdd.demo.reaktivate.com/v1/books/${this.username}`;
  }
}

export default UserStore;
