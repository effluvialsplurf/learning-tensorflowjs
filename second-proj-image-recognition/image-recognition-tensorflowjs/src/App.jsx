import { useState, useEffect, useRef } from 'react'
import * as mobilenet from '@tensorflow-models/mobilenet'
import '@tensorflow/tfjs-backend-webgl'
import './App.css'

function App() {
	// state variables, can change
	const [model, setModel] = useState(null);
	const imgInputRef = useRef(null);
	const [aiStateUpdates, setAiStateUpdates] = useState("Component mounted loading model");
	const [inputInstructions, setInputInstructions] = useState("Please upload an image");

	// use the model the classify the image
	async function classifyImage(image) {
		if (!model) {
			setAiStateUpdates("Model not loaded");
			return;
		}
		try {
			const predictions = await model.classify(image);
			console.log(`The model predicted: ${predictions}`);

			if (predictions && predictions.length > 0) {
				const topPrediction = predictions[0];
				setAiStateUpdates(`The model predicted: ${topPrediction.className} with a confidence of ${topPrediction.probability.toFixed(2)}`);
			} else {
				setAiStateUpdates("No predictions found");
			}
		} catch (error) {
			console.error("Error classifying image:", error);
			setAiStateUpdates("Error classifying image");
		}
	}

	// handle image upload
	const handleImageUpload = (e) => {
		const fileList = ['.png', '.jpg', '.jpeg'];
		const fileEnd = e.target.files[0].name.slice(-4);
		if (!fileList.includes(fileEnd)) {
			setInputInstructions("Please upload a valid image, with the following extensions: .png, .jpg, .jpeg");
			return;
		}
		let uploadedImage = document.getElementById("uploaded-image")
		const reader = new FileReader();
		reader.onload = (e) => {
			uploadedImage.src = e.target.result;
			uploadedImage.onload = () => {
				classifyImage(uploadedImage);
			}
		}
		reader.readAsDataURL(e.target.files[0]);
		setInputInstructions("Image uploaded successfully");
	}


	useEffect(() => {
		async function loadModel() {
			setModel(await mobilenet.load());
		}
		loadModel();
	}, [])

	return (
		<div>
			<h1>robo eyeball project</h1>

			<div className="ai-container">
				<h2>{aiStateUpdates}</h2>
				<h2>Uploaded Image</h2>
				<div className="image-display-container">
					<img id="uploaded-image" src="null" alt="please uploade an image to display one" />
				</div>

				<h2>AI image assessment</h2>
			</div>
			<h3>{inputInstructions}</h3>
			<div className="input-container">
				<input type="file" id="image-upload" accept="image/*" onChange={handleImageUpload} ref={imgInputRef} />
			</div>
		</div>
	)
}

export default App
