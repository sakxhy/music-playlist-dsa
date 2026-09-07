/**
 * Music Playlist Manager - Simple Beginner Demo
 * Singly Linked List Implementation in Plain JavaScript
 */

class SongNode {
  constructor(title, artist, duration = "3.5") {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
    this.next = null;
  }
}

class SimplePlaylist {
  constructor() {
    this.head = null;
    this.currentSong = null;
    this.size = 0;
    this.isPlaying = true;
  }

  // 1. Add Song to the end of the Linked List
  addSong(title, artist, duration = "3.5") {
    const newSong = new SongNode(title, artist, duration);
    if (this.head === null) {
      // First node becomes both HEAD and CURRENT
      this.head = this.currentSong = newSong;
    } else {
      // Traverse to the end (where temp.next === null) and link newSong
      let temp = this.head;
      while (temp.next !== null) {
        temp = temp.next;
      }
      temp.next = newSong;
    }
    this.size++;
    return newSong;
  }

  // 2. Remove Song by Title
  removeSong(title) {
    if (this.head === null) return false;

    // If removing the HEAD node
    if (this.head.title.toLowerCase() === title.toLowerCase()) {
      if (this.currentSong === this.head) {
        this.currentSong = this.head.next;
      }
      this.head = this.head.next;
      this.size--;
      return true;
    }

    // Traverse to find the song's predecessor
    let temp = this.head;
    while (temp.next !== null && temp.next.title.toLowerCase() !== title.toLowerCase()) {
      temp = temp.next;
    }

    if (temp.next !== null) {
      if (this.currentSong === temp.next) {
        this.currentSong = temp.next.next !== null ? temp.next.next : this.head;
      }
      // Relink pointer to bypass the deleted node
      temp.next = temp.next.next;
      this.size--;
      return true;
    }

    return false;
  }

  // 3. Advance to Next Song
  playNext() {
    if (this.currentSong === null) return { status: 'empty' };

    if (this.currentSong.next !== null) {
      this.currentSong = this.currentSong.next;
      this.isPlaying = true;
      return { status: 'advanced', song: this.currentSong };
    } else {
      // Reached the end (null) -> Loop back to head!
      this.currentSong = this.head;
      this.isPlaying = true;
      return { status: 'looped', song: this.currentSong };
    }
  }

  // 4. Reset playback to Head
  resetToHead() {
    if (this.head === null) return;
    this.currentSong = this.head;
    this.isPlaying = true;
  }

  // 5. Search for Song
  searchSong(title) {
    let temp = this.head;
    let index = 1;
    while (temp !== null) {
      if (temp.title.toLowerCase().includes(title.toLowerCase())) {
        return { song: temp, index };
      }
      temp = temp.next;
      index++;
    }
    return null;
  }
}

// Global Playlist Instance
const playlist = new SimplePlaylist();

// Toast notification helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : type === 'warn' ? '🔄' : 'ℹ️'}</span>
    <div>${message}</div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Render the visual linked list
