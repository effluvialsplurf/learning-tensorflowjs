import * as tf from '@tensorflow/tfjs';

async function run(event) {
	event.preventDefault();
	const predictValue = parseInt(event.target.predictValue.value);
	const epochValue = parseInt(event.target.epochValue.value);

	document.getElementById('output').innerHTML = 'loading model...'; // shows a loading message before the output

	// define out data
	const inputData = [1, 2, 3, 4, 5]
	const outputData = [2, 4, 6, 8, 10]

	// convert data to tensors
	const xs = tf.tensor2d(inputData, [inputData.length, 1]);
	const ys = tf.tensor2d(outputData, [outputData.length, 1]);

	document.getElementById('output').innerHTML = 'data loaded'; // update user to know we have the data

	// define the model
	const model = tf.sequential();
	model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

	document.getElementById('output').innerHTML = 'model defined'; // update user to know we made the model

	// compile the model
	model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

	document.getElementById('output').innerHTML = 'model compiled'; // update user to know we compiled the model

	// train the model
	const history = await model.fit(xs, ys, { epochs: epochValue });
	console.log(`Model Trained, Model: ${model}, History: ${history}`);
	document.getElementById('output').innerHTML = 'model trained'; // update user to know we trained the model

	// make a prediction
	const inputToPredict = predictValue;
	const prediction = model.predict(tf.tensor2d([inputToPredict], [1, 1]));
	const predictedValue = await prediction.data();

	// output the prediction
	console.log(`For input ${inputToPredict}, the prediction is ${predictedValue[0]}`);
	document.getElementById('output').innerHTML = `For input ${inputToPredict}, the prediction is ${predictedValue[0].toFixed(2)}`;
}

window.handleForm = run;
