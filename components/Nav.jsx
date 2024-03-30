'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState,useEffect } from 'react';
import {signIn , signOut , useSession} from 'next-auth/react';


const Nav = () => {
    const {status} = useSession();
    const {data : session} = useSession();

    const [toggleDropdown, setToggleDropdown] = useState(false);

   
    

    
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image src='/assets/images/logo.svg' alt='Promptopia Logo' width={30} height={30} className='object-contain'/>
            <span className='logo_text'>Promptopia </span>
        </Link>
       
      {/* Desktop Navigation */}
{status === 'authenticated' ? (
    <div className='sm:flex hidden'>
        {session?.user ? (
            <div className='flex gap-3 md:gap-5'> 
                <Link href="/create-prompts" className='black_btn'>
                    Create Post
                </Link>
                <button type='button' onClick={signOut} className='outline_btn'>
                    Sign Out
                </button>
                <Link href='/profile'>
                    <Image src={session?.user.image} alt='ProfilePicture' width={37} height={37} className='rounded-full'/>
                </Link>
            </div>
        ) : null}
    </div>
) : (
    <button
        type='button'
        onClick={() => signIn('google')}
        className='black_btn'
    >
        Sign In
    </button>
)}


   {/* Mobile Navigation */}
<div className='sm:hidden flex relative'>
    {status === 'authenticated' ? (
        <div className='flex'>
            <Image
                src={session?.user.image}
                alt='ProfilePicture'
                width={37}
                height={37}
                className='rounded-full'
                onClick={() => { setToggleDropdown(prev => !prev); }}
            />

            {toggleDropdown && (
                <div className='dropdown'>
                    <Link
                        href='/profile'
                        className='dropdown_link'
                        onClick={() => setToggleDropdown(false)}
                    >
                        My Profile
                    </Link>
                    <Link
                        href='/create-prompts'
                        className='dropdown_link'
                        onClick={() => setToggleDropdown(false)}
                    >
                        Create Prompt
                    </Link>
                    <button
                        type='button'
                        onClick={() => {
                            setToggleDropdown(false);
                            signOut();
                        }}
                        className='mt-5 w-full black_btn'
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    ) : (
        <>
                    <button
                        type='button'
                        onClick={() => signIn('google')}
                        className='black_btn'
                    >
                        Sign In
                    </button>
                
        </>
    )}
</div>

 
    </nav>
  )
}

export default Nav