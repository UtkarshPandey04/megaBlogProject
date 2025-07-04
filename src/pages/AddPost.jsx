import React from 'react';
import { Container, PostForm } from '../components';

function AddPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-8">
      <Container>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Share Your Thoughts
        </h2>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;