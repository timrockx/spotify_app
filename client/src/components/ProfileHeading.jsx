import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import axios from 'axios';
import Playlist from './Playlist';

export default function ProfileHeading({ id, name, image, link, followers, following }) {

    let backendURL = 'https://spotify-app-server.onrender.com';

    if(process.env.NODE_ENV !== 'production') {
        backendURL = 'http://localhost:8888';
    }

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {

        const getPlaylists = () => {
            axios.get(`${backendURL}/playlists`)
            .then(res => {
                setPlaylists(res.data);
            })
            .catch(err => {
                console.log("🚀 ~ file: ProfileHeading.jsx:22 ~ getplaylist ~ err", err)
            })
        }

        getPlaylists();

    }, []);

    // handle logout for user (return to landing page)
    const logOut = () => {
        window.history.pushState({}, document.title, "/");
        window.location.reload();
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

        <div className='flex flex-row flex-wrap gap-y-4 justify-between items-center py-5 px-10'>
            {playlists?.slice(0, 4).map((playlist, index) => {
                return (
                    <div key={index}>
                        <Playlist name={playlist.name} image={playlist.images[0]?.url} link={playlist.external_urls.spotify} />
                    </div>
                )
            })}
        </div>

        <div className='flex justify-center items-center pt-8'>
            <button className='text-white rounded-full border-solid border-white border-2 p-3 w-1/5 hover:bg-[#1ED760] hover:text-black hover:border-black' onClick={logOut}>
                Sign Out
            </button>
        </div>
    </div>
  )
}
