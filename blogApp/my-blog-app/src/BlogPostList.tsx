import React, { useState } from 'react';
import axios from 'axios';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

const BlogPostList: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.vercel.app/blog');
      console.log(response.data); 
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Blog Posts</h2>
      <button onClick={fetchBlogPosts}>Consultar</button>
      {isLoading ? (
        <p>Loading blog posts...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Título</th>
              <th>Contenido</th>
              <th>Autor</th>
              <th>Fecha</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td>{post.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BlogPostList;