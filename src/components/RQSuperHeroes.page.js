import { useState } from 'react';
import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from '../hooks/useSuperHeroesData';
import { Link } from 'react-router-dom';

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccessHandler = (data) => {
    console.log('Perform side effect after data fetching', data);
  };

  const onErrorHandler = (error) => {
    console.log('Perform side effect after encountering error', error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData({
      onSuccess: onSuccessHandler,
      onError: onErrorHandler,
    });

  const {
    mutate: addHero,
    isLoading: isMutationLoading,
    isError: isMutationError,
    error: mutationError,
  } = useAddSuperHeroData();

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching || isMutationLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError || isMutationError) {
    return <h2>{error.message || mutationError.message}</h2>;
  }

  const handleOnChangeNameInput = (e) => setName(e.target.value);

  const handleOnChangeAlterEgoInput = (e) => setAlterEgo(e.target.value);

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
  };

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input type="text" value={name} onChange={handleOnChangeNameInput} />
        <input
          type="text"
          value={alterEgo}
          onChange={handleOnChangeAlterEgoInput}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch heroes</button>
      {data.data.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
    </>
  );
};
