# PROJECT WRITEUP: MUSIC PLAYLIST MANAGEMENT SYSTEM
### Implementation of Singly Linked List in Web Application

**Course:** Data Structures & Algorithms Lab / Industrial Practice  
**Project Title:** Interactive Music Playlist Manager Using Singly Linked List  
**Author:** Sakshi  
**Repository:** [https://github.com/sakxhy/music-playlist-dsa](https://github.com/sakxhy/music-playlist-dsa)  
**Live Demo:** [https://sakxhy.github.io/music-playlist-dsa/simple.html](https://sakxhy.github.io/music-playlist-dsa/simple.html)  

---

## 1. PROJECT OVERVIEW

The **Music Playlist Manager** is an interactive web-based application designed to demonstrate the real-world application of a **Singly Linked List**. 

While listening to music on applications like Spotify or Apple Music, users perform common queue actions such as:
- Adding a song to play immediately next ("Play Next").
- Appending a song to the end of the line ("Add to Queue").
- Removing a track from the playlist.
- Moving forward from one song to the next song sequentially.
- Inverting the playback order ("Reverse Playlist").

In computer science, a **Singly Linked List** is the natural data structure to model this behavior because songs are played one after another through pointer connections rather than fixed index numbers.

---

## 2. HOW SINGLY LINKED LIST IS IMPLEMENTED IN THIS PROJECT

A Singly Linked List is a linear data collection where each element is stored in a separate object called a **Node**. Unlike arrays, nodes are not stored in continuous memory blocks; instead, each node stores a reference pointer (`next`) that links it to the subsequent node.

### 2.1 The Song Node (`SongNode`)
In our project, every song in the playlist is represented as an instance of `SongNode`. Each node contains two parts:
1. **Data Fields:** Information about the song (Title, Artist, Duration).
2. **Pointer Field (`next`):** A reference pointing to the next `SongNode` in the playlist. If there is no next song, it points to `null`.

```javascript
class SongNode {
    constructor(title, artist, duration) {
        this.title = title;        // Data: Song Name
        this.artist = artist;      // Data: Artist Name
        this.duration = duration;  // Data: Duration in mm:ss
        this.next = null;          // Pointer: Link to next song node
    }
}
```

```text
+-------------------------------------------------------------+
|                          SongNode                           |
+-------------------------------------------------------------+
|  Data:    title, artist, duration                           |
|  Pointer: next ───> (points to the next SongNode or NULL)   |
+-------------------------------------------------------------+
```

---

### 2.2 The Playlist Manager Structure
The playlist is managed by a `PlaylistManager` class that maintains key reference pointers:
- **`head`:** Points to the very first song in the playlist. If `head === null`, the playlist is empty.
- **`currentTrack`:** Points to the song currently playing.
- **`size`:** Tracks the total number of songs currently in the playlist.

```text
HEAD                                                        TAIL
 [Song 1] ────.next────> [Song 2] ────.next────> [Song 3] ────.next────> NULL
 (Current)               (Next Up)               (Last Song)
```

```javascript
class PlaylistManager {
    constructor() {
        this.head = null;         // Start of the playlist
        this.currentTrack = null; // Currently playing node
        this.size = 0;            // Number of songs
    }
}
```

---

## 3. CORE LINKED LIST OPERATIONS & THEIR IMPLEMENTATION

### 3.1 INSERTION OPERATIONS

#### A. Insertion at Head ("Play Next")
- **Purpose:** Adds a song right at the beginning of the playlist so it plays next.
- **How it works:**
  1. A new node is created with the given song details.
  2. The new node's `.next` pointer is set to point to the current `head`.
  3. The `head` pointer is updated to point to this new node.
  4. The size counter is incremented.

```javascript
insertAtHead(title, artist, duration) {
    const newNode = new SongNode(title, artist, duration);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;

    // If no song is currently playing, start with this new song
    if (!this.currentTrack) {
        this.currentTrack = this.head;
    }
}
```

---

#### B. Insertion at Tail ("Add to Queue")
- **Purpose:** Adds a song to the very end of the playlist.
- **How it works:**
  1. A new node is created.
  2. If the playlist is empty (`head === null`), set `head` to the new node.
  3. If not empty, start a temporary pointer `temp` at `head` and traverse forward until `temp.next === null` (the last node).
  4. Point `temp.next` to the new node.

```javascript
insertAtTail(title, artist, duration) {
    const newNode = new SongNode(title, artist, duration);
    if (!this.head) {
        this.head = newNode;
        this.currentTrack = newNode;
    } else {
        let temp = this.head;
        while (temp.next !== null) {
            temp = temp.next; // Move forward along pointers
        }
        temp.next = newNode; // Attach at the end
    }
    this.size++;
}
```

---

#### C. Insertion at a Specific Position
- **Purpose:** Inserts a song at any custom position (index) chosen by the user.
- **How it works:**
  1. If index is 0, reuse `insertAtHead()`.
  2. Otherwise, traverse the list to reach the node right before the desired position (`index - 1`).
  3. Set `newNode.next = prev.next`.
  4. Set `prev.next = newNode`.

```javascript
insertAtPosition(title, artist, duration, index) {
    if (index < 0 || index > this.size) return false;
    if (index === 0) {
        this.insertAtHead(title, artist, duration);
        return true;
    }

    const newNode = new SongNode(title, artist, duration);
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
        prev = prev.next;
    }

    newNode.next = prev.next;
    prev.next = newNode;
    this.size++;
    return true;
}
```

---

### 3.2 DELETION OPERATIONS

#### A. Deletion from Head
- **Purpose:** Removes the first song from the playlist.
- **How it works:**
  1. If the list is empty, nothing is done.
  2. Move the `head` pointer forward to `head.next`.
  3. The previous head node is unlinked and cleaned up by memory management.

```javascript
deleteHead() {
    if (!this.head) return false;
    const deletedNode = this.head;
    this.head = this.head.next; // Head moves to next node
    
    if (this.currentTrack === deletedNode) {
        this.currentTrack = this.head;
    }
    this.size--;
    return true;
}
```

---

#### B. Deletion by Position / Specific Song
- **Purpose:** Allows the user to click the "Delete" button on any song card to remove it from anywhere in the list.
- **How it works:**
  1. If deleting index 0, call `deleteHead()`.
  2. Traverse with two pointers: `prev` and `curr`.
  3. Locate the node to be removed (`curr`).
  4. Link `prev.next` directly to `curr.next`, bypassing the deleted node.
  5. Update `size` and current track pointers accordingly.

```text
Before Deletion:
 [Song A] ───.next───> [Song B (Target)] ───.next───> [Song C]

After Deletion (Bypassing Song B):
 [Song A] ────────────────────.next──────────────────> [Song C]
```

```javascript
deleteAtPosition(index) {
    if (!this.head || index < 0 || index >= this.size) return false;
    if (index === 0) return this.deleteHead();

    let prev = null;
    let curr = this.head;
    for (let i = 0; i < index; i++) {
        prev = curr;
        curr = curr.next;
    }

    // Bypass current node
    prev.next = curr.next;

    if (this.currentTrack === curr) {
        this.currentTrack = curr.next || this.head;
    }
    this.size--;
    return true;
}
```

---

### 3.3 TRAVERSAL & PLAYBACK OPERATIONS

#### A. Sequential Playback ("Play Next Song")
- **Purpose:** When the current song finishes or the user clicks "Next Song ➔", the media player moves to the next track.
- **How it works:**
  1. Read the pointer of the currently active song: `this.currentTrack.next`.
  2. If a next node exists, update `this.currentTrack = this.currentTrack.next`.
  3. If `.next === null`, playback stops because the end of the playlist is reached.

```javascript
playNext() {
    if (this.currentTrack && this.currentTrack.next) {
        this.currentTrack = this.currentTrack.next;
        return true;
    }
    return false; // Reached end of playlist (NULL)
}
```

---

#### B. Display / UI Rendering Traversal
- **Purpose:** Iterates through all nodes starting from `head` to generate visual song cards on the webpage.
- **How it works:**
  1. Start a traversal pointer `curr = this.head`.
  2. Loop while `curr !== null`.
  3. For each node, render its card, song title, artist, and a connector arrow (`── .next ──>`).
  4. Advance `curr = curr.next`.
  5. At the end, render the terminating `[NULL]` indicator.

```javascript
toArray() {
    const list = [];
    let curr = this.head;
    while (curr !== null) {
        list.push(curr);
        curr = curr.next; // Advance to next node
    }
    return list;
}
```

---

#### C. Searching a Song
- **Purpose:** Finds a song by title or artist entered in the search bar.
- **How it works:**
  1. Traverse node-by-node starting from `head`.
  2. Compare each node's `title` and `artist` with the search query.
  3. If a match is found, highlight that card on screen.

```javascript
search(query) {
    let curr = this.head;
    let index = 0;
    while (curr !== null) {
        if (curr.title.toLowerCase().includes(query.toLowerCase())) {
            return { node: curr, index: index };
        }
        curr = curr.next;
        index++;
    }
    return null; // Not found
}
```

---

### 3.4 IN-PLACE PLAYLIST REVERSAL

- **Purpose:** Inverts the entire playlist order so the last song becomes the first song.
- **How it works:**
  1. Three pointers are initialized: `prev = null`, `curr = this.head`, and `next = null`.
  2. At each step, save `next = curr.next`.
  3. Reverse the pointer direction: `curr.next = prev`.
  4. Advance `prev = curr` and `curr = next`.
  5. When `curr` reaches `null`, update `this.head = prev`.

```text
Initial:   [Song 1] ──> [Song 2] ──> [Song 3] ──> NULL
Reversed:  [Song 3] ──> [Song 2] ──> [Song 1] ──> NULL
```

```javascript
reverse() {
    let prev = null;
    let curr = this.head;
    let next = null;

    while (curr !== null) {
        next = curr.next;   // 1. Remember next node
        curr.next = prev;   // 2. Reverse pointer direction
        prev = curr;        // 3. Move prev forward
        curr = next;        // 4. Move curr forward
    }
    this.head = prev;       // 5. New head is the last node
}
```

---

### 3.5 REPEAT MODE / LOOP DETECTION

- **Purpose:** When repeat mode is switched on, the last song connects back to the first song (`tail.next = head`).
- **How it works:**
  - In linear mode: The last node points to `null`.
  - In loop mode: The last node's pointer wraps around to `head`.
  - The project implements **Floyd's Cycle-Finding Algorithm (Tortoise and Hare)**:
    - `slow` pointer advances 1 node at a time.
    - `fast` pointer advances 2 nodes at a time.
    - If `slow === fast`, a loop is detected, and the UI displays a special cycle badge instead of an infinite browser freeze.

---

## 4. USER INTERFACE & VISUAL DEMONSTRATION

The project provides two complementary web interfaces:

1. **🌱 Simple Demo View (`simple.html`):**
   - Designed for easy demonstration and viva evaluation.
   - Displays each song as a distinct visual card showing `Song Name`, `Artist`, and `Duration`.
   - Clear connector arrows (`── .next ──>`) visually connect each node to the next.
   - Shows the `[NULL]` terminator card at the end of the chain.
   - Prominent badges indicate which node is `HEAD` and which node is `PLAYING`.
   - Includes 1-click test presets (*Pop Hits*, *Rock Classics*, *Coding Chill*).

2. **⚡ Studio View (`index.html`):**
   - Full audio player simulator with animated sound waves.
   - Comprehensive controls for position-based insertion, deletions, and search.

---

## 5. CONCLUSION

This project successfully implements and visualizes a **Singly Linked List** in a practical, real-world context. By mapping nodes to songs and pointers to sequential playback, it clearly explains the fundamental mechanics of node creation, dynamic pointer manipulation, linear traversal, insertion, and deletion.
