import wordBank from './assets/word-bank.json';

//finger points
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  index: [0, 5, 6, 7, 8],
  mid: [0, 9, 10, 11, 12],
  ring: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

type TFingerNames = 'thumb' | 'index' | 'mid' | 'ring' | 'pinky';

//drawing function
export const drawHand = (
  prediction: { landmarks: number[][] }[],
  ctx: CanvasRenderingContext2D,
) => {
  //check the prediction
  if (prediction.length > 0) {
    //loop to the predictions
    prediction.forEach((prediction) => {
      //grab landmarks
      const landmarks = prediction.landmarks;

      //loop the finger joints
      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        const finger = Object.keys(fingerJoints)[j] as TFingerNames;

        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          //draw joints
          ctx.beginPath();
          ctx.moveTo(landmarks[firstJointIndex][0], landmarks[firstJointIndex][1]);
          ctx.lineTo(landmarks[secondJointIndex][0], landmarks[secondJointIndex][1]);
          ctx.strokeStyle = '#ffc000';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      //loop to landmarks and draw them
      for (let i = 0; i < landmarks.length; i++) {
        //get x point
        const x = landmarks[i][0];

        //get y point
        const y = landmarks[i][1];

        //start drawing
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, 3 * Math.PI);

        //set line color
        ctx.fillStyle = '#5597d3';
        ctx.fill();
        ctx.strokeStyle = '#ffc000';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  }
};

export const autoComplete = (searchString: string) => {
  const { commonWords } = wordBank;

  const regex = `^${searchString}.*`;
  const re = new RegExp(regex);

  for (let i = 0; i < commonWords.length; i++) {
    const currWord = commonWords[i];

    if (re.test(currWord)) {
      return [currWord, currWord.slice(searchString.length)];
    }
  }

  return searchString;
};