const cover = document.getElementById("Photography") // const e um valor constante o qual não pod ser alterado, esse cont cuida das imagens/capas das músicas
const bordaImg = document.querySelector(".borda-img") //este cuida das bordas das capas
const SongName = document.getElementById("SongName") // document.getElementById chama um elemento o ID este que fica dentro dos (), esse cuida do nome da música
const AuthorsName = document.getElementById("AuthorName") //esse cuida do nome do author das músicas
// o nome entre o const e o sinal de igual e o apelido o qual você trabalhara com ele durante todo o JS

const song = document.getElementById("audio") //saido de som
const LikeButton = document.getElementById("Like") //butão de like
const currentProgress = document.getElementById("current-Progress")//barra de progresso que se movimente
const progressContainer = document.getElementById("progress-cointainer")// o que contém a barra de progresso
const SongTime = document.getElementById("SongTime")//tempo de música o inicio, aquilo que está sendo rodado
const TotalTime = document.getElementById("TotalTime")// quanto falta para rodar
const play = document.getElementById("play-circle")//botão de play
const rewind = document.getElementById("rewind")//regressar
const fastforward = document.getElementById("fast-forward")//proxima
const ShuffleButton = document.getElementById("shuffle")//embaralhar
const RepeatButton = document.getElementById("repeat")//repetir
const chk = document.getElementById("chk")//para o modo dark ou light

//esses consts aqui funciona como uma identidade, tudo dentro dele será exibido quando tal elemento exibido na tela
const Prism = {
  SongName: "Prism",
  artist: "Lindsey Stirling",
  file: "Lindsey Stirling - Prism",
  Liked: false,
}

const Starfire = {
  SongName: "Starfire",
  artist: "Taylor Davis",
  file: "Taylor Davis - Starfire - (Original Song)",
  Liked: false,
}

const GoldenHour = {
  SongName: "Golden Hour",
  artist: "Petar Markoski",
  file: "Petar Markoski - Golden Hour",
  Liked: false,
}

const GettingStarted = {
  SongName: "Getting Started",
  artist: "Jeremy Camp",
  file: "Jeremy Camp - Getting Started",
  Liked: false,
}

const Fumaça = {
  SongName: "Fumaça",
  artist: "Casa Worship",
  file: "Casa Worship - Fumaça",
  Liked: false,
}

const CrazyPeople = {
  SongName: "Crazy People",
  artist: "Casting Crowns",
  file: "Casting Crowns - Crazy People",
  Liked: false,
}

const Leão = {
  SongName: "Leão",
  artist: "Gabriela Rocha",
  file: "Gabriela Rocha - Leão",
  Liked: false,
}

const Diamonds = {
  SongName: "Diamonds",
  artist: "Hawk Nelson",
  file: "Hawk Nelson - Diamonds",
  Liked: false,
}

const ÉTudoSobreVocê = {
  SongName: "É Tudo Sobre Você",
  artist: "Mari Borges",
  file: "Mari Borges - É Tudo Sobre Você",
  Liked: false,
}

const GodsNotDead = {
  SongName: "God's Not Dead",
  artist: "Newsboys",
  file: "Newsboys - God's Not Dead",
  Liked: false,
}

let isPlaying = false // let e o oposto de cosnt, ou seja, seu valor é maliavel
let isShuffle = false
let repeatOn = false

// Json define a estrura exibida a partir de algo já previamente existente (como um histórico, utilizado aqui); ?? aqui funcina para caso este "histórico não exista" o JSOn montará o arquivo do zeró
const originalPlaylist = JSON.parse(localStorage.getItem("playlist")) ?? [
  Prism,
  Starfire,
  GoldenHour,
  GettingStarted,
  Fumaça,
  CrazyPeople,
  Leão,
  Diamonds,
  ÉTudoSobreVocê,
  GodsNotDead,
]

let sortedPlaylist = [...originalPlaylist]
let index = 0

//função do botão de like
function LikeButtonRender() {
  if (sortedPlaylist[index].Liked === true) {
    LikeButton.querySelector(".bx").classList.remove("bx-heart")
    LikeButton.querySelector(".bx").classList.add("bxs-heart")
    LikeButton.classList.add("button-active1")
  } else {
    LikeButton.querySelector(".bx").classList.add("bx-heart")
    LikeButton.querySelector(".bx").classList.remove("bxs-heart")
    LikeButton.classList.remove("button-active1")
  }
}

//função do inicio de música
function initializeSong() {
  cover.src = `assets/${sortedPlaylist[index].file}.png`
  song.src = `songs/${sortedPlaylist[index].file}.m4a`
  SongName.innerText = sortedPlaylist[index].SongName
  AuthorsName.innerText = sortedPlaylist[index].artist
  LikeButtonRender()
}

