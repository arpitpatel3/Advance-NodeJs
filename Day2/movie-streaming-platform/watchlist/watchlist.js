export class Watchlist {
  constructor(initial = []) {
    this.items = [...initial];
  }

  async loadForUser(userId) {
    await new Promise(r => setTimeout(r, 150));
    this.items = ["Inception", "Interstellar"];
    return this.items;
  }

  add(title) {
    if (!title) return;
    if (!this.items.includes(title)) {
      this.items.push(title);
    }
    return [...this.items];
  }

  list() {
    return [...this.items];
  }
}

