/**
 * DSA Mini Project - Music Playlist Manager
 * Singly Linked List Implementation in Vanilla JavaScript
 * Mirrors the exact Java logic and console output from the project code.
 */

// ============================================================================
// 1. Core Data Structures (Mirrors Java Classes)
// ============================================================================

class SongNode {
  constructor(title, artist, duration) {
    this.title = title;
    this.artist = artist;
    this.duration = Number(duration);
    this.next = null;
    // Simulated memory address for visual demonstration (e.g., 0x4A2F)
    this.memoryAddress = "0x" + Math.floor(0x1000 + Math.random() * 0xEFFF).toString(16).toUpperCase();
  }

  toString() {
    return `"${this.title}" by ${this.artist} (${this.duration} mins)`;
  }
}

class Playlist {
  constructor() {
    this.head = null;
    this.currentSong = null;
    this.size = 0;
  }

  // Method 1: addSong
  addSong(title, artist, duration) {
    const newSong = new SongNode(title, artist, duration);
    if (this.head === null) {
      this.head = this.currentSong = newSong;
    } else {
      let temp = this.head;
      while (temp.next !== null) {
        temp = temp.next;
      }
      temp.next = newSong;
    }
    this.size++;
    logToTerminal(`-> Added: ${newSong.toString()}`, 'output-success');
    return newSong;
  }

  // Method 2: removeSong
  removeSong(title) {
    if (this.head === null) {
      logToTerminal(`-> Playlist is empty. Nothing to remove.`, 'output-warn');
      return false;
    }

    // Removing head node
    if (this.head.title.toLowerCase() === title.toLowerCase()) {
      if (this.currentSong === this.head) {
        this.currentSong = this.head.next;
      }
      const removedTitle = this.head.title;
      this.head = this.head.next;
      this.size--;
      logToTerminal(`-> Removed song: "${removedTitle}"`, 'output-info');
      return true;
    }

    // Traverse to find predecessor node
    let temp = this.head;
    while (temp.next !== null && temp.next.title.toLowerCase() !== title.toLowerCase()) {
      temp = temp.next;
    }

    if (temp.next !== null) {
      const removedTitle = temp.next.title;
      if (this.currentSong === temp.next) {
        this.currentSong = (temp.next.next !== null) ? temp.next.next : this.head;
      }
      temp.next = temp.next.next;
      this.size--;
      logToTerminal(`-> Removed song: "${removedTitle}"`, 'output-info');
      return true;
    } else {
      logToTerminal(`-> Song titled "${title}" not found in the playlist.`, 'output-error');
      return false;
    }
  }

  // Method 3: displayPlaylist
  displayPlaylist() {
    if (this.head === null) {
      logToTerminal(`-> Playlist is empty.`, 'output-warn');
      return;
    }

    logToTerminal(`\n--- Current Playlist (${this.size} songs) ---`, 'output-info');
    let temp = this.head;
    let index = 1;
    while (temp !== null) {
      const marker = (temp === this.currentSong) ? " [Currently Playing]" : "";
      logToTerminal(`${index++}. ${temp.toString()}${marker}`, temp === this.currentSong ? 'output-success' : 'output-muted');
      temp = temp.next;
    }
    logToTerminal(`--------------------------------`, 'output-info');
  }

  // Method 4: playCurrent
  playCurrent() {
    if (this.currentSong === null) {
      logToTerminal(`-> Playlist is empty. No song to play.`, 'output-warn');
    } else {
      logToTerminal(`-> Now Playing: ${this.currentSong.toString()}`, 'output-success');
    }
  }

  // Method 5: playNext
  playNext() {
    if (this.currentSong === null) {
      logToTerminal(`-> Playlist is empty.`, 'output-warn');
      return;
    }
    if (this.currentSong.next !== null) {
      this.currentSong = this.currentSong.next;
      logToTerminal(`-> Played Next: ${this.currentSong.toString()}`, 'output-success');
    } else {
      logToTerminal(`-> Reached the end of the playlist. Loop back to start.`, 'output-warn');
      this.currentSong = this.head;
      if (this.currentSong !== null) {
        logToTerminal(`-> Now Playing: ${this.currentSong.toString()}`, 'output-success');
      }
    }
  }

