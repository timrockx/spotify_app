import React from 'react';
import { Avatar } from '@mui/material';

export default function Playlist({ name, image, link }) {
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-white text-2xl py-3'>
            <a href={link} target='_blank' className='hover:text-[#1ED760]'>{name}</a>
        </h1>
        <Avatar alt={name} src={image} variant='square' sx={{ height: 72, width: 72 }} />
    </div>
  )
}
