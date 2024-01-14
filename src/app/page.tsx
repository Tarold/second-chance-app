'use client';
import React, { useState, useEffect } from 'react';
import AppContainer from './components/AppContainer';
import Counter from './components/Counter';
import StartButton from './components/StartButton';
import { useLocalStorage } from '@uidotdev/usehooks';
import { animTime } from './constants';

const App: React.FC = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [dateTimes, setDateTimes] = useLocalStorage('dateTimes', {
    [new Date().toDateString()]: [],
  });

  useEffect(() => {
    setDateTimes((prevDateTimes: any) => ({
      ...prevDateTimes,
      [new Date().toDateString()]:
        prevDateTimes[new Date().toDateString()] || [],
    }));
  }, [setDateTimes]);

  const startAnimation = () => {
    setAnimationStarted(true);

    const currentDate = new Date().toDateString();
    const currentTime = new Date().toTimeString();

    setDateTimes((prevDateTimes: any) => ({
      ...prevDateTimes,
      [currentDate]: [...(prevDateTimes[currentDate] || []), currentTime],
    }));

    setTimeout(() => {
      setAnimationStarted(false);
    }, animTime * 1000);
  };

  const timesForToday = dateTimes[new Date().toDateString()] || [];

  return (
    <>
      <AppContainer animationStarted={animationStarted}>
        <Counter timesForToday={timesForToday} />
        <StartButton onClick={startAnimation} />
      </AppContainer>
    </>
  );
};

export default App;