function renderVisualizer(highlightSong = null) {
  const track = document.getElementById('chainTrack');
  const sizeBadge = document.getElementById('playlistSizeBadge');
  const emptyNotice = document.getElementById('emptyNotice');
  const actionNotice = document.getElementById('actionNotice');

  if (!track) return;

  track.innerHTML = '';
  sizeBadge.textContent = `${playlist.size} ${playlist.size === 1 ? 'Song' : 'Songs'}`;

  // Update Now Playing banner
  updatePlayerBanner();

  if (playlist.head === null) {
    if (emptyNotice) emptyNotice.style.display = 'block';
    if (actionNotice) actionNotice.style.display = 'none';
    track.innerHTML = `
      <div style="padding: 30px; text-align: center; color: var(--text-muted); width: 100%;">
        <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">Playlist is Empty (HEAD == NULL)</p>
        <p style="font-size: 0.85rem;">Click any preset song below to start chaining nodes!</p>
      </div>
    `;
    return;
  }

  if (emptyNotice) emptyNotice.style.display = 'none';
  if (actionNotice) actionNotice.style.display = 'flex';

  let temp = playlist.head;
  let index = 1;

  while (temp !== null) {
    const isHead = temp === playlist.head;
    const isCurrent = temp === playlist.currentSong;
    const isHighlighted = highlightSong && temp === highlightSong;

    const group = document.createElement('div');
    group.className = 'chain-node-group';

    // Build Badges
    let badgesHTML = '';
    if (isHead) {
      badgesHTML += `<span class="card-badge badge-head">★ HEAD</span>`;
    }
    if (isCurrent) {
      badgesHTML += `<span class="card-badge badge-current">▶ PLAYING</span>`;
    }

    // Node Card
    const card = document.createElement('div');
    card.className = `simple-song-card ${isHead ? 'is-head' : ''} ${isCurrent ? 'is-current' : ''} ${isHighlighted ? 'is-highlighted' : ''}`;
    card.id = `song-node-${index}`;

    card.innerHTML = `
      <span class="card-number">Node #${index}</span>
      <div class="card-badges">${badgesHTML}</div>
      <div class="card-title" title="${temp.title}">${temp.title}</div>
      <div class="card-artist" title="${temp.artist}">${temp.artist}</div>
      <div class="card-footer">
        <span class="card-duration">⏱ ${temp.duration} mins</span>
        <button class="card-delete-btn" data-title="${temp.title}" title="Remove this node from list">
          🗑️ Delete
        </button>
      </div>
    `;

    group.appendChild(card);

    // Connector Arrow
    const arrow = document.createElement('div');
    arrow.className = 'chain-arrow';
    arrow.innerHTML = `
      <span class="arrow-label">.next</span>
      <div class="arrow-svg">
        <svg viewBox="0 0 44 20">
          <line x1="2" y1="10" x2="38" y2="10" />
          <polyline points="32,4 38,10 32,16" />
        </svg>
      </div>
    `;
    group.appendChild(arrow);

    track.appendChild(group);

    temp = temp.next;
    index++;
  }

  // End of List NULL terminal
  const nullBox = document.createElement('div');
  nullBox.className = 'null-box';
  nullBox.innerHTML = `
    <div>NULL</div>
    <span>(End of Chain)</span>
  `;
  track.appendChild(nullBox);

  // Attach delete events
  document.querySelectorAll('.card-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const songTitle = btn.getAttribute('data-title');
      playlist.removeSong(songTitle);
      showToast(`Removed "${songTitle}" (Pointers updated & bypassed)`, 'warn');
      renderVisualizer();
    });
  });
}

// Update the Top Player Card
function updatePlayerBanner() {
  const songTitleEl = document.getElementById('playerSongTitle');
  const songArtistEl = document.getElementById('playerSongArtist');
  const pointerExplEl = document.getElementById('pointerExplanation');
  const discWrapper = document.getElementById('discWrapper');
  const btnPlayToggle = document.getElementById('btnPlayToggle');

  if (!playlist.currentSong) {
    songTitleEl.textContent = "No Song Playing";
    songArtistEl.textContent = "Add songs to start playback";
    pointerExplEl.innerHTML = `<span>Pointer Status:</span> <strong>HEAD == NULL</strong>`;
    if (discWrapper) discWrapper.classList.remove('is-playing');
    if (btnPlayToggle) btnPlayToggle.innerHTML = `<span>▶</span> Play`;
    return;
  }

  const curr = playlist.currentSong;
  songTitleEl.textContent = curr.title;
  songArtistEl.textContent = `by ${curr.artist} • ${curr.duration} mins`;

  // Find index of current song
  let temp = playlist.head;
  let currIndex = 1;
  while (temp && temp !== curr) {
    temp = temp.next;
    currIndex++;
  }

  const nextSong = curr.next;
  if (nextSong) {
    pointerExplEl.innerHTML = `<span>Pointer:</span> <strong>Node #${currIndex}</strong> &rarr; <span>Next in memory:</span> <strong>"${nextSong.title}"</strong>`;
  } else {
    pointerExplEl.innerHTML = `<span>Pointer:</span> <strong>Node #${currIndex} (Tail)</strong> &rarr; <span>Next:</span> <strong>NULL (End of list)</strong>`;
  }

  if (discWrapper) {
    if (playlist.isPlaying) {
      discWrapper.classList.add('is-playing');
      if (btnPlayToggle) btnPlayToggle.innerHTML = `<span>⏸</span> Pause`;
    } else {
      discWrapper.classList.remove('is-playing');
      if (btnPlayToggle) btnPlayToggle.innerHTML = `<span>▶</span> Play`;
    }
  }
}

