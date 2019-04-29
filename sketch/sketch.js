let video;
let posenet;
let players = [];


function setup() {
  let canvasG = createCanvas(640, 480);
  canvasG.parent('game');
  strokeWeight(50)

  video = createCapture(VIDEO)
  // video.hide();

  posenet = ml5.poseNet(video, modelReady);
  posenet.on('pose', gotPoses);
}

function draw() {
  background(51)
  // image(video, 0, 0)
  players.forEach((player, index) => {
    player.draw(index)
    console.log('player drawn')
  })


}

function gotPoses(poses) {

  console.log(players)
  console.log(poses)

  if (poses.length > 0) {

    poses.forEach((pose, index) => {
      if (pose['pose']['score'] < 0.1) {
        poses.splice(index, 1)
        console.log('detection removed')
      }
    })

    if (players.length < poses.length) {
      for (let i = players.length; i < poses.length; i++) {
        players.push(new Player())
      };
    } else if (players.length > poses.length) {
      for (let i = players.length; i > poses.length; i--) {
        players.pop()
      };
    }

    players.forEach((player, index) => {
      player.refresh(poses[index])
    })
  }


}

function modelReady() {
  console.log('model ready')
}
