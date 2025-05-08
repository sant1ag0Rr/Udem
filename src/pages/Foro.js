import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Card,
  CardContent,
  CardActions,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Mock data for forum posts
const mockPosts = [
  {
    id: 1,
    author: 'Juan Pérez',
    title: 'Duda sobre Programación I',
    content: '¿Alguien puede explicarme el concepto de recursividad?',
    category: 'Programación',
    date: '2024-03-15',
    replies: [
      {
        id: 1,
        author: 'María López',
        content: 'La recursividad es cuando una función se llama a sí misma...',
        date: '2024-03-15'
      }
    ]
  },
  {
    id: 2,
    author: 'Carlos Gómez',
    title: 'Material de estudio para Matemáticas',
    content: '¿Dónde puedo encontrar material adicional para estudiar cálculo?',
    category: 'Matemáticas',
    date: '2024-03-14',
    replies: []
  }
];

function Foro() {
  const { user } = useAuth();
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '' });
  const [selectedPost, setSelectedPost] = useState(null);
  const [reply, setReply] = useState('');
  const navigate = useNavigate();

  // Tabs
  const tabValue = 5; // FORO ACADÉMICO
  const handleTabChange = (e, newValue) => {
    if (newValue === 0) navigate('/inicio');
    else if (newValue === 1) navigate('/solicitudes'); // FINANCIERAS
    else if (newValue === 2) navigate('/solicitudes'); // ADMINISTRATIVAS
    else if (newValue === 3) navigate('/solicitudes'); // PQRS
    else if (newValue === 4) navigate('/solicitudes'); // ACADÉMICAS
    else if (newValue === 5) navigate('/foro');
  };

  const handleNewPost = () => {
    const post = {
      id: posts.length + 1,
      author: user?.name || 'Anónimo',
      ...newPost,
      date: new Date().toISOString().split('T')[0],
      replies: []
    };
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: '' });
  };

  const handleReply = (postId) => {
    if (!reply.trim()) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [
            ...post.replies,
            {
              id: post.replies.length + 1,
              author: user?.name || 'Anónimo',
              content: reply,
              date: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setReply('');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#a10f1a', py: 4, px: { xs: 1, md: 6 } }}>
      {/* Barra de tabs superior */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pb: 0, position: 'relative' }}>
        <img
          src={process.env.PUBLIC_URL + '/logo-udem.png'}
          alt="Logo UdeM"
          style={{ height: 40, marginRight: 24 }}
        />
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="inherit"
          TabIndicatorProps={{ style: { background: '#000' } }}
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            minHeight: 48,
            '.MuiTab-root': { color: '#a10f1a', fontWeight: 600 },
            '.Mui-selected': { color: '#000' },
            ml: 2
          }}
        >
          <Tab label="INICIO" />
          <Tab label="FINANCIERAS" />
          <Tab label="ADMINISTRATIVAS" />
          <Tab label="PQRS" />
          <Tab label="ACADÉMICAS" />
          <Tab label="Foro Académico" />
        </Tabs>
      </Box>
      <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
        <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, bgcolor: '#fff' }}>
          <Typography variant="h4" sx={{ color: '#a10f1a', fontWeight: 700, mb: 3 }}>
            Foro Académico
          </Typography>
          {/* Nueva Publicación */}
          <Card sx={{ mb: 4, bgcolor: '#f9f6f6', borderRadius: 3, boxShadow: 0 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#a10f1a', fontWeight: 600, mb: 2 }}>
                Nueva Publicación
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Título"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    sx={{ bgcolor: 'white', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Contenido"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    sx={{ bgcolor: 'white', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Categoría"
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    sx={{ bgcolor: 'white', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={1} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: '#a10f1a', fontWeight: 700, borderRadius: 2, width: '100%' }}
                    onClick={handleNewPost}
                    disabled={!newPost.title || !newPost.content || !newPost.category}
                  >
                    Publicar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* Lista de publicaciones */}
          <Box>
            {posts.length === 0 && (
              <Typography sx={{ color: '#a10f1a', textAlign: 'center', mt: 4 }}>
                No hay publicaciones aún.
              </Typography>
            )}
            {posts.map((post) => (
              <Card key={post.id} sx={{ mb: 3, borderRadius: 3, boxShadow: 2, bgcolor: '#f9f6f6' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ bgcolor: '#a10f1a', mr: 2 }}>{post.author[0]}</Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ color: '#a10f1a', fontWeight: 700 }}>{post.title}</Typography>
                      <Chip label={post.category} size="small" sx={{ ml: 1, bgcolor: '#ede7f6', color: '#a10f1a' }} />
                      <Typography variant="body2" sx={{ color: '#555', mt: 0.5 }}>{post.author} — {post.date}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ color: '#222', mb: 2 }}>{post.content}</Typography>
                  {/* Respuestas */}
                  {post.replies.length > 0 && (
                    <Box sx={{ ml: 6, mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ color: '#a10f1a', mb: 1 }}>Respuestas:</Typography>
                      {post.replies.map((reply) => (
                        <Card key={reply.id} sx={{ mb: 1, bgcolor: '#fff', borderRadius: 2, boxShadow: 0, pl: 2 }}>
                          <CardContent sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                            <Avatar sx={{ bgcolor: '#c62828', width: 28, height: 28, fontSize: 14, mr: 1 }}>{reply.author[0]}</Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ color: '#222', fontWeight: 500 }}>{reply.author}</Typography>
                              <Typography variant="body2" sx={{ color: '#555' }}>{reply.content}</Typography>
                              <Typography variant="caption" sx={{ color: '#888' }}>{reply.date}</Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  )}
                  {/* Formulario de respuesta */}
                  <Box sx={{ ml: 6, mt: 1, display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Escribir respuesta"
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      sx={{ bgcolor: 'white', borderRadius: 1 }}
                    />
                    <Button
                      variant="contained"
                      sx={{ bgcolor: '#a10f1a', fontWeight: 700, borderRadius: 2 }}
                      onClick={() => handleReply(post.id)}
                      disabled={!reply.trim()}
                    >
                      Responder
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Foro; 