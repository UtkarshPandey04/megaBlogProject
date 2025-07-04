import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select } from '..';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      status: 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Slug transformation logic
  const slugTransform = useCallback((value) => {
    return typeof value === 'string'
      ? value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s+/g, '-')
      : '';
  }, []);

  // Set form values once post loads
  useEffect(() => {
    if (post) {
      reset({
        title: post.title || '',
        slug: post.$id || '',
        content: post.content || '',
        status: post.status || 'active',
      });
    }
  }, [post, reset]);

  // Slug updates as title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // Submit logic
  const submit = async (data) => {
    const imageFile = data?.image?.[0];

    if (post) {
      let file;
      if (imageFile) {
        file = await appwriteService.uploadFile(imageFile, userData?.$id);
        if (post.featuredImage && file) {
          await appwriteService.deleteFile(post.featuredImage);
        }
      }

      const updatedPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file?.$id || post.featuredImage,
      });

      if (updatedPost) navigate(`/post/${updatedPost.$id}`);
    } else {
      if (!userData?.$id || !imageFile) return console.error('Missing auth or image');

      const file = await appwriteService.uploadFile(imageFile, userData.$id);
      if (!file?.$id) return console.error('Image upload failed');

      data.featuredImage = file.$id;

      const newPost = await appwriteService.createPost({
        ...data,
        userId: userData.$id,
      });

      if (newPost) navigate(`/post/${newPost.$id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Post Title"
          className="mb-4"
          {...register('title', { required: 'Title is required' })}
          error={errors.title?.message}
        />
        <Input
          label="Slug"
          placeholder="Generated Slug"
          className="mb-4"
          {...register('slug', { required: 'Slug is required' })}
          onInput={(e) =>
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
          }
          error={errors.slug?.message}
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={post?.content || ''}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/*"
          {...register('image', { required: !post ? 'Image is required' : false })}
          error={errors.image?.message}
        />
        {post?.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFileDownload(post.featuredImage)}
              alt={post.title}
              onError={(e) => (e.currentTarget.src = '/default-image.png')}
              className="object-cover w-full h-40 rounded-lg border shadow-md"
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label="Status"
          className="mb-4"
          {...register('status', { required: 'Status is required' })}
          error={errors.status?.message}
        />
        <Button type="submit" disabled={isSubmitting} bgColor={post ? 'bg-green-500' : undefined} className="w-full">
          {isSubmitting ? 'Saving...' : post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}