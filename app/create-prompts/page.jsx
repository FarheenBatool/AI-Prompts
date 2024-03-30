'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form  from '@/components/Form';

const CreatePrompts = () => {

  const router = useRouter();
  const {data:session}=useSession();
  const [submitting, setSubitting] = useState(false);
  const [post,setPost] = useState({
    prompt:'',
    tag:'',
  });

  const createPrompt = async (e) =>{
    e.preventDefault();
    setSubitting(true);

    try {
      const response = await fetch ('api/prompt/new',{
        method:'POST',
        body:JSON.stringify({
          prompt:post.prompt,
          tag:post.tag,
          userId:session?.user.id,
        })
      })
      if(response.ok){
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }finally{
      setSubitting(false);
    }
 

  }

  return (
    <Form
    type = "Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit = {createPrompt}


    />
  )
}

export default CreatePrompts