import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { getGameById, updateGame } from './services/fetch-utils';

export default function UpdatePage() {
  const match = useRouteMatch();
  const history = useHistory();
  const [game, setGame] = useState({});
  // on mount, fetch and set in state the correct board game for this id (the id can be found in match.params using the correct react-router hook)
  useEffect(() => {
    async function load() {
      const thisGame = await getGameById(match.params.id);
      setGame(thisGame);
    }
    load();
  }, [match.params.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    await updateGame(game);
    history.push('/board-games');
  }

  return (
    <div className="detail">
      <h1>{game.title}</h1>
      <h2>
        A {game.genre} game for {game.min_players} to {game.max_players} players
      </h2>
      <h3>by celebrated designer {game.designer}</h3>
      <p>{game.description}</p>
    </div>
  );
}
