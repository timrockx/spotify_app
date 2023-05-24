import React from 'react';
import { Avatar } from '@mui/material';

export default function Track({ name, link, album, image, artists }) {
  return (
    <div className='p-5 h-80 w-96 flex flex-col justify-start items-center m-auto border-white border-solid border-2 rounded-lg'>
        <Avatar alt={name} src={image} variant='square' sx={{ width: 90, height: 90}}/>
        <h1 className='text-white text-xl py-5'>
            <a href={link} target='_blank' className='hover:text-[#1ED760]'>{name}</a>
        </h1>
        <h1 className='text-white text-lg pb-3'>{album}</h1>

        <div className='w-full flex flex-row justify-center items-center p-5'>
            {artists?.map((artist, index) => {
                return (
                    <div key={index}>
                        <h2 className='text-white text-md px-1'>
                            <a href={artist.external_urls.spotify} target='_blank' className='hover:underline hover:text-[#1ED760]'>{artist.name}</a>
                        </h2>
                    </div>
                )
            })}
        </div>
        

    </div>
  )
}
