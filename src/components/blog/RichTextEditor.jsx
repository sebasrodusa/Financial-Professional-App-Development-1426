import React, { useEffect, useCallback, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBold, FiItalic, FiList, FiImage, FiVideo, FiQuote, FiType, FiMoreHorizontal } = FiIcons;

const RichTextEditor = ({ content, onChange, placeholder = "Start writing your blog post..." }) => {
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-6',
      },
    },
  });

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const src = reader.result;
          editor?.chain().focus().setImage({ src }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
    setShowSlashMenu(false);
  }, [editor]);

  const addYouTubeVideo = useCallback(() => {
    const url = window.prompt('Enter YouTube URL');
    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
    setShowSlashMenu(false);
  }, [editor]);

  const slashCommands = [
    {
      title: 'Heading 1',
      description: 'Big section heading',
      command: () => {
        editor?.chain().focus().toggleHeading({ level: 1 }).run();
        setShowSlashMenu(false);
      },
      icon: FiType,
      shortcut: 'h1'
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading',
      command: () => {
        editor?.chain().focus().toggleHeading({ level: 2 }).run();
        setShowSlashMenu(false);
      },
      icon: FiType,
      shortcut: 'h2'
    },
    {
      title: 'Heading 3',
      description: 'Small section heading',
      command: () => {
        editor?.chain().focus().toggleHeading({ level: 3 }).run();
        setShowSlashMenu(false);
      },
      icon: FiType,
      shortcut: 'h3'
    },
    {
      title: 'Paragraph',
      description: 'Just start writing with plain text',
      command: () => {
        editor?.chain().focus().setParagraph().run();
        setShowSlashMenu(false);
      },
      icon: FiType,
      shortcut: 'p'
    },
    {
      title: 'Quote',
      description: 'Capture a quote',
      command: () => {
        editor?.chain().focus().toggleBlockquote().run();
        setShowSlashMenu(false);
      },
      icon: FiQuote,
      shortcut: 'quote'
    },
    {
      title: 'Image',
      description: 'Upload an image',
      command: addImage,
      icon: FiImage,
      shortcut: 'img'
    },
    {
      title: 'YouTube Video',
      description: 'Embed a YouTube video',
      command: addYouTubeVideo,
      icon: FiVideo,
      shortcut: 'video'
    }
  ];

  // Handle slash commands
  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (event) => {
      if (event.key === '/') {
        setTimeout(() => {
          const selection = editor.state.selection;
          const { from } = selection;
          const text = editor.state.doc.textBetween(Math.max(0, from - 10), from);
          
          // Check if we just typed a slash
          if (text.endsWith('/')) {
            // Get cursor position for slash menu
            const coords = editor.view.coordsAtPos(from);
            setSlashMenuPosition({
              top: coords.bottom + 5,
              left: coords.left
            });
            setShowSlashMenu(true);
          }
        }, 0);
      } else if (event.key === 'Escape') {
        setShowSlashMenu(false);
      }
    };

    const handleInput = () => {
      const selection = editor.state.selection;
      const { from } = selection;
      const text = editor.state.doc.textBetween(Math.max(0, from - 20), from);
      
      // Hide slash menu if user continues typing after slash
      if (showSlashMenu && !text.match(/\/\w*$/)) {
        setShowSlashMenu(false);
      }
    };

    editor.view.dom.addEventListener('keydown', handleKeyDown);
    editor.view.dom.addEventListener('input', handleInput);
    
    return () => {
      editor.view.dom.removeEventListener('keydown', handleKeyDown);
      editor.view.dom.removeEventListener('input', handleInput);
    };
  }, [editor, showSlashMenu]);

  // Handle command selection from slash menu
  const executeSlashCommand = (command) => {
    // Remove the slash character
    const selection = editor.state.selection;
    const { from } = selection;
    const text = editor.state.doc.textBetween(Math.max(0, from - 20), from);
    const slashIndex = text.lastIndexOf('/');
    
    if (slashIndex !== -1) {
      const deleteFrom = from - (text.length - slashIndex);
      editor.chain().focus().deleteRange({ from: deleteFrom, to: from }).run();
    }
    
    command();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden relative">
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 p-3 flex items-center space-x-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive('bold') ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
          }`}
        >
          <SafeIcon icon={FiBold} className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive('italic') ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
          }`}
        >
          <SafeIcon icon={FiItalic} className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-2 text-sm rounded ${
            editor.isActive('heading', { level: 1 }) ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
          }`}
        >
          H1
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-2 text-sm rounded ${
            editor.isActive('heading', { level: 2 }) ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
          }`}
        >
          H2
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive('bulletList') ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
          }`}
        >
          <SafeIcon icon={FiList} className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${
            editor.isActive('blockquote') ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
          }`}
        >
          <SafeIcon icon={FiQuote} className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-100"
          title="Add Image"
        >
          <SafeIcon icon={FiImage} className="w-4 h-4" />
        </button>

        <button
          onClick={addYouTubeVideo}
          className="p-2 rounded hover:bg-gray-100"
          title="Add YouTube Video"
        >
          <SafeIcon icon={FiVideo} className="w-4 h-4" />
        </button>

        <div className="flex-1" />

        {/* Word Count */}
        <div className="text-xs text-gray-500">
          {editor.storage.characterCount.words()} words • {editor.storage.characterCount.characters()} chars
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Slash Command Menu */}
      {showSlashMenu && (
        <div
          className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[280px]"
          style={{
            top: slashMenuPosition.top,
            left: slashMenuPosition.left
          }}
        >
          <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
            BLOCKS
          </div>
          {slashCommands.map((command, index) => (
            <button
              key={index}
              onClick={() => executeSlashCommand(command.command)}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors flex items-center space-x-3"
            >
              <div className="p-1 bg-gray-100 rounded">
                <SafeIcon icon={command.icon} className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">{command.title}</div>
                <div className="text-xs text-gray-500">{command.description}</div>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                /{command.shortcut}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close slash menu */}
      {showSlashMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSlashMenu(false)}
        />
      )}

      {/* Slash Command Help */}
      <div className="border-t border-gray-200 bg-gray-50 p-3">
        <p className="text-xs text-gray-500">
          <strong>Slash Commands:</strong> Type "/" to see available formatting options
        </p>
      </div>
    </div>
  );
};

export default RichTextEditor;