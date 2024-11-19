import { useState } from 'react';
import zombieFightersData from './zombieFighters';
import './App.css';

const App = () => {
  const [zombieFighters, setZombieFighters] = useState(zombieFightersData);
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [totalStrength, setTotalStrength] = useState(0);
  const [totalAgility, setTotalAgility] = useState(0);

  console.log(zombieFighters);
  console.log(team);

  const handleAddFighter = (newZFighter) => {
    if (money >= newZFighter.price) {

      const newTeamArray = [...team, newZFighter];
      setTeam(newTeamArray);

      const updateMoney = (money - newZFighter.price);
      setMoney(updateMoney);

      setTotalStrength(recalculateStrength(newTeamArray))
      setTotalAgility(recalculateAgility(newTeamArray))

    } else {
      console.log('Not enough money!')
    };
  };

  const handleRemoveFighter = (fighterToRemove) => {
    const updatedTeam = [...team];

    const removedFighter = updatedTeam.splice(fighterToRemove, 1)[0];

    setTeam(updatedTeam);
    setMoney((updateMoney) => updateMoney + removedFighter.price);

    setTotalStrength(recalculateStrength(updatedTeam));
    setTotalAgility(recalculateAgility(updatedTeam));
  };

  const recalculateStrength = (newTeamArray) => {
    return newTeamArray.reduce((sum, newZFighter) => sum + newZFighter.strength, 0);
  };

  const recalculateAgility = (newTeamArray) => {
    return newTeamArray.reduce((sum, newZFighter) => sum + newZFighter.agility, 0);
  };

  return (
    <>
      <h1>Zombie Fighters!</h1>
      <h3> Money: {money} </h3>
      <h3> Team Strength: {totalStrength} </h3>
      <h3> Team Agility: {totalAgility} </h3>

      <h3> Team </h3>
      {team.length === 0 ? (
        <p> Pick some team members! </p>
      ) : (
        <ul className='fighter-team'>
          {team.map((zFighter, index) => (
            <li key={index}>
              <img src={zFighter.image} alt={zFighter.name} />
              <p>{zFighter.name}</p>
              <p> Price: {zFighter.price} </p>
              <p> Strenght: {zFighter.strength} </p>
              <p> Agility: {zFighter.agility} </p>
              <button onClick={() => handleRemoveFighter(zFighter)}> Remove </button>
            </li>
          ))}
        </ul>
      )}

      <h3> Fighters </h3>
      <ul className='fighter-choices'>
        {zombieFighters.map((zFighter, index) => (
          <li key={index}>
            <img src={zFighter.image} alt={zFighter.name} />
            <p>{zFighter.name}</p>
            <p> Price: {zFighter.price} </p>
            <p> Strenght: {zFighter.strength} </p>
            <p> Agility: {zFighter.agility} </p>
            <button onClick={() => handleAddFighter(zFighter)}> Add </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App