//função da barra de progresso
function updateProgress() {
  const barWidth = (song.currentTime / song.duration) * 100
  currentProgress.style.setProperty("--progress", `${barWidth}%`)
  SongTime.innerText = toHHMMSS(song.currentTime)
}

//função de click para a barra de progresso
function JumpTo(event) {
  const width = progressContainer.clientWidth
  const clickPosition = event.offsetX
  const JumpToTime = (clickPosition / width) * song.duration
  song.currentTime = JumpToTime
}

// funçãso de calculo de converção de segundos em horas e minutos
// MAth.floor ignora tudo depois da virgula
// return retorna um resultado
function toHHMMSS(originalNunber) {
  let hours = Math.floor(originalNunber / 3600)
  let min = Math.floor((originalNunber - hours * 3600) / 60)
  let secs = Math.floor(originalNunber - hours - min * 60)

  return `${hours.toString().padStart(2, "0")}:${min
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

//função par exibir o tempo total da música
function updateTotalTime() {
  TotalTime.innerText = toHHMMSS(song.duration)
}

//função para o like quando estiver no sorteio de música
function LikeButtonClicked() {
  if (sortedPlaylist[index].Liked === false) {
    sortedPlaylist[index].Liked = true
  } else {
    sortedPlaylist[index].Liked = false
  }
  LikeButtonRender()
  localStorage.setItem("playlist", JSON.stringify(originalPlaylist))
}

//calculo utilizado para sorteio das músicas
function ShuffleArry(preShuffleArray) {
  const size = preShuffleArray.length
  let currentIndex = size - 1
  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * size)
    let aux = preShuffleArray[currentIndex]
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex]
    preShuffleArray[randomIndex] = aux
    currentIndex -= 1
  }
}

//função utilizada o botão de sorteio de música
function ShuffleButtonClicked() {
  if (isShuffle === false) {
    isShuffle = true
    ShuffleArry(sortedPlaylist)
    ShuffleButton.classList.add("button-active")
  } else {
    isShuffle = false
    sortedPlaylist = [...originalPlaylist]
    ShuffleButton.classList.remove("button-active")
  }
}

//função para a proxima música
function previousSong() {
  if (index === 0) {
    index = sortedPlaylist.length - 1
  } else {
    index -= 1
  }
  initializeSong()
  playSong()
}

//function e simplesmente uma função a qual você atribui a tag, você pode chamar uma função dentro da outra ao inserir o seu nome e o ()
//retira e coloca o botão de play ou pause
function playSong() {
  play.querySelector(".bx").classList.remove("bx-play-circle")
  play.querySelector(".bx").classList.add("bx-pause-circle")
  song.play()
  isPlaying = true
}

//função para o botão de pause, deve fazer o mesmo pórem inverso ao do play
function pauseSong() {
  play.querySelector(".bx").classList.add("bx-play-circle")
  play.querySelector(".bx").classList.remove("bx-pause-circle")
  song.pause()
  isPlaying = false
}

//if e else funcionam como "isso deve acontecer, caso acontrio isso outro deve acontecer"
function playPauseDecider() {
  if (isPlaying === true) {
    pauseSong()
  } else {
    playSong()
  }
}

//função para a proxima música
function nextSong() {
  if (index === sortedPlaylist.length - 1) {
    index = 0
  } else {
    index += 1
    nextSong
  }
  initializeSong()
  playSong()
}

//função para repeter a música
function repeatButtonClicked() {
  if (repeatOn === false) {
    repeatOn = true
    RepeatButton.classList.add("button-active")
  } else {
    repeatOn = false
    RepeatButton.classList.remove("button-active")
  }
}

//função para tocar a proxima música assim que uma terminar
function nextOrRepeat() {
  if (repeatOn === false) {
    nextSong()
  } else {
    playSong()
  }
}

//função que define o dark mode e muda a cor da borda, body e botões

chk.addEventListener("change", () => {
  document.body.classList.toggle("dark")
  if (document.body.classList.contains("dark")) {
    bordaImg.style.borderColor = "rgb(139, 153, 156)"
  } else {
    bordaImg.style.borderColor = "#39a788"
  }
  bordaImg.style.borderWidth = "3px"
})

//chamada para a ativação das funções definidas
initializeSong()
LikeButton.addEventListener("click", LikeButtonClicked);
progressContainer.addEventListener("click", JumpTo)
song.addEventListener("timeupdate", updateProgress);
song.addEventListener("ended", nextOrRepeat)
song.addEventListener("loadedmetadata", updateTotalTime)
ShuffleButton.addEventListener("click", ShuffleButtonClicked)
rewind.addEventListener("click", previousSong)
play.addEventListener("click", playPauseDecider)
fastforward.addEventListener("click", nextSong)
RepeatButton.addEventListener("click", repeatButtonClicked)