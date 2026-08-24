export class Book {
  constructor({ id, name, author, ownerId } = {}, currentUsername = "") {
    this.id = id || String(Date.now() + Math.random());
    this.title = name || "";
    this.author = author || "";
    this.ownerId = ownerId || "";
    this.isPrivate = Boolean(
      ownerId && currentUsername && ownerId === currentUsername,
    );
  }

  get displayTitle() {
    return `${this.author}: ${this.title}`;
  }
}

export default Book;
