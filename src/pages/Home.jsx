import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-8 text-center">
        <Container>
          <h1 className="text-3xl font-bold text-gray-800 hover:text-gray-500 transition">
            Login to read posts
          </h1>
          <img
  src={`https://assets.justinmind.com/wp-content/uploads/2018/07/10-hero-image-website-ideas-to-inspire-you-header-3-768x492.png`}
  alt="Hero"
  className="w-full h-full object-cover rounded-lg shadow-lg"
/>

        </Container>
    
      </div>
      
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
      <Container>
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Recent Posts
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
        
      </Container>
    </div>
    
  );
}

export default Home;