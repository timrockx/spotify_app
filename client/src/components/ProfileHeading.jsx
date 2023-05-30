import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import axios from 'axios';
import Playlist from './Playlist';
import Track from './Track';

export default function ProfileHeading({ id, name, image, link, followers, following }) {

    let backendURL = 'https://spotify-app-server.onrender.com';

    if(process.env.NODE_ENV !== 'production') {
        backendURL = 'http://localhost:8888';
    }

    const [playlists, setPlaylists] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(false);

    useEffect(() => {

        const getPlaylists = () => {
            axios.get(`${backendURL}/playlists`)
            .then(res => {
                setPlaylists(res.data);
            })
            .catch(err => {
                console.log("🚀 ~ file: ProfileHeading.jsx:22 ~ getplaylist ~ err", err)
            })
        };

        const getRecommendations = () => {
            axios.get(`${backendURL}/recommendations`)
            .then(res => {
                setRecommendations(res.data);
            })
            .catch(err => {
                console.log("🚀 ~ file: Profile.jsx:31 ~ getFollowing ~ err:", err);
            })
        };

        getPlaylists();
        getRecommendations();

    }, []);

    // handle logout for user (return to landing page)
    const logOut = () => {
        window.history.pushState({}, document.title, "/");
        window.location.reload();
    };

    const toggleRecommendations = () => {
        setShowRecommendations(!showRecommendations);
    }



  return (
    <div className='bg-[#1b1b1b] my-2 rounded-xl w-3/4 h-1/4 p-6 flex flex-col justify-center items-cente shadow-lg mb-10'>
        <div className='flex flex-row justify-center m-auto'>
            <Avatar alt={name} src={image} sx={{ width: 92, height: 92 }} />

            <div className='flex flex-col justify-center items-start'>
                <h1 className='text-3xl text-white pl-5 pb-3 font-normal'>
                    <a href={link} target='_blank' className='hover:text-[#1ED760]'>{name}</a>
                </h1>
                <h3 className='pl-5 text-white text-center'><span className='font-bold'>{followers}</span> Followers <span className='font-bold'>&#183; {following}</span> Following</h3>
            </div>
        </div>

        {!showRecommendations ? 
        <div className='grid grid-cols-4 gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
            {playlists?.slice(0, 4).map((playlist, index) => {
                return (
                    <div key={index}>
                        <Playlist name={playlist.name} image={playlist.images[0]?.url} link={playlist.external_urls.spotify} />
                    </div>
                )
            })}
        </div>
        : 
        <div className='flex flex-col justify-center items-center'>
            {recommendations?.map((rec, index) => {
                return (
                    <div key={index}>
                        <Track id={rec.id} name={rec.name} link={rec.external_urls.spotify} album={rec.album.name} image={rec.album.images[0]?.url} artists={rec.artists} popularity={rec.popularity} />
                    </div>
                )
            })}
        </div>
        }

        <div className='flex flex-row justify-around items-center pt-8'>
            <button className='text-white rounded-full border-solid border-white border-2 py-3 px-7 w-fit hover:bg-[#1ED760] hover:text-black hover:border-black' onClick={toggleRecommendations}>
                {showRecommendations ? 'Hide Recommendations' : 'Show Recommendations'}
            </button>
            <button className='text-white rounded-full border-solid border-white border-2 py-3 px-7 w-fit hover:bg-[#1ED760] hover:text-black hover:border-black' onClick={logOut}>
                Sign Out
            </button>            
        </div>
    </div>
  )
}