// Setup Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // 1. Preload 3 simple popular songs
  playlist.addSong("Blinding Lights", "The Weeknd", "3.33");
  playlist.addSong("Shape of You", "Ed Sheeran", "3.89");
  playlist.addSong("Levitating", "Dua Lipa", "3.38");

  renderVisualizer();

  // 2. Play / Pause Button
  const btnPlayToggle = document.getElementById('btnPlayToggle');
  if (btnPlayToggle) {
    btnPlayToggle.addEventListener('click', () => {
      if (!playlist.currentSong) return;
      playlist.isPlaying = !playlist.isPlaying;
      updatePlayerBanner();
      showToast(playlist.isPlaying ? `Playing "${playlist.currentSong.title}"` : `Paused playback`, 'info');
    });
  }

  // 3. Next Song Button
  const btnNext = document.getElementById('btnNext');
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const res = playlist.playNext();
      if (res.status === 'advanced') {
        showToast(`Next Song &rarr; "${res.song.title}" (moved via current.next)`, 'success');
      } else if (res.status === 'looped') {
        showToast(`Reached NULL terminal! Looped back to HEAD ("${res.song.title}")`, 'warn');
      }
      renderVisualizer();

      // Smooth scroll to current song node
      const currentEl = document.querySelector('.simple-song-card.is-current');
      if (currentEl) {
        currentEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });
  }

  // 4. Restart / Jump to Head Button
  const btnRestart = document.getElementById('btnRestart');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      playlist.resetToHead();
      showToast(`Playback pointer reset to HEAD`, 'info');
      renderVisualizer();
    });
  }

  // 5. Add Song Form
  const addForm = document.getElementById('simpleAddForm');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = document.getElementById('newSongTitle');
      const artistInput = document.getElementById('newSongArtist');

      const title = titleInput.value.trim();
      const artist = artistInput.value.trim() || 'Unknown Artist';

      if (!title) return;

      const newSong = playlist.addSong(title, artist, "3.4");
      titleInput.value = '';
      artistInput.value = '';

      showToast(`Added "${newSong.title}" to the end of playlist!`, 'success');
      renderVisualizer(newSong);

      // Scroll to end of chain
      const track = document.getElementById('chainTrack');
      if (track) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    });
  }

  // 6. Quick Presets
  document.querySelectorAll('.btn-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const artist = btn.getAttribute('data-artist');
      const newSong = playlist.addSong(title, artist, "3.2");
      showToast(`Added preset "${title}" to list!`, 'success');
      renderVisualizer(newSong);

      const track = document.getElementById('chainTrack');
      if (track) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    });
  });

  // 7. Search Form
  const searchForm = document.getElementById('simpleSearchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = document.getElementById('searchQuery').value.trim();
      if (!query) return;

      const result = playlist.searchSong(query);
      if (result) {
        renderVisualizer(result.song);
        showToast(`Found "${result.song.title}" at Node #${result.index}!`, 'success');

        const cardEl = document.getElementById(`song-node-${result.index}`);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      } else {
        showToast(`No song found matching "${query}"`, 'warn');
        renderVisualizer();
      }
    });
  }
});
