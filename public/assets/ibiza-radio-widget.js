/* Lazyapp centralized Ibiza Radio widget. Visual design lives in styles.css. */
(() => {
  if (window.__lazyappIbizaRadioLoaded) return;
  window.__lazyappIbizaRadioLoaded = true;
  if (window.top !== window.self) return;

  const CONFIG = {
    inactivityDelay: 5000,
    autoPictureInPicture: false,
    soundeoUrl: 'https://soundeo.com/',
    position: 'bottom-right',
    radio: {
      name: 'Ibiza Global Radio',
      streamUrl: 'https://listenssl.ibizaglobalradio.com:8024/ibizaglobalradio.mp3',
      fallbackStreams: ['https://listenssl.ibizaglobalradio.com:8024/ibizaglobalradio.mp3'],
      officialUrl: 'https://www.ibizaglobalradio.com/player-popup.html',
      logoUrl: 'https://www.ibizaglobalradio.com/dist/img/favicon/apple-touch-icon.png',
      metadataUrl: 'https://www.ibizaglobalradio.com/data/data.json',
    },
    ...window.LAZYAPP_IBIZA_RADIO_CONFIG,
  };

  const icons = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14"></path><path d="M16 5v14"></path></svg>',
    muted: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"></path><path d="m19 9-6 6"></path><path d="m13 9 6 6"></path></svg>',
    volume: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M18 6a8 8 0 0 1 0 12"></path></svg>',
    eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
    eyeOff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 3 18 18"></path><path d="M10.6 10.6a3 3 0 0 0 3.8 3.8"></path><path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a18.7 18.7 0 0 1-2.5 3.2"></path><path d="M6.4 6.5C3.6 8.4 2 12 2 12s3.5 7 10 7a10.8 10.8 0 0 0 4.1-.8"></path></svg>',
    pip: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><rect x="12" y="12" width="7" height="5" rx="1"></rect></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="10" height="10" rx="2"></rect><path d="M5 15V7a2 2 0 0 1 2-2h8"></path></svg>',
    history: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h10"></path><path d="M17 17l2 2 3-4"></path></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3.09 6.26 6.91 1-5 4.88 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.26l6.91-1L12 2z"></path></svg>',
  };

  const fallbackLogo = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" rx="28" fill="#111"/><circle cx="60" cy="60" r="31" fill="none" stroke="white" stroke-width="8"/><path d="M42 60h36M60 42v36" stroke="white" stroke-width="8" stroke-linecap="round"/></svg>');
  const radio = CONFIG.radio;

  const root = document.createElement('div');
  root.id = 'premiumRadioWidget';
  root.className = 'radio-widget is-muted';
  root.dataset.position = CONFIG.position;
  root.innerHTML = [
    '<div class="radio-onboarding" data-radio-onboarding>Activez la radio pour garder les titres qui vous plaisent.</div>',
    '<button class="radio-mute" type="button" aria-label="Activer Ibiza Global Radio"><span>MUTE</span></button>',
    '<section class="radio-shell" aria-label="Lecteur radio flottant">',
      '<button class="radio-logo" type="button" data-favorite-current title="Favori du titre en cours" aria-label="Ajouter le titre en cours aux favoris"></button>',
      '<div class="radio-head">',
        '<div class="radio-brand"><div class="radio-name-wrap"><div class="radio-kicker"><span class="radio-live-dot"></span><span data-live>LIVE</span></div><div class="radio-name"><span data-radio-name>' + escapeHtml(radio.name) + '</span></div></div></div>',
        '<div class="radio-track"><div class="radio-track-title"><span data-track-title>En direct</span></div><div class="radio-artist" data-artist>Ibiza Global Radio</div><div class="radio-status"><strong data-status>En attente</strong><span data-detail>Aucun son sans clic utilisateur.</span></div></div>',
      '</div>',
      '<div class="radio-compact-actions">',
        '<button class="radio-action radio-play" type="button" data-play aria-label="Lecture ou pause">' + icons.play + '</button>',
        '<button class="radio-action" type="button" data-volume title="Couper le son" aria-label="Activer ou desactiver le son">' + icons.volume + '</button>',
        '<button class="radio-action" type="button" data-history title="Derniers titres" aria-label="Afficher les derniers titres">' + icons.history + '</button>',
        '<button class="radio-action" type="button" data-copy-title title="Copier le titre" aria-label="Copier le titre en cours">' + icons.copy + '</button>',
        '<button class="radio-action" type="button" data-eye title="Masquer" aria-label="Masquer le lecteur">' + icons.eye + '</button>',
        '<button class="radio-action" type="button" data-pip title="Picture-in-Picture" aria-label="Activer Picture-in-Picture">' + icons.pip + '</button>',
        '<div class="radio-meter" aria-hidden="true"><span></span><span></span><span></span><span></span></div>',
      '</div>',
      '<div class="radio-history-popover" data-history-popover><div class="radio-history-head"><span>Derniers titres</span><div class="radio-history-head-actions"><button class="radio-history-export" type="button" data-copy-favorites title="Copier tous les favoris" aria-label="Copier tous les favoris">' + icons.copy + '<span>Favoris</span></button><span data-history-count>0</span></div></div><ul class="radio-history-list" data-history-list><li><div><div class="radio-history-title">Historique indisponible</div><div class="radio-history-artist">En attente des donnees radio</div></div></li></ul></div>',
      '<div class="radio-orbit" aria-label="Lecteur radio reduit">',
        '<button class="radio-orbit-logo" type="button" data-favorite-current title="Favori du titre en cours" aria-label="Ajouter le titre en cours aux favoris"></button>',
        '<button class="radio-orbit-dot is-volume" type="button" data-orbit-volume title="Volume" aria-label="Ouvrir le volume">' + icons.volume + '</button>',
        '<div class="radio-volume-popover" data-volume-popover><div class="radio-volume-visual" aria-hidden="true"><span class="radio-volume-fader"></span></div><input type="range" min="0" max="100" value="80" data-volume-range aria-label="Volume"></div>',
        '<button class="radio-orbit-dot is-eye" type="button" data-orbit-eye title="Afficher" aria-label="Afficher le lecteur">' + icons.eye + '</button>',
        '<button class="radio-orbit-dot is-play" type="button" data-orbit-play title="Lecture ou pause" aria-label="Lecture ou pause">' + icons.play + '</button>',
        '<button class="radio-orbit-dot is-copy" type="button" data-orbit-copy title="Copier le titre" aria-label="Copier le titre en cours">' + icons.copy + '</button>',
      '</div>',
    '</section>',
  ].join('');
  document.body.appendChild(root);

  const audio = new Audio();
  audio.preload = 'none';
  audio.volume = 0.8;

  let streamIndex = 0;
  let idleTimer = null;
  let metadataTimer = null;
  let copyFeedbackTimer = null;
  let favoriteExportTimer = null;
  let trackHistory = [];
  let favoriteTracks = loadFavorites();
  let favoriteKeys = favoriteTracks.map(trackKey).filter(Boolean);
  let isPlaying = false;
  let hasStarted = false;
  let pipVideo = null;
  let pipCanvas = null;
  let pipContext = null;

  const muteButton = root.querySelector('.radio-mute');
  const favoriteCurrentButtons = root.querySelectorAll('[data-favorite-current]');
  const playButton = root.querySelector('[data-play]');
  const volumeButton = root.querySelector('[data-volume]');
  const orbit = root.querySelector('.radio-orbit');
  const orbitPlayButton = root.querySelector('[data-orbit-play]');
  const orbitVolumeButton = root.querySelector('[data-orbit-volume]');
  const copyButton = root.querySelector('[data-copy-title]');
  const orbitCopyButton = root.querySelector('[data-orbit-copy]');
  const volumeRange = root.querySelector('[data-volume-range]');
  const pipButton = root.querySelector('[data-pip]');
  const historyButton = root.querySelector('[data-history]');
  const copyFavoritesButton = root.querySelector('[data-copy-favorites]');
  const historyList = root.querySelector('[data-history-list]');
  const historyCount = root.querySelector('[data-history-count]');
  const eyeButton = root.querySelector('[data-eye]');
  const orbitEyeButtons = root.querySelectorAll('[data-orbit-eye]');
  const trackTitle = root.querySelector('[data-track-title]');
  const artist = root.querySelector('[data-artist]');
  const status = root.querySelector('[data-status]');
  const detail = root.querySelector('[data-detail]');


  function setStatus(main, extra, error) {
    status.textContent = main;
    detail.textContent = extra || '';
    root.classList.toggle('is-error', Boolean(error));
  }

  function setIdleTimer() {
    window.clearTimeout(idleTimer);
    root.classList.remove('is-idle');
    if (!hasStarted || root.classList.contains('is-hidden')) return;
    idleTimer = window.setTimeout(() => root.classList.add('is-idle'), CONFIG.inactivityDelay);
  }

  function reveal() {
    root.classList.remove('is-hidden', 'is-idle', 'is-history-open');
    orbit.classList.remove('is-volume-open');
    eyeButton.innerHTML = icons.eye;
    eyeButton.setAttribute('aria-label', 'Masquer le lecteur');
    setIdleTimer();
  }

  function hidePanel() {
    root.classList.add('is-hidden');
    root.classList.remove('is-idle', 'is-history-open');
    eyeButton.innerHTML = icons.eyeOff;
    eyeButton.setAttribute('aria-label', 'Afficher le lecteur');
    window.clearTimeout(idleTimer);
  }

  function configureAudioSource() {
    const streams = [radio.streamUrl].concat(radio.fallbackStreams || []);
    audio.src = streams[streamIndex] || radio.streamUrl;
  }

  function setPlayingState(nextPlaying) {
    isPlaying = nextPlaying;
    root.classList.toggle('is-playing', isPlaying);
    playButton.innerHTML = isPlaying ? icons.pause : icons.play;
    orbitPlayButton.innerHTML = isPlaying ? icons.pause : icons.play;
    playButton.setAttribute('aria-label', isPlaying ? 'Mettre en pause' : 'Lancer la radio');
    orbitPlayButton.setAttribute('aria-label', isPlaying ? 'Mettre en pause' : 'Lancer la radio');
    setStatus(isPlaying ? 'Lecture en direct' : 'Pause', isPlaying ? 'Flux officiel Ibiza Global Radio.' : 'Le flux est pret.');
  }

  async function playRadio() {
    root.classList.remove('is-muted');
    hasStarted = true;
    reveal();
    configureAudioSource();
    setStatus('Connexion live', 'Ouverture du flux officiel Ibiza Global Radio.');
    fetchMetadata();
    try {
      await audio.play();
      if (CONFIG.autoPictureInPicture) requestPip(true);
      setPlayingState(true);
      updateMediaSession();
    } catch (error) {
      setPlayingState(false);
      setStatus('Lecture bloquee', 'Clique sur lecture pour relancer le flux.', true);
    }
  }

  function pauseRadio() {
    audio.pause();
    setPlayingState(false);
  }

  function togglePlay() {
    setIdleTimer();
    audio.paused ? playRadio() : pauseRadio();
  }

  function toggleVolume() {
    audio.muted = !audio.muted;
    renderVolume();
    setIdleTimer();
  }

  function setVolume(value) {
    const nextVolume = Math.max(0, Math.min(1, Number(value) / 100));
    audio.volume = nextVolume;
    audio.muted = nextVolume === 0;
    renderVolume();
  }

  function renderVolume() {
    orbit.style.setProperty('--volume-level', String(Math.round(audio.volume * 100)));
    volumeButton.innerHTML = audio.muted ? icons.muted : icons.volume;
    orbitVolumeButton.innerHTML = audio.muted ? icons.muted : icons.volume;
    volumeButton.setAttribute('aria-label', audio.muted ? 'Retablir le son' : 'Couper le son');
  }

  function toggleOrbitVolume() {
    orbit.classList.toggle('is-volume-open');
    setIdleTimer();
  }

  function showCopyFeedback(button) {
    window.clearTimeout(copyFeedbackTimer);
    [copyButton, orbitCopyButton, button].filter(Boolean).forEach((item) => item.classList.add('is-copied'));
    copyFeedbackTimer = window.setTimeout(() => {
      [copyButton, orbitCopyButton, button].filter(Boolean).forEach((item) => item.classList.remove('is-copied'));
    }, 2200);
  }

  function loadFavorites() {
    try {
      const saved = JSON.parse(localStorage.getItem('ibizaRadioFavoriteTracks') || '[]');
      if (!Array.isArray(saved)) return [];
      const entries = saved.map((item) => {
        if (typeof item === 'string') {
          const parts = item.split('|');
          return normalizeTrackEntry({ title: parts[0] || '', artist: parts.slice(1).join('|') || '' });
        }
        return normalizeTrackEntry(item);
      }).filter(Boolean);
      return entries.filter((entry, index, array) => {
        const key = trackKey(entry);
        return key && array.findIndex((item) => trackKey(item) === key) === index;
      });
    } catch (_) { return []; }
  }

  function saveFavorites() {
    try { localStorage.setItem('ibizaRadioFavoriteTracks', JSON.stringify(favoriteTracks.slice(0, 120))); } catch (_) {}
  }

  function syncFavoriteKeys() {
    favoriteKeys = favoriteTracks.map(trackKey).filter(Boolean);
  }

  function trackKey(entry) {
    return String(((entry && entry.title) || '') + '|' + ((entry && entry.artist) || '')).trim().toLowerCase();
  }

  function normalizeTrackEntry(entry) {
    if (!entry) return null;
    const title = String(entry.title || entry.name || entry.track || entry.song || '').trim();
    const artistName = String(entry.artist || entry.artist_name || entry.author || '').trim();
    if (!title || title === 'En direct') return null;
    return { title, artist: artistName };
  }

  function getCurrentTrackEntry() {
    return normalizeTrackEntry({ title: trackTitle.textContent, artist: artist.textContent });
  }

  function updateCurrentFavoriteState() {
    const current = getCurrentTrackEntry();
    const isFavorite = Boolean(current && favoriteKeys.includes(trackKey(current)));
    root.classList.toggle('is-current-favorite', isFavorite);
    favoriteCurrentButtons.forEach((button) => {
      button.setAttribute('aria-label', isFavorite ? 'Retirer le titre en cours des favoris' : 'Ajouter le titre en cours aux favoris');
      button.setAttribute('title', isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris');
    });
  }

  function toggleFavoriteEntry(entry) {
    const normalized = normalizeTrackEntry(entry);
    if (!normalized) return false;
    const key = trackKey(normalized);
    const existingIndex = favoriteKeys.indexOf(key);
    const nextFavorite = existingIndex === -1;
    if (nextFavorite) favoriteTracks.unshift(normalized);
    else favoriteTracks.splice(existingIndex, 1);
    favoriteTracks = favoriteTracks.filter((item, index, array) => {
      const itemKey = trackKey(item);
      return itemKey && array.findIndex((candidate) => trackKey(candidate) === itemKey) === index;
    });
    syncFavoriteKeys();
    saveFavorites();
    renderTrackHistory();
    updateCurrentFavoriteState();
    setStatus(nextFavorite ? 'Titre favori' : 'Favori retire', formatTrackValue(normalized));
    if (nextFavorite) openSoundeoForTrack(normalized);
    setIdleTimer();
    return nextFavorite;
  }

  function toggleCurrentFavorite() {
    const current = getCurrentTrackEntry();
    if (!current) {
      setStatus('Favori indisponible', 'Aucun titre precis a taguer pour le moment.', true);
      setIdleTimer();
      return;
    }
    updateTrackHistory([]);
    toggleFavoriteEntry(current);
  }

  function updateTrackHistory(entries) {
    const nextEntries = (Array.isArray(entries) ? entries : []).map(normalizeTrackEntry).filter(Boolean);
    const current = getCurrentTrackEntry();
    if (current) nextEntries.unshift(current);
    trackHistory = nextEntries.concat(trackHistory).filter((entry, index, array) => {
      const key = trackKey(entry);
      return key && array.findIndex((item) => trackKey(item) === key) === index;
    }).slice(0, 5);
    renderTrackHistory();
  }

  function renderTrackHistory() {
    historyCount.textContent = String(trackHistory.length);
    if (!trackHistory.length) {
      historyList.innerHTML = '<li><div><div class="radio-history-title">Historique indisponible</div><div class="radio-history-artist">En attente des donnees radio</div></div></li>';
      return;
    }
    historyList.innerHTML = trackHistory.map((entry, index) => {
      const isFavorite = favoriteKeys.includes(trackKey(entry));
      return '<li><div><div class="radio-history-title">' + escapeHtml(entry.title) + '</div><div class="radio-history-artist">' + escapeHtml(entry.artist || radio.name) + '</div></div><div class="radio-history-actions"><button class="radio-history-copy" type="button" data-history-soundeo="' + index + '" title="Ouvrir Soundeo et copier ce titre" aria-label="Ouvrir Soundeo et copier ce titre">' + icons.search + '</button><button class="radio-history-favorite' + (isFavorite ? ' is-favorite' : '') + '" type="button" data-history-favorite="' + index + '" title="' + (isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris') + '" aria-label="' + (isFavorite ? 'Retirer ce titre des favoris' : 'Ajouter ce titre aux favoris') + '">' + icons.star + '</button></div></li>';
    }).join('');
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
  }

  function toggleHistory() {
    root.classList.toggle('is-history-open');
    setIdleTimer();
  }

  function formatTrackValue(entry) {
    const normalized = normalizeTrackEntry(entry);
    if (!normalized) return 'En direct';
    return [normalized.title, normalized.artist].filter((part) => part && part !== radio.name && part !== 'En direct').join(' - ') || normalized.title || 'En direct';
  }

  async function copyTextValue(value) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      setStatus('Titre copie', value);
      return true;
    } catch (_) {
      setStatus('Copie impossible', 'Selectionne le titre manuellement.', true);
      return false;
    } finally { setIdleTimer(); }
  }

  function openSoundeoForTrack(entry) {
    const value = formatTrackValue(entry);
    const soundeoTab = window.open(CONFIG.soundeoUrl, '_blank', 'noopener,noreferrer');
    copyTextValue(value).then((copied) => {
      if (soundeoTab) {
        setStatus('Soundeo ouvert', copied ? 'Titre copie. Colle-le dans la recherche Soundeo.' : 'Copie impossible, colle le titre manuellement.');
      } else {
        setStatus('Soundeo bloque', copied ? 'Titre copie. Autorise les pop-ups pour ouvrir Soundeo.' : 'Autorise les pop-ups puis copie le titre manuellement.', true);
      }
    });
  }

  async function copyCurrentTitle() {
    const copied = await copyTextValue(formatTrackValue(getCurrentTrackEntry()));
    if (copied) showCopyFeedback();
  }

  async function copyFavoriteTextList() {
    const lines = favoriteTracks.map(formatTrackValue).filter((value, index, array) => value && value !== 'En direct' && array.indexOf(value) === index);
    if (!lines.length) {
      setStatus('Aucun favori', 'Ajoute au moins un titre avant de copier la liste.', true);
      setIdleTimer();
      return;
    }
    const copied = await copyTextValue(lines.join('\n'));
    if (!copied) return;
    window.clearTimeout(favoriteExportTimer);
    copyFavoritesButton?.classList.add('is-copied');
    favoriteExportTimer = window.setTimeout(() => copyFavoritesButton?.classList.remove('is-copied'), 3000);
    setStatus('Favoris copies', lines.length + ' titre' + (lines.length > 1 ? 's' : '') + ' en texte brut.');
  }

  function parseMetadata(data) {
    const calendar = Array.isArray(data.calendar) ? data.calendar : [];
    const now = new Date();
    const currentShow = calendar.find((item) => new Date(item.start) <= now && new Date(item.end) >= now);
    const track = data.stream && data.stream.current_track ? data.stream.current_track : null;
    const historySources = [data.history, data.recent_tracks, data.last_tracks, data.tracks, data.stream && data.stream.history, data.stream && data.stream.recent_tracks, data.stream && data.stream.last_tracks];
    const history = historySources.find((source) => Array.isArray(source) && source.length) || [];
    return {
      show: currentShow && currentShow.title ? currentShow.title : 'LIVE',
      title: track && track.title ? track.title : 'En direct',
      artist: track && track.artist ? track.artist : '',
      history,
    };
  }

  async function fetchMetadata() {
    window.clearTimeout(metadataTimer);
    if (!radio.metadataUrl) return;
    try {
      const response = await fetch(radio.metadataUrl, { cache: 'no-store' });
      if (!response.ok) throw new Error('metadata');
      const parsed = parseMetadata(await response.json());
      trackTitle.textContent = parsed.title || parsed.show || 'En direct';
      artist.textContent = parsed.artist || parsed.show || radio.name;
      updateTrackHistory(parsed.history || []);
      updateCurrentFavoriteState();
    } catch (_) {
      trackTitle.textContent = 'En direct';
      artist.textContent = radio.name;
      updateCurrentFavoriteState();
    } finally {
      metadataTimer = window.setTimeout(fetchMetadata, 30000);
    }
  }

  function updateMediaSession() {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: trackTitle.textContent || radio.name,
      artist: artist.textContent || 'En direct',
      album: radio.name,
      artwork: [{ src: radio.logoUrl, sizes: '96x96', type: 'image/png' }, { src: radio.logoUrl, sizes: '192x192', type: 'image/png' }],
    });
    navigator.mediaSession.setActionHandler('play', playRadio);
    navigator.mediaSession.setActionHandler('pause', pauseRadio);
  }

  function ensurePipVideo() {
    if (pipVideo) return pipVideo;
    pipCanvas = document.createElement('canvas');
    pipCanvas.width = 640;
    pipCanvas.height = 360;
    pipContext = pipCanvas.getContext('2d');
    drawPipFrame();
    const stream = pipCanvas.captureStream ? pipCanvas.captureStream(1) : null;
    if (!stream) return null;
    pipVideo = document.createElement('video');
    pipVideo.className = 'radio-pip-video';
    pipVideo.muted = true;
    pipVideo.playsInline = true;
    pipVideo.srcObject = stream;
    document.body.appendChild(pipVideo);
    return pipVideo;
  }

  function drawPipFrame() {
    if (!pipContext) return;
    const gradient = pipContext.createLinearGradient(0, 0, 640, 360);
    gradient.addColorStop(0, '#111111');
    gradient.addColorStop(1, '#f1eee7');
    pipContext.fillStyle = gradient;
    pipContext.fillRect(0, 0, 640, 360);
    pipContext.fillStyle = 'rgba(255,255,255,.88)';
    pipContext.beginPath();
    pipContext.roundRect(44, 44, 552, 272, 34);
    pipContext.fill();
    pipContext.fillStyle = '#111111';
    pipContext.font = '700 34px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif';
    pipContext.fillText(radio.name, 82, 126);
    pipContext.fillStyle = '#ff4e17';
    pipContext.beginPath();
    pipContext.arc(92, 178, 8, 0, Math.PI * 2);
    pipContext.fill();
    pipContext.fillStyle = '#444444';
    pipContext.font = '600 24px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif';
    pipContext.fillText(trackTitle.textContent || 'En direct', 116, 187);
    pipContext.fillStyle = '#777777';
    pipContext.font = '500 19px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif';
    pipContext.fillText(artist.textContent || 'LIVE', 82, 234);
  }

  async function requestPip(silent) {
    setIdleTimer();
    if (!document.pictureInPictureEnabled) {
      if (!silent) setStatus('PiP indisponible', 'Le navigateur ne prend pas en charge ce mode.', true);
      return;
    }
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
      return;
    }
    const video = ensurePipVideo();
    if (!video) {
      if (!silent) setStatus('PiP indisponible', 'Mode flottant conserve dans le widget.', true);
      return;
    }
    try {
      drawPipFrame();
      await video.play();
      await video.requestPictureInPicture();
      setStatus('Picture-in-Picture', 'Fenetre flottante active quand le navigateur l’autorise.');
    } catch (_) {
      if (!silent) setStatus('PiP a activer', 'Clique a nouveau si le navigateur demande un geste direct.', true);
    }
  }

  muteButton.addEventListener('click', () => { root.classList.add('has-dismissed-onboarding'); playRadio(); });
  playButton.addEventListener('click', togglePlay);
  orbitPlayButton.addEventListener('click', togglePlay);
  volumeButton.addEventListener('click', toggleVolume);
  historyButton.addEventListener('click', toggleHistory);
  copyButton.addEventListener('click', copyCurrentTitle);
  orbitCopyButton.addEventListener('click', copyCurrentTitle);
  favoriteCurrentButtons.forEach((button) => button.addEventListener('click', toggleCurrentFavorite));
  copyFavoritesButton?.addEventListener('click', copyFavoriteTextList);
  historyList.addEventListener('click', (event) => {
    const soundeoTarget = event.target.closest('[data-history-soundeo]');
    const favoriteTarget = event.target.closest('[data-history-favorite]');
    if (soundeoTarget) {
      openSoundeoForTrack(trackHistory[Number(soundeoTarget.dataset.historySoundeo)]);
      return;
    }
    if (favoriteTarget) toggleFavoriteEntry(trackHistory[Number(favoriteTarget.dataset.historyFavorite)]);
  });
  orbitVolumeButton.addEventListener('click', toggleOrbitVolume);
  volumeRange.addEventListener('input', (event) => setVolume(event.target.value));
  pipButton.addEventListener('click', () => requestPip(false));
  eyeButton.addEventListener('click', () => root.classList.contains('is-hidden') ? reveal() : hidePanel());
  orbitEyeButtons.forEach((button) => button.addEventListener('click', reveal));
  document.addEventListener('pointerdown', (event) => {
    if (!orbit.contains(event.target)) orbit.classList.remove('is-volume-open');
    if (!root.contains(event.target)) root.classList.remove('is-history-open');
  });
  root.addEventListener('pointermove', setIdleTimer);
  root.addEventListener('pointerdown', setIdleTimer);
  root.addEventListener('focusin', setIdleTimer);

  audio.addEventListener('playing', () => setPlayingState(true));
  audio.addEventListener('pause', () => setPlayingState(false));
  audio.addEventListener('error', () => {
    streamIndex += 1;
    const streams = [radio.streamUrl].concat(radio.fallbackStreams || []);
    if (streamIndex < streams.length) {
      configureAudioSource();
      audio.play().catch(() => setStatus('Flux indisponible', 'Le flux secondaire n’a pas pu demarrer.', true));
    } else {
      setPlayingState(false);
      setStatus('Flux indisponible', 'Reessaie dans un instant ou ouvre le lien officiel.', true);
    }
  });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && hasStarted) fetchMetadata(); });
  renderVolume();
  updateCurrentFavoriteState();
})();
