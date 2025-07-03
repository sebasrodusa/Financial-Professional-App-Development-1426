import React, { useState, useRef, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBold, FiItalic, FiList, FiImage, FiVideo, FiQuote, FiType, FiCode, FiUnderline } = FiIcons;

const AdvancedEditor = ({ value, onChange, placeholder = "Start writing your blog post..." }) => {
  const editorRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readTime, setReadTime] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
    updateStats();
  }, [value]);

  const updateStats = () => {
    const content = editorRef.current ? editorRef.current.textContent || '' : '';
    const words = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    const chars = content.length;
    const readingTime = Math.max(1, Math.ceil(words / 200)); // Average reading speed

    setWordCount(words);
    setCharCount(chars);
    setReadTime(readingTime);
  };

  const handleInput = () => {
    const content = editorRef.current.innerHTML;
    onChange(content);
    updateStats();
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    handleInput();
  };

  const insertImage = () => {
    if (imageUrl.trim()) {
      const img = `<img src="${imageUrl}" alt="Article image" style="max-width: 100%; height: auto; margin: 10px 0;" />`;
      document.execCommand('insertHTML', false, img);
      setImageUrl('');
      setShowImageModal(false);
      editorRef.current.focus();
      handleInput();
    }
  };

  const insertHeading = (level) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString() || 'Heading Text';
      const heading = `<h${level} style="margin: 20px 0 10px 0; font-weight: bold; ${level === 1 ? 'font-size: 2em;' : level === 2 ? 'font-size: 1.5em;' : 'font-size: 1.2em;'}">${selectedText}</h${level}>`;
      
      if (range.toString()) {
        range.deleteContents();
      }
      
      const div = document.createElement('div');
      div.innerHTML = heading;
      range.insertNode(div.firstChild);
      
      // Clear selection and move cursor after heading
      selection.removeAllRanges();
      editorRef.current.focus();
      handleInput();
    }
  };

  const insertList = (ordered = false) => {
    const listType = ordered ? 'ol' : 'ul';
    const listItem = `<${listType} style="margin: 10px 0; padding-left: 20px;"><li>List item</li></${listType}>`;
    document.execCommand('insertHTML', false, listItem);
    editorRef.current.focus();
    handleInput();
  };

  const insertQuote = () => {
    const quote = `<blockquote style="border-left: 4px solid #0284c7; padding-left: 15px; margin: 20px 0; font-style: italic; color: #64748b;">Your quote text here</blockquote>`;
    document.execCommand('insertHTML', false, quote);
    editorRef.current.focus();
    handleInput();
  };

  const insertCodeBlock = () => {
    const code = `<pre style="background-color: #f1f5f9; padding: 15px; border-radius: 5px; margin: 10px 0; overflow-x: auto;"><code>// Your code here</code></pre>`;
    document.execCommand('insertHTML', false, code);
    editorRef.current.focus();
    handleInput();
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 p-3 flex items-center flex-wrap gap-2">
        {/* Text Formatting */}
        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => formatText('bold')}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Bold"
          >
            <SafeIcon icon={FiBold} className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => formatText('italic')}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Italic"
          >
            <SafeIcon icon={FiItalic} className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => formatText('underline')}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Underline"
          >
            <SafeIcon icon={FiUnderline} className="w-4 h-4" />
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => insertHeading(1)}
            className="px-3 py-2 text-sm rounded hover:bg-gray-200 transition-colors font-bold"
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => insertHeading(2)}
            className="px-3 py-2 text-sm rounded hover:bg-gray-200 transition-colors font-bold"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertHeading(3)}
            className="px-3 py-2 text-sm rounded hover:bg-gray-200 transition-colors font-bold"
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => insertList(false)}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Bullet List"
          >
            <SafeIcon icon={FiList} className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertList(true)}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Numbered List"
          >
            <span className="text-sm font-bold">1.</span>
          </button>
        </div>

        {/* Content Elements */}
        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={insertQuote}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Quote"
          >
            <SafeIcon icon={FiQuote} className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={insertCodeBlock}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Code Block"
          >
            <SafeIcon icon={FiCode} className="w-4 h-4" />
          </button>
        </div>

        {/* Media */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => setShowImageModal(true)}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
            title="Add Image"
          >
            <SafeIcon icon={FiImage} className="w-4 h-4" />
          </button>
        </div>

        {/* Word Count */}
        <div className="ml-auto text-xs text-gray-500 flex items-center space-x-4">
          <span>{wordCount} words</span>
          <span>{charCount} chars</span>
          <span>{readTime} min read</span>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[400px] p-6 focus:outline-none prose prose-lg max-w-none"
        style={{
          lineHeight: '1.6',
          fontSize: '16px',
          color: '#374151'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Image</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowImageModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={insertImage}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Insert Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="border-t border-gray-200 bg-gray-50 p-3">
        <p className="text-xs text-gray-500">
          <strong>Tips:</strong> Select text and click formatting buttons. Use toolbar to add headings, lists, quotes, and images.
        </p>
      </div>

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          font-style: italic;
        }
        
        [contenteditable] h1, [contenteditable] h2, [contenteditable] h3 {
          margin: 20px 0 10px 0;
          font-weight: bold;
        }
        
        [contenteditable] h1 {
          font-size: 2em;
          color: #111827;
        }
        
        [contenteditable] h2 {
          font-size: 1.5em;
          color: #111827;
        }
        
        [contenteditable] h3 {
          font-size: 1.2em;
          color: #111827;
        }
        
        [contenteditable] p {
          margin: 10px 0;
          line-height: 1.6;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 10px 0;
          padding-left: 20px;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #0284c7;
          padding-left: 15px;
          margin: 20px 0;
          font-style: italic;
          color: #64748b;
        }
        
        [contenteditable] pre {
          background-color: #f1f5f9;
          padding: 15px;
          border-radius: 5px;
          margin: 10px 0;
          overflow-x: auto;
        }
        
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          margin: 10px 0;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default AdvancedEditor;