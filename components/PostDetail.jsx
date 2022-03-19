import React from 'react'
import moment from 'moment'
const PostDetail = ({post}) => {
  const getContentFragment = (index , text , obj , type)=>{
    let modifiedText = text
    
   if(obj){
     if(obj.bold){modifiedText = (<b key={index}>{text}</b>)}
     if(obj.italic){modifiedText = (<i key={index}>{text}</i>)}
     if(obj.underline){modifiedText = (<u key={index}>{text}</u>)}
   }

   switch(type){
     case'heading-tree':
       return <h3 className='text-xl font-semibold mb-4'key={index}>{modifiedText.map((item , i)=><React.Fragment key={i}>{item}</React.Fragment>)}</h3>
     case'paragraph':
       return <p className='mb-8'key={index}>{modifiedText.map((item , i)=><React.Fragment key={i}>{item}</React.Fragment>)}</p>
     case'image':
       return(
         <img src={obj.src} title={obj.title} key={index} width={obj.width} height={obj.height} align="right"/>
       )
       default:
         return modifiedText
   }

  }
  return (
    <div className='bg-white shadow-lg rounded-lg text-black p-0 lg:p-8 pb-12 mb-12'>
       <div className='relative overflow-hidden mb-6'>
          <img 
          src={post.featuredImage.url}
          alt={post.title}
          className="rounded-t-lg h-96 w-full object-cover" 
          />
        </div>
        <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
        <div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
          <img 
          src={post.author.photo.url} 
          alt={post.author.name}
          width="40px" />
          <p className='m-2'>{post.author.name}</p>
          <span>
          <img src="https://img.icons8.com/emoji/48/000000/calendar-emoji.png"width="30px"height="30px"/>
          </span>
          <span>
           {moment(post.createdAt).format("MMM . DD . YYYY")}
          </span>
        </div>
      </div>
      <h1 className='text-2xl text-center font-semibold'>{post.title}</h1>
      {console.log(post.content)}
      {post.content.raw.children.map((typeObj , index)=>{
        const children = typeObj.children.map((item , itemindex)=>getContentFragment(itemindex , item.text , item))
        return getContentFragment(index , children , typeObj , typeObj.type )
      })

      }
         </div>
  )
}

export default PostDetail