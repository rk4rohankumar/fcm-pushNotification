import React from 'react';
import { useGetPokemonByNameQuery } from '../services/pokemon';
import { useFetchDataQuery } from '../services/fetchapi';

export function  MyPokemon({name}) {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='mt-8 border p-3  flex'>
      <h3>{data.species.name}</h3>
      <img src={data.sprites.front_shiny} alt={data.species.name} />
    </div>
  );
}

export function Pokemon(){
    const names = [
        'bulbasaur', 'charmander', 'squirtle', 'pikachu',
        'jigglypuff', 'psyduck', 'mewtwo', 'mew', 'togepi', 'eevee'
      ];
      return (
        <div className='mt-8 border flex flex-wrap justify-center gap-5'>
          {names.map((name) => (
            <MyPokemon key={name} name={name} />
          ))}
        </div>
      ) 
}

const MyComponent = () => {
    const { data, error, isLoading } = useFetchDataQuery({
        endpoint: 'users',
        params: { page: 1, limit: 10 },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <h1 className='text-3xl mt-4' >
                Data fetching using RTK Query
            </h1>
            <div className='flex gap-8 justify-center align-middle'>
                <ul className='mt-4 '>
                    {data.map((user) => (
                        <>
                            <li className='mt-2' key={user.id}>{user.name}</li>
                        </>
                    ))}
                </ul>
                <ul className='mt-4'>
                    {data.map((user) => (
                        <li className='mt-2' key={user.id}>{user.email}</li>
                    ))}
                </ul>
            </div></>
    );
};

export default MyComponent;
