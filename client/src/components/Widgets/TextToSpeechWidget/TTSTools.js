import audioBufferToWav from "../../../audioBufferToWav";
import { downloadFromUrl } from "../../../util";

const sdk = require("microsoft-cognitiveservices-speech-sdk");

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export function microsoft() {
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    "6fe10de8d0ca4bd894e02d8c2a2debb2",
    "westus"
  );

  const audioConfig = sdk.AudioConfig.fromSpeakerOutput();
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  this.download = function (text) {
    console.log("Download");
    synthesizer.speakTextAsync(
      text,
      (result) => {
        audioCtx.decodeAudioData(result.audioData, function (buffer) {
          var source = audioCtx.createBufferSource();
          // set the buffer in the AudioBufferSourceNode
          source.buffer = buffer;
          // connect the AudioBufferSourceNode to the
          // destination so we can hear the sound
          source.connect(audioCtx.destination);
          // start the source playing
          source.start();

          const blob = new Blob([audioBufferToWav(buffer)], {
            type: "audio/wav",
          });
          const newAudioUrl = URL.createObjectURL(blob);

          downloadFromUrl(newAudioUrl);
        });
      },
      (error) => {
        console.log(error);
        synthesizer.close();
      }
    );
  };

  this.play = function (text) {
    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (result) {
        }
      },
      (error) => {
        console.log(error);
        synthesizer.close();
      }
    );
  };
}

export function mozilla() {
  this.play = function (text) {
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.onerror = function (event) {
      console.log(
        "An error has occurred with the mozilla speech synthesis: " +
          event.error
      );
    };
    synth.speak(utterThis);
  };
}
