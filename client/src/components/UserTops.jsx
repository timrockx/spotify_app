import { useState, useEffect } from 'react';
import axios from 'axios';
import Artist from './Artist';
import Track from './Track';

export default function UserTops() {

    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);

    let backendURL = 'https://spotify-app-server.onrender.com';

    useEffect(() => {

        const getArtists = () => {
            axios.get(`${backendURL}/top-artists`)
                .then(res => {
                    setTopArtists(res.data);
                })
                .catch(err => {
                    console.log("🚀 ~ file: Profile.jsx:34 ~ getArtists ~ err", err)
                })
        };

        const getTracks = () => {
            axios.get(`${backendURL}/top-tracks`)
                .then(res => {
                    setTopTracks(res.data);
                })
                .catch(err => {
                    console.log("🚀 ~ file: Profile.jsx:34 ~ getTracks ~ err", err)
                })

        }

        getArtists();
        getTracks();

    }, []);

  return (
    <div className='flex flex-col px-40'>

        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-white text-4xl pb-5'>Recent Top Artists</h1>
        </div>

        <div className='w-screen flex flex-row flex-wrap gap-y-4 justify-between items-center py-5 px-24'>
            {topArtists?.slice(0, 6).map((artist, index) => {
                    return (
                        <div key={index} className='pr-px'>
                            <Artist name={artist.name} link={artist.external_urls.spotify} genres={artist.genres} image={artist.images[0].url} />
                        </div>
                    )
                })
            }
        </div>
 

        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-white text-4xl py-8'>Recent Top Songs</h1>
        </div>

        <div className='w-screen shrink-0 flex flex-col flex-wrap gap-y-4 justify-start items-start'>
            {topTracks?.slice(0, 6).map((track, index) => {
                return (
                    <div key={index}>
                        <Track name={track.name} link={track.external_urls.spotify} album={track.album.name} image={track.album.images[0].url} artists={track.artists} />
                    </div>
                )
            })}
        </div>

    </div>
  )
}
