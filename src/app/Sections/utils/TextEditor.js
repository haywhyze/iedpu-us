import React, { useState, useEffect } from 'react';
// import ReactQuill from 'react-quill';
let ReactQuill;

const TextEditor = ({ text, setText, options }) => {
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    ReactQuill = require('react-quill');
    setShowEditor(true);
  }, []);

  const handleChange = (newText) => {
    setText(newText);
  };

  const modules = {
    toolbar: [
      // [{ header: [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['clean'],
    ],
  };

  const formats = [
    // 'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'link',
    'list',
    'bullet',
    'indent',
  ];

  return (
    <div className="text-editor">
      {showEditor ? (
        <ReactQuill
          theme="snow"
          onChange={handleChange}
          value={text}
          modules={options ? { toolbar: [options] } : modules}
          formats={options || formats}
        />
      ) : 'Loading Editor'}
    </div>
  );
};

export default TextEditor;
