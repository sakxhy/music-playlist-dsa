# 🎵 Music Playlist Manager — Singly Linked List Visualizer

An interactive Data Structures and Algorithms (DSA) mini-project demonstrating a **Singly Linked List** through real-world music playlist operations.

---

## 🌟 Features & Views

This project contains two distinct views tailored for both beginners and technical viva evaluations:

1. **🌱 Simple Demo View (`simple.html`)**:
   - Clean, beginner-friendly UI with visual pointer arrows (`Next ➔`).
   - Highlighted active song node with animated audio visualizer waves.
   - 1-click test presets (*Pop Hits*, *Rock Classics*, *Coding Chill*).
   - Real-time time & space complexity explanation cards ($O(1)$ vs $O(N)$).
   - Loopback / repeat simulation with cycle warning badges.

2. **⚡ Advanced Studio View (`index.html`)**:
   - Full audio player simulator with sound wave canvas animations.
   - Comprehensive linked list manipulation:
     - Insert at Head, Insert at Tail, Insert at Position $k$.
     - Delete by Song Name, Delete at Position $k$.
     - Reverse Linked List in-place (Pointer swapping animation).
     - Search song by title / artist.
     - Floyd's Cycle-Finding Algorithm (Hare & Tortoise) visualizer for repeating playlists.

---

## 🧠 Data Structure Implementation

- **Node Structure**:
  ```javascript
  class SongNode {
      constructor(title, artist, duration) {
          this.title = title;
          this.artist = artist;
          this.duration = duration;
          this.next = null; // Pointer to subsequent song
      }
  }
  ```
- **Operations & Complexity**:
  - `Insert at Head`: $O(1)$
  - `Insert at Tail`: $O(N)$ (or $O(1)$ with tail pointer)
  - `Delete by Position`: $O(N)$
  - `In-place Reversal`: $O(N)$ time, $O(1)$ space
  - `Loop / Cycle Detection`: $O(N)$ Floyd's Algorithm

---

## 🚀 Running Locally

No frameworks or installations required!

1. Clone or download this repository.
2. Open [`simple.html`](simple.html) or [`index.html`](index.html) directly in any web browser (Chrome, Edge, Safari, Firefox).
3. Alternatively, launch a quick local server:
   ```bash
   python3 -m http.server 8080
   ```
   and visit `http://localhost:8080/simple.html`.

---

## 🌐 Live Demo on GitHub Pages

- **Simple Visualizer**: `https://sakxhy.github.io/music-playlist-dsa/simple.html`
- **Full Studio**: `https://sakxhy.github.io/music-playlist-dsa/index.html`

---
*Developed for DSA Industrial Practice Mini Project.*
