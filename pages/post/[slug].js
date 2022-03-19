import React from 'react'
import {Categories, PostWidget , PostDetail, Author, CommentsForm, Comments} from '../../components'
import { getPosts , getPostDetails} from '../../services'
const PostDetails = ({post}) => {
  // console.log(post)
  return (
  <div className='container px-8 mx-auto'>
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
      <div className='lg:col-span-4 col-span-1 relative lg:sticky top-8'>
        <div className='relative lg:sticky top-8'>
      <PostWidget slug={post.slug} categories={post.categories.map(category=>category.slug)} />
      <Categories />
        </div>
      </div>
         <div className='lg:col-span-8'>
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
      </div>
   </div>
   </div>
  )
}

export default PostDetails

export async function getStaticPaths(){
  const posts = await getPosts()
  return{
    paths: posts.map(
      ({node:{slug}})=>(
        {params:{slug}}
      )
    ),
    fallback:true
  }
}

export async function getStaticProps({params}){
  const data = await getPostDetails(params.slug)
  return {
    props: {
      post:data
    }
  }
}