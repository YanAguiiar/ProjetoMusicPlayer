let musicas = [
  {
    titulo: "See You again",
    artista: "Wiz Khalifa",
    src: "/music/See-You-Again.mp3",
    img: "/img/See you again.jpg",
  },
  {
    titulo: "Never Play",
    artista: "Jeremy Blake",
    src: "/music/Never Play - Jeremy Blake.mp3",
    img: "/img/Never Play.jpg",
  },
  {
    titulo: "Hotlante",
    artista: "Track Tribe",
    src: "/music/Hotlanta - Track Tribe.mp3",
    img: "/img/Hotlanta.jpg",
  },
];

let musica = document.querySelector("audio"); //Musica que está tocando no momento
let indexMusica = 0;
let imagem = document.querySelector("img");
let nomeMusica = document.querySelector(".descricao h2");
let nomeArtista = document.querySelector(".descricao i");

renderizarMusica(indexMusica);

//Ao clicar no play fazer a música tocar
document.querySelector(".botao-play").addEventListener("click", tocarMusica);
//Agora fazer a musica pausar
document.querySelector(".botao-pause").addEventListener("click", pausarMusica);
//Ao clicar nas setas para trocar de musica
document.querySelector(".anterior").addEventListener("click", () => {
  indexMusica--;
  if (indexMusica < 0) {
    indexMusica = 2;
  }
  renderizarMusica(indexMusica);
});
document.querySelector(".proxima").addEventListener("click", () => {
  indexMusica++;
  if (indexMusica > 2) {
    indexMusica = 0;
  }
  renderizarMusica(indexMusica);
});

musica.addEventListener("loadeddata", atualizarBarra);
musica.addEventListener("timeupdate", atualizarBarra);

function tocarMusica() {
  musica.play();
  //Fazer o botão de play sumir e aparecer o de pause
  document.querySelector(".botao-pause").style.display = "block";
  document.querySelector(".botao-play").style.display = "none";
}

function pausarMusica() {
  musica.pause();
  //Fazer o botão de pause sumir e aparecer do plat
  document.querySelector(".botao-pause").style.display = "none";
  document.querySelector(".botao-play").style.display = "block";
}

function atualizarBarra() {
  let barra = document.querySelector("progress");
  barra.style.width =
    Math.floor((musica.currentTime / musica.duration) * 100) + "%";
  let tempoDecorrido = document.querySelector(".inicio");
  tempoDecorrido.textContent = segundosParaMinutos(
    Math.floor(musica.currentTime)
  );

  let tempoTotal = document.querySelector(".fim");
  tempoTotal.textContent = segundosParaMinutos(Math.floor(musica.duration));
}

function segundosParaMinutos(segundos) {
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;
  if (campoSegundos < 10) {
    campoSegundos = "0" + campoSegundos;
  }
  return campoMinutos + ":" + campoSegundos;
}

function renderizarMusica(index) {
  musica.setAttribute("src", musicas[index].src);
  nomeMusica.textContent = musicas[index].titulo;
  nomeArtista.textContent = musicas[index].artista;
  imagem.src = musicas[index].img;

  musica.addEventListener("loadeddata", () => {
    tempoTotal.textContent = segundosParaMinutos(Math.floor(musica.duration));
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const audio = document.querySelector("audio");
  const volumeSlider = document.querySelector(".volume-slider");

  // Adiciona um listener para o evento de mudança no controle deslizante de volume
  volumeSlider.addEventListener("input", function () {
    const volume = volumeSlider.value / 100; // Converte o valor para a faixa de 0 a 1
    audio.volume = volume; // Define o volume do áudio
  });
});
