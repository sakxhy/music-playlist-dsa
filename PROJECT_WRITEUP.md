# MINI PROJECT REPORT / PRACTICAL FILE WRITEUP

**COURSE:** Data Structures and Algorithms (DSA) / Industrial Practice Lab  
**PROJECT TITLE:** Music Playlist Management System Using Singly Linked List  
**STUDENT NAME:** Sakshi  
**GITHUB REPOSITORY:** [https://github.com/sakxhy/music-playlist-dsa](https://github.com/sakxhy/music-playlist-dsa)  
**LIVE DEMO (SIMPLE VIEW):** [https://sakxhy.github.io/music-playlist-dsa/simple.html](https://sakxhy.github.io/music-playlist-dsa/simple.html)  
**LIVE DEMO (STUDIO VIEW):** [https://sakxhy.github.io/music-playlist-dsa/index.html](https://sakxhy.github.io/music-playlist-dsa/index.html)  

---

## 1. AIM & OBJECTIVES

### Aim
To design, implement, and visually demonstrate a dynamic **Music Playlist Management System** utilizing a **Singly Linked List** data structure to perform real-world sequential media playback operations.

### Objectives
1. Implement a custom Singly Linked List with dynamic node allocation.
2. Provide core operations: Insertion (Head, Tail, Position), Deletion (by value, position), Linear Traversal, and in-place Reversal.
3. Demonstrate cycle detection for repeat/loop playlist mode using Floyd's Tortoise and Hare Algorithm.
4. Build an interactive, visual web interface to bridge theoretical DSA concepts with practical software engineering.

---

## 2. PROBLEM STATEMENT & MOTIVATION

In standard media player applications (e.g., Spotify, Apple Music), a user frequently adds songs to the top ("Play Next"), appends songs to the bottom ("Add to Queue"), removes played tracks, and reverses queue orders.

### Why Linked List over Arrays?
| Feature | Array / Vector | Singly Linked List (Chosen) |
| :--- | :--- | :--- |
| **Size** | Fixed or requires costly reallocation | Dynamic; expands and shrinks at runtime |
| **Insert at Head ("Play Next")** | $O(N)$ — requires shifting all elements | **$O(1)$** — pointer update only |
| **Delete Current Song** | $O(N)$ — requires shifting elements left | **$O(1)$** if pointer is known, $O(N)$ to locate |
| **Memory Allocation** | Contiguous block in memory | Non-contiguous; efficient heap allocation |
| **Pointer Traversal** | Index-based (`arr[i]`) | Sequential node chaining (`curr = curr.next`) |

---

## 3. SYSTEM SPECIFICATIONS

### Hardware Requirements
- **Processor:** Intel Core i3 / AMD Ryzen 3 or higher (or Apple Silicon M-series)
- **RAM:** Minimum 2 GB (4 GB+ recommended)
- **Storage:** < 50 MB free disk space

### Software Requirements
- **Operating System:** Platform independent (macOS, Windows 10/11, Linux, Android, iOS)
- **Runtime Environment:** Any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari)
- **Version Control & Hosting:** Git, GitHub, GitHub Pages
- **Development Languages:** HTML5, CSS3, Vanilla JavaScript (ES6+)

---

## 4. DATA STRUCTURE DESIGN & ARCHITECTURE

### 4.1 Node Structure (`SongNode`)
Each song in the playlist is encapsulated within a node containing song metadata and a reference pointer to the subsequent track.

```text
+-------------------------------------------------+
|                    SongNode                     |
+-------------------------------------------------+
|  - title    : String   (e.g., "Blinding Lights")|
|  - artist   : String   (e.g., "The Weeknd")     |
|  - duration : String   (e.g., "3:20")           |
|  - next     : SongNode (Pointer to next song)   |
+-------------------------------------------------+
```

### 4.2 Singly Linked List Structure (`Playlist`)
```text
HEAD                                              TAIL
 [Node 1] ----next----> [Node 2] ----next----> [Node 3] ----next----> NULL
 (Active)               (Next Up)              (Last)
```

---

## 5. ALGORITHMS & COMPLEXITY ANALYSIS

### Algorithm 1: Insert at Head ("Play Next")
- **Time Complexity:** $O(1)$
- **Space Complexity:** $O(1)$
- **Steps:**
  1. Create a new `SongNode(title, artist, duration)`.
  2. Set `newNode.next = head`.
  3. Update `head = newNode`.
  4. Increment playlist size counter.

### Algorithm 2: Insert at Tail ("Add to Queue")
- **Time Complexity:** $O(N)$ *(or $O(1)$ if tail pointer maintained)*
- **Space Complexity:** $O(1)$
- **Steps:**
  1. Create a new `SongNode`.
  2. If `head == NULL`, set `head = newNode` and return.
  3. Traverse from `head` until `temp.next == NULL`.
  4. Set `temp.next = newNode`.

### Algorithm 3: Delete by Song Title / Position
- **Time Complexity:** $O(N)$
- **Space Complexity:** $O(1)$
- **Steps:**
  1. If `head == NULL`, display underflow error.
  2. If `head.title == target`, set `head = head.next`.
  3. Otherwise, maintain two pointers: `prev` and `curr`.
  4. Traverse until `curr.title == target` or `curr == NULL`.
  5. If found, link `prev.next = curr.next`.

### Algorithm 4: In-place Reversal of Playlist
- **Time Complexity:** $O(N)$
- **Space Complexity:** $O(1)$
- **Steps:**
  1. Initialize three pointers: `prev = NULL`, `curr = head`, `next = NULL`.
  2. While `curr != NULL`:
     - `next = curr.next` (store next node)
     - `curr.next = prev` (reverse pointer)
     - `prev = curr` (advance prev)
     - `curr = next` (advance curr)
  3. Set `head = prev`.

### Algorithm 5: Cycle Detection (Floyd's Tortoise and Hare Algorithm)
- **Time Complexity:** $O(N)$
- **Space Complexity:** $O(1)$
- **Purpose:** Used to detect and manage "Repeat / Loop Playlist" mode without infinite loops.
- **Steps:**
  1. Initialize two pointers at head: `slow = head`, `fast = head`.
  2. While `fast != NULL` and `fast.next != NULL`:
     - `slow = slow.next` (moves 1 step)
     - `fast = fast.next.next` (moves 2 steps)
     - If `slow == fast`, a cycle exists.

---

## 6. COMPLEXITY SUMMARY TABLE

| Operation | Best Case Time | Average Case Time | Worst Case Time | Space Complexity |
| :--- | :---: | :---: | :---: | :---: |
| **Insert at Head** | $O(1)$ | $O(1)$ | $O(1)$ | $O(1)$ |
| **Insert at Tail** | $O(1)$ | $O(N)$ | $O(N)$ | $O(1)$ |
| **Insert at Position $k$** | $O(1)$ | $O(N)$ | $O(N)$ | $O(1)$ |
| **Delete by Title/Index**| $O(1)$ | $O(N)$ | $O(N)$ | $O(1)$ |
| **Search by Title** | $O(1)$ | $O(N)$ | $O(N)$ | $O(1)$ |
| **In-place Reversal** | $O(N)$ | $O(N)$ | $O(N)$ | $O(1)$ |
| **Cycle Detection** | $O(1)$ | $O(N)$ | $O(N)$ | $O(1)$ |

---

## 7. CORE IMPLEMENTATION CODE (JAVASCRIPT)

```javascript
// 1. Define Song Node
class SongNode {
    constructor(title, artist, duration) {
        this.title = title;
        this.artist = artist;
        this.duration = duration;
        this.next = null;
    }
}

// 2. Define Singly Linked List Playlist Manager
class PlaylistManager {
    constructor() {
        this.head = null;
        this.currentTrack = null;
        this.size = 0;
    }

    // Insert at beginning (Play Next) - O(1)
    insertAtHead(title, artist, duration) {
        const newNode = new SongNode(title, artist, duration);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
        if (!this.currentTrack) this.currentTrack = this.head;
    }

    // Insert at end (Add to Queue) - O(N)
    insertAtTail(title, artist, duration) {
        const newNode = new SongNode(title, artist, duration);
        if (!this.head) {
            this.head = newNode;
            this.currentTrack = newNode;
        } else {
            let temp = this.head;
            while (temp.next !== null) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
        this.size++;
    }

    // Delete node by position - O(N)
    deleteAtPosition(index) {
        if (!this.head || index < 0 || index >= this.size) return false;
        
        if (index === 0) {
            const deleted = this.head;
            this.head = this.head.next;
            if (this.currentTrack === deleted) this.currentTrack = this.head;
            this.size--;
            return true;
        }

        let prev = null;
        let curr = this.head;
        for (let i = 0; i < index; i++) {
            prev = curr;
            curr = curr.next;
        }

        prev.next = curr.next;
        if (this.currentTrack === curr) this.currentTrack = curr.next || this.head;
        this.size--;
        return true;
    }

    // Reverse the playlist in-place - O(N) Time, O(1) Space
    reverse() {
        let prev = null;
        let curr = this.head;
        let next = null;
        while (curr !== null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        this.head = prev;
    }

    // Play next song in sequence
    playNext() {
        if (this.currentTrack && this.currentTrack.next) {
            this.currentTrack = this.currentTrack.next;
            return true;
        }
        return false;
    }
}
```

---

## 8. TEST CASES & VERIFICATION

| Test Case ID | Operation Tested | Input | Expected Output | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Empty List Playback | Click "Play" on empty list | Toast notification: "Playlist is empty" | **PASS** |
| **TC-02** | Insert at Head | Add "Blinding Lights" at Head | Song becomes `Head` (Index 0), `head.next` points to old head | **PASS** |
| **TC-03** | Insert at Tail | Add "Levitating" to Queue | Song appended after last node, points to `NULL` | **PASS** |
| **TC-04** | Sequential Traversal | Click "Next Song" | Current pointer advances to `current.next` | **PASS** |
| **TC-05** | Deletion of Head | Remove song at index 0 | Head pointer updates to node 1, size decrements | **PASS** |
| **TC-06** | In-place Reversal | Click "Reverse Playlist" | Pointers inverted: Tail becomes Head, Head becomes Tail | **PASS** |
| **TC-07** | Preset Loaders | Load "Rock Classics" preset | 4 pre-configured nodes loaded into list | **PASS** |

---

## 9. CONCLUSION & FUTURE SCOPE

### Conclusion
This project successfully bridges fundamental data structures with real-world user interface design. By modeling a music playlist with a Singly Linked List, the project clearly proves why pointer-based dynamic data structures outperform static arrays for queue-heavy sequential applications.

### Future Scope
1. **Doubly Linked List (DLL):** Implement backward pointers (`prev`) to enable a true "Previous Track" button with $O(1)$ efficiency.
2. **Circular Linked List:** Wire the tail directly to the head to natively model an infinite repeat loop.
3. **Priority Queue / Max-Heap:** Enable "Top 10 Most Played" dynamic queue sorting based on play counts.
4. **Spotify Web API Integration:** Stream authentic full-length audio previews directly from Spotify.

---
**Verified & Deployed Live via GitHub Pages:**  
- [https://sakxhy.github.io/music-playlist-dsa/simple.html](https://sakxhy.github.io/music-playlist-dsa/simple.html)  
- [https://sakxhy.github.io/music-playlist-dsa/index.html](https://sakxhy.github.io/music-playlist-dsa/index.html)
