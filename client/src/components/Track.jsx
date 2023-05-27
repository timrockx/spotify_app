import React from 'react';
import { Avatar, Icon } from '@mui/material';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Track({ id, name, link, album, image, artists, length, popularity }) {

    const msToMinutesAndSeconds = (ms) => {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    let backendURL = 'https://spotify-app-server.onrender.com';

    if(process.env.NODE_ENV !== 'production') {
        backendURL = 'http://localhost:8888';
    }

    const addTrack = (id) => {
        
        axios.get(`${backendURL}/add-track/${id.id}`)
            .then(res => {
                console.log("🚀 ~ file: Track.jsx ~ addTrack ~ res", res)
            })
            .catch(err => {
                console.log("🚀 ~ file: Track.jsx ~ addTrack ~ err", err)
            })
    }

  return (
    <div className='px-24 w-screen flex flex-row shrink-0 justify-start items-center m-auto rounded-lg shadow-2xl'>
        <Avatar alt={name} src={image} variant='square' sx={{ width: 72, height: 72 }}/>

        <div className='flex flex-col justify-start items-start w-full p-5'>


            <h1 className='text-white text-xl py-2'>
                <a href={link} target='_blank' className='hover:text-[#1ED760]'>{name}</a>
            </h1>

            <div className='hidden md:flex flex-row justify-start items-center'>
                {artists?.map((artist, index) => {
                    return (
                        <div key={index}>
                            <h2 className='text-white text-md px-1'>
                                <a href={artist.external_urls.spotify} target='_blank' className='hover:underline hover:text-[#1ED760]'>{artist.name}</a>
                            </h2>
                        </div>
                    )
                })}
                
                <h1 className='text-white text-md'>&#183; {album}</h1>
            </div>
        </div>

        {!length  ? 
        <div className='text-white flex flex-col justify-center items-center p-5'>
            <IconButton onClick={() => {addTrack({id})}} >
                <AddCircleOutlineIcon sx={{ color: 'white', "&:hover": {color: '#1ED760', scale: '1.3'} }} />
            </IconButton>
        </div>
        :
        <div className='text-white flex justify-center items-center px-5'>
            <h1>{msToMinutesAndSeconds(length)}</h1>
        </div>
        }

        


        

    </div>
  )
}
