import { Avatar } from '@mui/material';

export default function ProfileHeading({ name, image, link, followers, following }) {

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
        <div className='flex justify-center items-center pt-8'>
            <button className='text-white rounded-full border-solid border-white border-2 p-3 w-1/5'>
                Sign Out
            </button>
        </div>
    </div>
  )
}
