import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import FavDetails from './FavDetails';

const Favorite = () => {
    const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:7000/favorite/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => setFavorites(data));
    }
  }, [user]);

  const email = user?.email; 
  const rest = favorites.filter((favorite) => favorite.email === email);
    return (
        <div>
            <h1>Favorite {rest.length}</h1>
         <div className='container grid grid-cols-1 md:grid-cols-4 mx-auto gap-10'>
          {
            favorites.map((favorite)=>(
              <FavDetails
              key={favorite._id}
              favorite={favorite}
              />
            ))
          }
         </div>

        </div>
    );
};

export default Favorite;