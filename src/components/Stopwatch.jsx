import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndPause = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setMessage({ type: 'success', text: 'Stopwatch started!' });
    } else {
      setMessage({ type: 'warning', text: 'Stopwatch paused!' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setMessage({ type: 'error', text: 'Stopwatch reset!' });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="p-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out relative overflow-hidden">
        {message && (
          <div 
            className={`absolute top-0 left-0 right-0 p-3 text-center text-white font-bold animate-slide-down ${
              message.type === 'success' ? 'bg-green-500' :
              message.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          >
            {message.text}
          </div>
        )}
        <h1 className="text-5xl font-extrabold mb-6 text-center text-white animate-pulse">Stopwatch</h1>
        <div className="text-7xl font-mono mb-10 text-center text-white drop-shadow-lg">
          <span className="bg-black bg-opacity-30 px-3 py-2 rounded-lg">
            {hours.toString().padStart(2, '0')}:
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}.
            {milliseconds.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="flex justify-center space-x-6">
          <button
            className={`px-8 py-3 rounded-full text-white font-bold text-lg ${
              isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } transform hover:scale-110 transition-all duration-300 ease-in-out shadow-lg`}
            onClick={startAndPause}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            className="px-8 py-3 rounded-full bg-yellow-500 text-white font-bold text-lg hover:bg-yellow-600 transform hover:scale-110 transition-all duration-300 ease-in-out shadow-lg"
            onClick={reset}
          >
            Reset
          </button>
        </div>
        <div className="mt-10 text-3xl font-mono text-center text-white animate-bounce">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;