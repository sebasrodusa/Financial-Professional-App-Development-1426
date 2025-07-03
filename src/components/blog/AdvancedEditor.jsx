import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiImage, FiVideo, FiLink, FiCode, FiFileText } = FiIcons;

const AdvancedEditor = ({ value, onChange, placeholder = "Start writing your blog post..." }) => {
  const quillRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readTime, setReadTime] = useState(0);

  // Custom toolbar configuration
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        [{ 'align': [] }],
        ['clean']
      ],
      handlers: {
        'image': imageHandler,
        'video': videoHandler
      }
    },
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'indent',
    'blockquote', 'code-block', 'link', 'image', 'video', 'align'
  ];

  function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
  }

  function videoHandler() {
    const url = prompt('Enter video URL (YouTube, Vimeo, etc.):');
    if (url) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'video', url);
    }
  }

  const handleChange = (content, delta, source, editor) => {
    onChange(content);
    
    // Calculate statistics
    const text = editor.getText();
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const chars = text.length;
    const readingTime = Math.max(1, Math.ceil(words / 200)); // Average reading speed
    
    setWordCount(words);
    setCharCount(chars);
    setReadTime(readingTime);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ 
          minHeight: '400px',
          backgroundColor: 'white'
        }}
      />
      
      {/* Statistics Bar */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiFileText} className="w-4 h-4" />
            <span>{wordCount} words</span>
          </div>
          <span>{charCount} characters</span>
          <span>{readTime} min read</span>
        </div>
        
        <div className="flex items-center space-x-2 text-xs">
          <span>Tip: Use "/" for quick commands</span>
        </div>
      </div>
    </div>
  );
};

export default AdvancedEditor;