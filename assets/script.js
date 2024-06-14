// All the elements.
let music = document.querySelector("#music");
let wrapper = document.querySelector("#wrapper");
let listbtn = document.querySelector("#listbtn");
let range = document.querySelector("#etimerange");
let eltime = document.querySelector("#eltime");
let ttime = document.querySelector("#ttime");
let mstitle = document.querySelector("#mstitle");
let msartist = document.querySelector("#msartist");
let pvbtn = document.querySelector("#prevbtn");
let bwbtn = document.querySelector("#g5b-btn");
let ppbtn = document.querySelector("#ppbtn");
let fwbtn = document.querySelector("#g5f-btn");
let nxbtn = document.querySelector("#nextbtn");
let mslist = document.querySelector("#mslist");
let msul = document.querySelector("#mslist ul");
let msli = document.querySelectorAll("#mslist ul li");
let clistbtn = document.querySelector("#closelist");

let sfbtn = document.querySelector("#shufflebtn");
let dsfbtn = document.querySelector("#deshufflebtn");

let lpbtn = document.querySelector("#loopbtn");
let vlbtn = document.querySelector("#volumebtn");
let vlrange = document.querySelector("#volrange");


// Music datas.
let index = 0;
let defaultCover = './playlist/default.jpeg';
const originalMlist = [
 {
  name: 'Birds',
  artist: 'Xad',
  cover: './playlist/Xad - Birds.jpeg',
  path: './playlist/Xad - Birds.mp3'
 },
 {
  name: 'Summer Vibes',
  artist: 'Mike Leite',
  cover: './playlist/Mike Leite - Summer Vibes.jpeg',
  path: './playlist/Mike Leite - Summer Vibes.mp3'
 },
 {
  name: 'Hand in Glove',
  artist: 'Anc D',
  path: './playlist/Anc D - Hand in Glove.mp3'
 }
];
let mlist = duplicateArray(originalMlist);
let mutedMusic = false;


// Loads the music in the player.
loadMusic(index, false);
// Set all the musics in the playlist.
setInPlaylist(mlist);


function loadMusic(index, canPlay) {
 // Stores the current music.
 let cMusic = mlist[index];
 // Show the details in the player.
 if(!cMusic.cover) {
  wrapper.style.backgroundImage = `url('${defaultCover}')`;
  /* Disabling the cover art to show in the background
  let h = document.documentElement;
  h.style.backgroundImage = `linear-gradient(to bottom right, var(--tcol), #f01e8d)`;*/
 }
 else {
  wrapper.style.backgroundImage = `url('${cMusic.cover}')`;
  /* Disabling the cover art to show in the background
  let h = document.documentElement;
  h.style.backgroundImage = `url('${cMusic.cover}')`;
  h.style.backgroundSize = 'cover cover'; */
 };
 mstitle.innerHTML = cMusic.name;
 msartist.innerHTML = cMusic.artist;
 // Sets the music in the <audio> player.
 music.src = cMusic.path;
 // Stores total music duration in seconds.
 let mtime = music.duration;
 // Shows the music name and the other text in <title>.
 document.title = `(${cMusic.artist} - ${cMusic.name}) on PlayMusic`;
 // Shows music duration in mm:ss.
 setDuration(music);
 /* If canPlay is true then make music autoplay and
  range value empty to load from start. */
 if(canPlay == true) {
  playMusic();
  range.value = 0;
 }
 else {
  pauseMusic();
  range.value = 0; 
 }
}

function setDuration(el) {
 let mtime = el.duration;
 // Shows if music duration is not (NaN - Not a Number).
 if(el.buffered.length != 1) {
  ttime.innerHTML = '--:--';
 }
 else {
  // Shows music duration in mm:ss.
  let timeMin = ('0' + Math.floor(mtime / 60)).slice(-2);
  let timeSec = ('0' + Math.floor(mtime % 60)).slice(-2);
  ttime.innerHTML = `${timeMin}:${timeSec}`;
 }
}

function setInPlaylist(list) {
 // Writes list one-by-one.
 for(let i = 0; i < list.length; i++) {
  msul.innerHTML += `
   <li class="clearfix" onclick="musicFunc(${i})">
    <img src="${(list[i].cover) ? list[i].cover : defaultCover}" />
    <content>
     <h1>${list[i].name}</h1>
     <small>${list[i].artist}</small>
    </content>
   </li>
  `;
  if(!list[i].cover) { console.log("No cover available for the music " + list[i].name) }
 }
}

function plusMusic(number, canPlay) {
 // Adds the index and load the music.
 let x = index += number;
 // Validate if index is incorrect.
 if(x > (mlist.length - 1)) { index = 0; }
 if(x < 0) { index = (mlist.length - 1); }
 // According to validated number, load the music.
 loadMusic(index, canPlay);
}

function goToMusic(number, canPlay) {
 // Changes the index.
 index = number;
 // Loads the music according to the index number.
 loadMusic(index, canPlay);
}


function updateTime(sec) {
 // Update the time as (sec) seconds backward or forward.
 music.currentTime += sec;
}

