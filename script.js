var imgs = [];
var gameImgs = [];
var selectedImgs = [];
var score = 0;
var moves = 0;
var maxMoves = 5;

generateImgs();
generateTable();
updateScore();

setTimeout(HideImgs, 2000);

function HideImgs() {
	var imgsToHide = document.getElementsByClassName('scored');
	if (imgsToHide.length > 0) {
		var len = imgsToHide.length;
		for (var i = 0; i < len; i++) {
			imgsToHide[0].className = "hidden";
		}
	}
}

function updateScore() {
    document.getElementById('score').innerHTML = "Wynik: " + score;
    document.getElementById('moves').innerHTML = "Pozostałe ruchy: " + (maxMoves-moves);

    if (maxMoves - moves == 0) {
        document.getElementById('score').innerHTML = "Wynik: " + score + " -PRZEGRAŁEŚ-";
    }
	else if(score==8)
	{
        document.getElementById('score').innerHTML = "Wynik: " + score + " -WYGRAŁEŚ-";
	}
}

function generateImgs() {
	imgs = [
	'https://i.imgflip.com/slxyb.jpg',
	'https://i.kym-cdn.com/photos/images/newsfeed/001/275/715/010.png',
	'https://i.kym-cdn.com/photos/images/newsfeed/000/966/457/29e.jpg',
	'http://i.imgur.com/5xtjz.jpg',
	'https://pbs.twimg.com/media/DCc3qYEWAAQMaHd.jpg',
	'https://www.memesmonkey.com/images/memesmonkey/de/de26114941bdd6bc60e2f3a99b2a730d.jpeg',
	'https://i.imgur.com/5i7LY8T.jpg',
	'https://vignette.wikia.nocookie.net/s4s/images/4/4d/Wojak.png/revision/latest?cb=20160817181304'
	];
	
	imgs = shuffle(imgs);
	
	for (var i = 0; i < 8; i++){
	gameImgs.push(imgs[i]);
	gameImgs.push(imgs[i]);
	}
	
	gameImgs = shuffle(gameImgs);
}

function generateTable() {
	var table = document.getElementById('game_table');
	var k = 0;
	
	for (var i = 0; i < 4; i++)
	{
		var row = table.insertRow(i);
		for (var j = 0; j < 4; j++)
		{
			var cell = row.insertCell(j);
			var img = document.createElement('img');
			img.id = i.toString() + j.toString();
			img.src = gameImgs[k];
			img.className = "scored";
			img.addEventListener('click',
			function (obj) {selectImg(obj.currentTarget)}, false);
			cell.appendChild(img);
			k++;
		}
	}
}

function selectImg(img) {
	if (img.className == "hidden") 
	{
		img.className = "selected";
		selectedImgs.push(img);
		if (selectedImgs.length == 2) 
		{
			if (areTheSame(selectedImgs[0], selectedImgs[1])) 
			{
				setScored(selectedImgs[0],selectedImgs[1]);
			}
			else 
            {
                moves++;
                updateScore();
                if (maxMoves - moves < 1) {

                } else {
                    setTimeout(function () {
                        selectedImgs[0].className = "hidden";
                        selectedImgs[1].className = "hidden";
                        selectedImgs = []
                    }, 500);
                }
			}
		}
	}
}

function setScored(img1, img2) {
	img1.className = "scored";
	img2.className = "scored";
	score++;
	updateScore();
	selectedImgs = [];
}

function areTheSame(img1, img2) {
	return img1.src == img2.src;
}

function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}