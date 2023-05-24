import React from 'react';
import { Chip, Avatar } from '@mui/material';

export default function Artist({ name, link, genres, image }) {
  return (
    <div className='p-5 h-64 w-80 flex flex-col justify-center items-center m-auto border-white border-solid border-2 rounded-lg'>
        <Avatar alt={name} src={image} sx={{ width: 56, height: 56 }} />
        <h1 className='pt-3'>
            <a href={link} target='_blank' className='text-white text-xl hover:text-[#1ED760]'>{name}</a>
        </h1>

        <div className='flex flex-row flex-wrap gap-y-2 justify-center items-center pt-5'>
            {genres?.slice(0,2).map((genre, index) => {
                return (
                    <div key={index}>
                        <Chip label={genre} className='m-2' variant='outlined' sx={{ color: '#FFF'}}/>
                    </div>
                )
            })}
        </div>
    </div>
  )
}