  // Method 6: searchSong
  searchSong(title) {
    if (this.head === null) {
      logToTerminal(`-> Playlist is empty.`, 'output-warn');
      return -1;
    }

    let temp = this.head;
    let position = 1;
    while (temp !== null) {
      if (temp.title.toLowerCase() === title.toLowerCase()) {
        logToTerminal(`-> Found: ${temp.toString()} at position ${position}`, 'output-success');
        return { node: temp, position };
      }
      temp = temp.next;
      position++;
    }
    logToTerminal(`-> Song titled "${title}" not found.`, 'output-error');
    return null;
  }
}

// ============================================================================
// 2. Global State & Visualizer Setup
// ============================================================================

const playlist = new Playlist();

// Terminal Logger
function logToTerminal(message, className = '') {
  const terminal = document.getElementById('terminalOutput');
  if (!terminal) return;

  const lines = message.split('\n');
  lines.forEach(line => {
    if (line.trim() === '') {
      const br = document.createElement('div');
      br.style.height = '8px';
      terminal.appendChild(br);
      return;
    }
    const div = document.createElement('div');
    div.className = `terminal-line ${className}`;
    div.textContent = line;
    terminal.appendChild(div);
  });

  terminal.scrollTop = terminal.scrollHeight;
}

// Render Linked List Canvas
function renderLinkedList(highlightNode = null) {
  const track = document.getElementById('linkedListTrack');
  const sizeBadge = document.getElementById('playlistSizeBadge');
  if (!track) return;

  track.innerHTML = '';
  sizeBadge.textContent = `Size: ${playlist.size} ${playlist.size === 1 ? 'Song' : 'Songs'}`;

  updateNowPlayingBanner();

  if (playlist.head === null) {
    track.innerHTML = `
      <div class="empty-playlist-msg">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        <p style="font-size: 1.1rem; font-weight: 700; color: #cbd5e1; margin-bottom: 4px;">Playlist is Empty (head == null)</p>
        <p style="font-size: 0.85rem; color: #64748b;">Use the "Add Song" form below to instantiate new SongNode objects.</p>
      </div>
    `;
    return;
  }

  let temp = playlist.head;
  let index = 1;

  while (temp !== null) {
    const isHead = (temp === playlist.head);
    const isCurrent = (temp === playlist.currentSong);
    const isHighlighted = (highlightNode && temp === highlightNode);

    const nextAddr = temp.next ? temp.next.memoryAddress : 'null';

    // Wrapper for Node + Connector
    const nodeWrapper = document.createElement('div');
    nodeWrapper.className = 'song-node-wrapper';

    // Pointer badges (HEAD, CURRENT)
    let pointerBadges = '';
    if (isHead) {
      pointerBadges += `<span class="pointer-badge badge-head-ptr">&bull; HEAD</span>`;
    }
    if (isCurrent) {
      pointerBadges += `<span class="pointer-badge badge-current-ptr">&#9658; CURRENT</span>`;
    }

    const nodeHTML = `
      <div class="song-node ${isCurrent ? 'is-current' : ''} ${isHead ? 'is-head' : ''} ${isHighlighted ? 'is-highlighted' : ''}" id="node-${index}">
        <div class="node-pointer-tags">
          ${pointerBadges}
        </div>
        
        <div class="node-header">
          <span class="node-index">Node #${index}</span>
          <span class="node-memory-addr">mem: ${temp.memoryAddress}</span>
        </div>

        <div class="node-body">
          <div class="node-title" title="${temp.title}">${temp.title}</div>
          <div class="node-artist">
            <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            <span>${temp.artist}</span>
          </div>
          <div class="node-meta">
            <span>Duration</span>
            <span class="node-duration">${temp.duration} mins</span>
          </div>
        </div>

        <div class="node-footer">
          <span class="ptr-label">SongNode next:</span>
          <span class="ptr-value">${nextAddr}</span>
        </div>
      </div>

      <!-- Connector Arrow -->
      <div class="node-connector">
        <div class="connector-line"></div>
        <span class="connector-label">.next</span>
      </div>
    `;

    nodeWrapper.innerHTML = nodeHTML;
    track.appendChild(nodeWrapper);

    temp = temp.next;
    index++;
  }

  // NULL Termination Box
  const nullBox = document.createElement('div');
  nullBox.className = 'null-node';
  nullBox.innerHTML = `
    <div>NULL</div>
    <span>(End of List)</span>
  `;
  track.appendChild(nullBox);
}

