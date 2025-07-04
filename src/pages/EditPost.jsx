import React, { useEffect, useState } from 'react';
import { Container, PostForm, Button } from '../components';
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate('/');
      return;
    }

    const fetchPost = async () => {
      try {
        const data = await appwriteService.getPost(slug);
        if (data) {
          setPost(data);
        } else {
          console.error('Post not found');
          navigate('/');
        }
      } catch (err) {
        console.error('Error fetching post:', err.message);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const status = await appwriteService.deletePost(post.$id);
        if (status && post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
        navigate('/all-posts');
      } catch (err) {
        console.error('Error deleting post:', err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-8">
      <Container>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Edit Your Post
        </h2>
        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading post...</div>
        ) : post ? (
          <div className="bg-white shadow-lg rounded-xl p-6">
            <PostForm post={post} />
            <div className="mt-6">
              <Button
                type="button"
                bgColor="bg-red-500"
                className="w-full"
                onClick={handleDelete}
              >
                Delete Post
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-red-500">
            Post could not be loaded.
          </div>
        )}
      </Container>
    </div>
  );
}

export default EditPost;