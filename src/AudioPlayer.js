import React, { useEffect, useState, useRef } from "react";
import "./AudioPlayer.css";
import track1 from "./audio/audio-1.wav";

const initGainValues = {
  lowGain: 0,
  midGain: 0,
  hiGain: 0,
};

export default function AudioPlayer() {
  const [eqObject, setEqObject] = useState({ ...initGainValues });
  const [playing, setPlaying] = useState(false);
  // const [songCurrentTime, setSongCurrentTime] = useState(0);
  // const [audioDuration, setAudioDuration] = useState();
  const buttonIcon = playing ? "Pause" : "Play";

  const audioTrack = useRef();


  //declare refs for gain manipulation
  const lowRef = useRef();
  const midRef = useRef();
  const hiRef = useRef();
  const auContext = useRef();

  //on component mount
  useEffect(function () {
    //main web audio api component
    const audioContext = new AudioContext();
    // pass audio into the audio context, create filters
    const track = audioContext.createMediaElementSource(audioTrack.current);
    const lowpass = audioContext.createBiquadFilter();
    lowpass.type = "lowshelf";
    lowpass.frequency.setValueAtTime(1000, audioContext.currentTime);
    const bandpass = audioContext.createBiquadFilter();
    bandpass.type = "peaking";
    bandpass.Q.setValueAtTime(0.833, audioContext.currentTime);
    const hipass = audioContext.createBiquadFilter();
    hipass.type = "highshelf";
    hipass.frequency.setValueAtTime(4000, audioContext.currentTime);

    //update refs to use in other useEffects
    auContext.current = audioContext;
    lowRef.current = lowpass;
    midRef.current = bandpass;
    hiRef.current = hipass;

    //audio module routing
    track.connect(lowpass);
    lowpass.connect(bandpass);
    bandpass.connect(hipass);
    hipass.connect(audioContext.destination);

    //cleanup function
    return () => {
      audioContext.close();
    };
  }, []);

  ///////////////////////////////////////////////////////
  //set duration of audio TODO::::::
  // useEffect(() => {
  //   console.log("duration", typeof audioTrack?.current?.duration);
  //   setAudioDuration(audioTrack.current.duration);
  // }, [audioTrack?.current?.onloadedmetadata]);

  // //audio time display
  // useEffect(() => {
  //   const timer = () => {
  //     setSongCurrentTime(Math.round(audioTrack.current?.currentTime));
  //   };
  //   if (playing) {
  //     setInterval(timer, 1000);
  //   } else {
  //     clearInterval(timer);
  //   }

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [playing]);
  ///////////////////////////////////////////////////////

  // adjust low gain
  useEffect(() => {
    lowRef.current.gain.setValueAtTime(
      eqObject.lowGain,
      auContext.current.currentTime
    );
  }, [eqObject.lowGain]);

  // //adjust bandpass gain
  useEffect(() => {
    midRef.current.gain.setValueAtTime(
      eqObject.midGain,
      auContext.current.currentTime
    );
  }, [eqObject.midGain]);

  // //adjust high gain
  useEffect(() => {
    hiRef.current.gain.setValueAtTime(
      eqObject.hiGain,
      auContext.current.currentTime
    );
  }, [eqObject.hiGain]);

  //when audio track ends functionality
  useEffect(() => {
    setPlaying(false);
    audioTrack.current.currentTime = 0;
  }, [audioTrack.onEnded]);

  //play button functionality
  const handlePlay = () => {
    setPlaying(!playing);
    if (playing) {
      audioTrack.current.pause();
    } else {
      audioTrack.current.play();
    }
  };

  //reset button functionality
  const handleReset = () => {
    setEqObject({ ...initGainValues });
  };

  //slider functionality
  function handleGainChange(evt) {
    let { name, value } = evt.target;
    setEqObject((data) => ({
      ...data,
      [name]: value,
    }));
  }

  //restart button functionality
  const handleRestart = () => {
    setPlaying(false);
    audioTrack.current.pause();
    audioTrack.current.currentTime = 0;
  };

  return (
    <div className="audio-player">
      <h3>AUDIO PLAYER</h3>

      {/* <div id="audioTimeDisplay">
        {songCurrentTime} / {audioDuration}
      </div> */}
      <button className="transport-button" id="playButton" onClick={handlePlay}>
        {buttonIcon}
      </button>
      <button onClick={handleRestart} className="transport-button">
        Restart{" "}
      </button>
      <form>
        <div className="eq-container">
          <label htmlFor="lowGain">Low Frequency</label>
          <br />
          <div className="slider-container">
            <span>-&infin;</span>
            <input
              className="eq-slider"
              id="low-gain"
              type="range"
              min="-40"
              max="40"
              step="1"
              name="lowGain"
              value={eqObject.lowFreqValue}
              onChange={handleGainChange}
            ></input>
            <span>Max</span>
          </div>
          <label htmlFor="midGain">Mid Frequency</label>
          <br />
          <div className="slider-container">
            <span>-&infin;</span>
            <input
              className="eq-slider"
              id="mid-gain"
              type="range"
              min="-40"
              max="40"
              step="1"
              name="midGain"
              value={eqObject.midFreqValue}
              onChange={handleGainChange}
            ></input>
            <span>Max</span>
          </div>
          <label htmlFor="hiFreqValue">High Frequency</label>
          <div className="slider-container">
            <span>-&infin;</span>
            <input
              className="eq-slider"
              id="hi-gain"
              type="range"
              min="-40"
              max="40"
              step="1"
              name="hiGain"
              value={eqObject.hiFreqValue}
              onChange={handleGainChange}
            ></input>
            <span>Max</span>
          </div>
        </div>
        <button type="reset" onClick={handleReset} className="transport-button">
          Reset
        </button>
      </form>

      <audio
        ref={audioTrack}
        onEnded={handleRestart}
        className="audioFirst"
        src={track1}
        preload="metadata"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