function playMusic() {
 // Plays the music.
 music.play();
 // Changes the icon.
 let x = ppbtn.querySelector("i");
 x.className = "fa fa-pause";
}

function pauseMusic() {
 // Plays the music.
 music.pause();
 // Changes the icon.
 let x = ppbtn.querySelector("i");
 x.className = "fa fa-play";
}

function shuffleMusic(e) {
 // Shuffles the playlist.
 mlist.sort(() => Math.random() - 0.5);
 // Stores current index in the shuffled playlist.
 index = mlist.indexOf(originalMlist[index])
 // Hides the shuffle button and shows deshuffle button.
 sfbtn.classList.remove('visible');
 dsfbtn.classList.add('visible');
 // Shuffles the playlist which is in the form of <ul>.
 msul.innerHTML = '';
 setInPlaylist(mlist);
}

function deshuffleMusic(e) {
 let SmList = duplicateArray(mlist);
 let SmIndex = Number.parseInt('0'+index);
 // Sets the original sorting in the playlist.
 mlist = originalMlist;
 index = mlist.indexOf(SmList[SmIndex]);
 // Hides the deshuffle button and shows shuffle button.
 sfbtn.classList.add('visible');
 dsfbtn.classList.remove('visible');
 // Deshuffles the playlist which is in the form of <ul>.
 msul.innerHTML = '';
 setInPlaylist(mlist);
}

function loopMusic(e) {
 if(music.loop == false) {
  // Loops the music.
  music.loop = true;
  // Displays the loop action.
  lpbtn.className = 'active';
 }
 else {
  // Turn off the music loop.
  music.loop = false;
  // Displays the loop action turned off.
  lpbtn.className = '';
 }
}

function muteMusic(e) {
 // Mutes the volume.
 music.volume = 0;
 // Sets music is muted.
 mutedMusic = true;
 // Changes the icon.
 let x = vlbtn.querySelector("i");
 x.className = "fa fa-volume-off";
}

function unmuteMusic(e) {
 // Unmutes the volume.
 music.volume = 1;
 // Sets music is unmuted.
 mutedMusic = false;
 // Changes the icon.
 let x = vlbtn.querySelector("i");
 x.className = "fa fa-volume-up";
}

function musicFunc(index) {
 window.goToMusic(index, true);
 clistbtn.click();
}

function duplicateArray(array) {
 return array.map((newArray) => { return newArray; });
}


// Executes when play/pause button is clicked.
ppbtn.addEventListener('click', function(e) {
 if(music.paused == true) { playMusic(); }
 else { pauseMusic(); }
});

// Executes every time music time changes.
music.addEventListener('timeupdate', function(e) {
 // Stores current time.
 let musicNTime = e.target.currentTime;
 // Stores total time.
 let musicTTime = e.target.duration;
 // Converts time into mm:ss.
 let elapsedMin = ('0' + Math.floor(musicNTime / 60)).slice(-2);
 let elapsedSec = ('0' + Math.floor(musicNTime % 60)).slice(-2);
 let totalMin = ('0' + Math.floor(musicTTime / 60)).slice(-2);
 let totalSec = ('0' + Math.floor(musicTTime % 60)).slice(-2);
 // Shows the converted time.
 eltime.innerHTML = `${elapsedMin}:${elapsedSec}`;
 ttime.innerHTML = `${totalMin}:${totalSec}`;
 // Shows the current time in range.
 range.value = (musicNTime / musicTTime) * 100;
 // Executes when the music ends.
 if(musicNTime == musicTTime) {
  pauseMusic();
  range.value = 0;
  music.currentTime = 0;
 }
});


// Executes when the range is slided or clicked.
range.addEventListener('change', function(e) {
 let rval = e.target.value;
 music.currentTime = (rval / 100) * music.duration;
});

// Executes when the menulist button is clicked.
listbtn.addEventListener('click', function(e) {
 mslist.style.display = "block";
});

// Executes when the (close menulist) button is clicked.
clistbtn.addEventListener('click', function(e) {
 mslist.style.display = "none";
});

// Executes when backward button is clicked
bwbtn.addEventListener('click', () => updateTime(-5));
// Executes when forward button is clicked
fwbtn.addEventListener('click', () => updateTime(+5));

// Executes when previous button is clicked
pvbtn.addEventListener('click', () => plusMusic(-1, true));
// Executes when next button is clicked
nxbtn.addEventListener('click', () => plusMusic(1, true));

// Executes when shuffle button is clicked
sfbtn.addEventListener('click', () => shuffleMusic());
// Executes when deshuffle button is clicked
dsfbtn.addEventListener('click', () => deshuffleMusic());

// Executes when loop button is clicked
lpbtn.addEventListener('click', () => loopMusic());

// Executes when volume button is clicked.
vlbtn.addEventListener('dblclick', function(e) {
 if(mutedMusic == false) { muteMusic(); }
 else { unmuteMusic(); }
});
// Executes when volume is changed.
volrange.addEventListener('change', function(e) {
 let rval = e.target.value;
 music.volume = (rval / 100);
});

