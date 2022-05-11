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
    <div className="update">
      <form onSubmit={handleSubmit}>
        <h2>Update board game</h2>
        <label>
          Title
          <input
            required
            name="title"
            value={game.title}
            onChange={(e) => setGame({ ...game, title: e.target.value })}
          />
        </label>
        <label>
          Genre
          <select
            required
            value={game.genre}
            onChange={(e) => setGame({ ...game, genre: e.target.value })}
          >
            <option>Tile-laying</option>
            <option>Economic</option>
            <option>War</option>
            <option>Card</option>
            <option>Abstract</option>
            <option>Cooperative</option>
            <option>Solo</option>
          </select>
        </label>
        <label>
          Designer
          <input
            required
            name="designer"
            value={game.designer}
            onChange={(e) => setGame({ ...game, designer: e.target.value })}
          />
        </label>
        <label>
          Min Players
          <input
            required
            name="min_players"
            value={game.min_players}
            onChange={(e) => setGame({ ...game, min_players: e.target.value })}
          />
        </label>
        <label>
          Max Players
          <input
            required
            name="max_players"
            value={game.max_players}
            onChange={(e) => setGame({ ...game, max_players: e.target.value })}
          />
        </label>
        <label>
          Description
          <textarea
            required
            name="description"
            value={game.description}
            onChange={(e) => setGame({ ...game, description: e.target.value })}
          />
        </label>
        <button>Update game</button>
      </form>
    </div>
  );
}
