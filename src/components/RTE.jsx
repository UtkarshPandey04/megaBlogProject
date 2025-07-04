import React, { useId } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name = 'content', control, label, defaultValue = '' }) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            id={id}
            apiKey="crbwwtlf4xtdmoi98mr9hjajqas45ob8tv9nksyd6e8wt1wc"
            value={value}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'image', 'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount',
              ],
              toolbar:
                'undo redo | blocks | bold italic forecolor | image | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}