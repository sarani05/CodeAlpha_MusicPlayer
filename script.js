const songs = [
  { title: "Koondu Kulla", artist: "Ilaiyaraaja", src: "music/Koondukkulla.mp3", cover: "covers/cover1.jpg" },
  { title: "Kanmani Anbodu", artist: "Kamal Haasan, S.Janaki", src: "music/Kanmani-Anbodu.mp3", cover: "covers/cover2.jpg" },
  { title: "Sundari", artist: "S.P.Balasubrahmanyam, S.P.Sailaja", src: "music/Sundari-Kannal.mp3", cover: "covers/cover3.jpg" },
  { title: "Kanne Kalaimanae", artist: "Ilaiyaraaja, K.J.Yesudas", src: "music/Kanne Kalaimaane.mp3", cover: "covers/cover4.jpg" },
  { title: "En Kaadhale", artist: "S.P.Balasubrahmanyam", src: "music/En Kadhale (Male).mp3", cover: "covers/cover5.jpg" },
  { title: "Nilaave Vaa", artist: "Ilaiyaraaja,S.P.Balasubrahmanyam", src: "music/Nilaave Vaa.mp3", cover: "covers/cover6.jpg" },
  { title: "Kodiyile Malliyapoo", artist: "Ilaiyaraaja, P.Jayachandran, S.Janaki", src: "music/Kodiyile-Malliyapoo-MassTamilan.com.mp3",
     cover: "covers/cover7.jpg" },
  { title: "Inji Idupazhagi", artist: "Kamal Haasan, S.Janaki", src: "music/Inji Idupazhagi.mp3", cover: "covers/cover8.jpg" },
  { title: "Indha Maan", artist: "Ilaiyaraaja, K.S.Chithra", src: "music/Indha Maan Undhan.mp3", cover: "covers/cover9.jpg" },
  { title: "Raja Raja Chozhan", artist: "Ilaiyaraaja, K.J.Yesudas", src: "music/Raja Raja Chozhan Naan.mp3", cover: "covers/cover10.jpg" }
];

let current = 0, shuffle = false, repeat = false;
const audio = document.getElementById("audio"), playBtn = document.getElementById("play"),
  title = document.getElementById("title"), artist = document.getElementById("artist"),
  cover = document.getElementById("cover"), playlist = document.getElementById("playlist");

function loadSong(i) {
  const s = songs[i];
  audio.src = s.src;
  title.textContent = s.title;
  artist.textContent = s.artist;
  cover.src = s.cover;
  [...playlist.children].forEach(li => li.classList.remove("active"));
  playlist.children[i].classList.add("active");
}
function playSong() { audio.play(); playBtn.textContent = "⏸️"; }
function pauseSong() { audio.pause(); playBtn.textContent = "▶️"; }
playBtn.onclick = () => audio.paused ? playSong() : pauseSong();
document.getElementById("next").onclick = () => { current = shuffle ? Math.floor(Math.random()*songs.length) : (current+1)%songs.length;
  loadSong(current);playSong() };
document.getElementById("prev").onclick = () => { current = (current-1+songs.length)%songs.length; loadSong(current); playSong(); };
document.getElementById("volume").oninput = e => audio.volume = e.target.value;
document.getElementById("progress").oninput = e => audio.currentTime = (e.target.value/100)*audio.duration;

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

audio.addEventListener("loadedmetadata", () => {
  const duration = audio.duration;
  durationEl.textContent = formatTime(duration);
});

audio.ontimeupdate = () => {
  const current = audio.currentTime;
  const duration = audio.duration;
  progress.value = (current / duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(current);
};

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

audio.onended = () => repeat ? playSong() : document.getElementById("next").click();
document.getElementById("theme-toggle").onclick = () => document.body.classList.toggle("light");

songs.forEach((s, i) => {
  const li = document.createElement("li");
  li.textContent = s.title + " - " + s.artist;
  li.onclick = () => { current = i; loadSong(i); playSong(); };
  playlist.appendChild(li);
});
loadSong(current);
