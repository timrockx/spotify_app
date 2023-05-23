import React from 'react';
import { Avatar } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export default function ProfileCard({ name, email, country, premium, image }) {

  return (
    <div className='bg-[#F5F5F5] my-5 border-solid border-black border-2 rounded-xl w-2/4 h-1/4 p-5 flex flex-col justify-center items-cente shadow-lg hover:bg-[#FAF9F6] hover:shadow-2xl hover: shadow-inner'>
        <div className='w-full flex flex-row items-center justify-start mb-5'>
            {/* image if possible, else initials */}
            <Avatar alt={name} src={image} sx={{ width: 56, height: 56}} />
            {/* body.display_name */}
            <h1 className='text-xl px-5'>{name}</h1>
            {/* body.product */}
            {premium ? <WorkspacePremiumIcon sx={{ marginLeft: 'auto' }} /> : null}
        </div>
        <div className='flex flex-col justify-between items-start'>
            {/* body.email */}
            <h3 className='py-1 text-lg'><em>Email: </em>{email}</h3>
            {/* body.country */}
            <h3 className='py-1 text-lg'><em>Country: </em>{country}</h3>
        </div>
    </div>
  )
}