// Update the Top "Now Playing" Banner
function updateNowPlayingBanner() {
  const bannerTitle = document.getElementById('bannerTitle');
  const bannerArtistDuration = document.getElementById('bannerArtistDuration');
  const bannerPointerInfo = document.getElementById('bannerPointerInfo');
  const audioWaves = document.getElementById('audioWaves');

  if (!playlist.currentSong) {
    bannerTitle.textContent = "No Song Playing";
    bannerArtistDuration.textContent = "Playlist is currently empty";
    bannerPointerInfo.innerHTML = `<span>currentSong:</span> <code>null</code>`;
    if (audioWaves) audioWaves.style.opacity = '0.2';
    return;
  }

  if (audioWaves) audioWaves.style.opacity = '1';
  const curr = playlist.currentSong;
  bannerTitle.textContent = `"${curr.title}"`;
  bannerArtistDuration.textContent = `by ${curr.artist} • ${curr.duration} mins`;
  const nextAddr = curr.next ? curr.next.memoryAddress : 'null (end)';
  bannerPointerInfo.innerHTML = `
    <span>Pointer:</span> <code>${curr.memoryAddress}</code> &rarr; 
    <span>Next:</span> <code>${nextAddr}</code>
  `;
}

// ============================================================================
// 3. User Interaction & Event Handlers
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {

  // Initialize Default Playlist Data
  playlist.addSong("Blinding Lights", "The Weeknd", 3.33);
  playlist.addSong("Shape of You", "Ed Sheeran", 3.89);
  playlist.addSong("Levitating", "Dua Lipa", 3.38);
  playlist.addSong("Stay", "The Kid LAROI & Justin Bieber", 2.35);

  logToTerminal("====================================", "output-info");
  logToTerminal("    MUSIC PLAYLIST MANAGER          ", "output-info");
  logToTerminal("    Java Singly Linked List Demo    ", "output-info");
  logToTerminal("====================================", "output-info");
  logToTerminal("-> Loaded 4 initial sample songs into playlist.", "output-muted");

  renderLinkedList();

  // --------------------------------------------------------------------------
  // Operations Tab Switching
  // --------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.op-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.op-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add('active');
    });
  });

  // --------------------------------------------------------------------------
  // 1. Add Song Form Handler
  // --------------------------------------------------------------------------
  const formAddSong = document.getElementById('formAddSong');
  formAddSong.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('inputSongTitle');
    const artistInput = document.getElementById('inputSongArtist');
    const durationInput = document.getElementById('inputSongDuration');

    const title = titleInput.value.trim();
    const artist = artistInput.value.trim();
    const duration = parseFloat(durationInput.value);

    if (!title || !artist || isNaN(duration) || duration <= 0) {
      alert("Please provide valid title, artist, and positive duration.");
      return;
    }

    const newSong = playlist.addSong(title, artist, duration);
    renderLinkedList(newSong);

    // Scroll to right of track to show newly appended node
    const track = document.getElementById('linkedListTrack');
    if (track) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });

    // Reset inputs
    titleInput.value = '';
    artistInput.value = '';
    durationInput.value = '';
    titleInput.focus();
  });

  // --------------------------------------------------------------------------
  // 2. Remove Song Form Handler
  // --------------------------------------------------------------------------
  const formRemoveSong = document.getElementById('formRemoveSong');
  formRemoveSong.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('inputRemoveTitle');
    const title = titleInput.value.trim();

    if (!title) return;

    playlist.removeSong(title);
    renderLinkedList();
    titleInput.value = '';
  });

  // --------------------------------------------------------------------------
  // 6. Search Song Form Handler
  // --------------------------------------------------------------------------
  const formSearchSong = document.getElementById('formSearchSong');
  formSearchSong.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('inputSearchTitle');
    const title = titleInput.value.trim();

    if (!title) return;

    const result = playlist.searchSong(title);
    if (result && result.node) {
      renderLinkedList(result.node);
      // Animate/highlight the found node
      const nodeEl = document.querySelector('.song-node.is-highlighted');
      if (nodeEl) {
        nodeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    } else {
      renderLinkedList();
    }
  });

  // --------------------------------------------------------------------------
  // Playback & Traversal Buttons
  // --------------------------------------------------------------------------
  const btnPlayCurrent = document.getElementById('btnPlayCurrent');
  const btnActionPlayCurrent = document.getElementById('btnActionPlayCurrent');
  const handlePlayCurrent = () => {
    playlist.playCurrent();
    renderLinkedList();
  };
  btnPlayCurrent.addEventListener('click', handlePlayCurrent);
  btnActionPlayCurrent.addEventListener('click', handlePlayCurrent);

  const btnPlayNext = document.getElementById('btnPlayNext');
  const btnActionPlayNext = document.getElementById('btnActionPlayNext');
  const handlePlayNext = () => {
    playlist.playNext();
    renderLinkedList();
  };
  btnPlayNext.addEventListener('click', handlePlayNext);
  btnActionPlayNext.addEventListener('click', handlePlayNext);

  // 3. Display Playlist button
  const btnActionDisplay = document.getElementById('btnActionDisplay');
  btnActionDisplay.addEventListener('click', () => {
    playlist.displayPlaylist();
  });

  // Reset Demo button
  const btnActionReset = document.getElementById('btnActionReset');
  btnActionReset.addEventListener('click', () => {
    // Reinitialize playlist
    playlist.head = null;
    playlist.currentSong = null;
    playlist.size = 0;
    
    playlist.addSong("Blinding Lights", "The Weeknd", 3.33);
    playlist.addSong("Shape of You", "Ed Sheeran", 3.89);
    playlist.addSong("Levitating", "Dua Lipa", 3.38);
    playlist.addSong("Stay", "The Kid LAROI & Justin Bieber", 2.35);

    logToTerminal("\n-> Reset playlist to default 4 songs.", "output-warn");
    renderLinkedList();
  });

  // Clear Terminal button
  const btnClearTerminal = document.getElementById('btnClearTerminal');
  btnClearTerminal.addEventListener('click', () => {
    const terminal = document.getElementById('terminalOutput');
    terminal.innerHTML = '<div class="terminal-line output-muted">// Terminal cleared</div>';
  });

  // --------------------------------------------------------------------------
  // Java Source Code Collapsible Accordion
  // --------------------------------------------------------------------------
  const codeToggle = document.getElementById('codeAccordionToggle');
  const codeContent = document.getElementById('codeAccordionContent');
  const codeToggleText = document.getElementById('codeToggleText');

  codeToggle.addEventListener('click', () => {
    const isHidden = (codeContent.style.display === 'none' || codeContent.style.display === '');
    if (isHidden) {
      codeContent.style.display = 'block';
      codeToggleText.innerHTML = 'Click to Collapse &#9652;';
    } else {
      codeContent.style.display = 'none';
      codeToggleText.innerHTML = 'Click to Expand &#9662;';
    }
  });

});
