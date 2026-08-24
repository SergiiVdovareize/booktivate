export class Book {
  constructor(
    { id, name, author, ownerId } = {},
    currentUsername = "",
    isPrivate = false,
  ) {
    this.id = id || String(Date.now() + Math.random());
    this.title = name || "";
    this.author = author || "";
    this.ownerId = ownerId || "";
    this.isPrivate = Boolean(
      isPrivate ||
        (ownerId &&
          currentUsername &&
          ownerId.toLowerCase() === currentUsername.toLowerCase()),
    );
  }

  get displayTitle() {
    return `${this.author}: ${this.title}`;
  }
}

export default Book;
