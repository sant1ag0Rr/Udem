import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, CircularProgress, Alert, Button, Modal, TextField, IconButton, InputAdornment, Paper, Tabs, Tab
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/noticias-eventos';
const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
];

const Inicio = () => {
  const [data, setData] = useState({ noticias: [], eventos: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [openReserva, setOpenReserva] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al cargar noticias y eventos');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePrev = () => setCarouselIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () => setCarouselIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const handleReservaOpen = () => setOpenReserva(true);
  const handleReservaClose = () => setOpenReserva(false);
  const handleChatOpen = () => setOpenChat(true);
  const handleChatClose = () => setOpenChat(false);
  const handleChatSend = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { sender: 'user', text: chatInput }]);
      setTimeout(() => {
        setChatMessages((msgs) => [...msgs, { sender: 'bot', text: 'Recibido. Pronto te responderemos.' }]);
      }, 800);
      setChatInput('');
    }
  };

  // Tabs
  const tabValue = 0; // INICIO
  const handleTabChange = (e, newValue) => {
    if (newValue === 0) navigate('/inicio');
    else if (newValue === 1) navigate('/solicitudes'); // FINANCIERAS
    else if (newValue === 2) navigate('/solicitudes'); // ADMINISTRATIVAS
    else if (newValue === 3) navigate('/solicitudes'); // PQRS
    else if (newValue === 4) navigate('/solicitudes'); // ACADÉMICAS
    else if (newValue === 5) navigate('/foro');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#a10f1a', p: 3, pb: 8 }}>
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
      {/* Carrusel y botón de reserva */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#7a0c14', borderRadius: 2, p: 2 }}>
          <IconButton onClick={handlePrev} sx={{ color: 'white' }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Box sx={{ width: 220, height: 150, mx: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'white', borderRadius: 2 }}>
            <img src={images[carouselIdx]} alt="Espacio UdeM" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
          </Box>
          <IconButton onClick={handleNext} sx={{ color: 'white' }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          sx={{ mt: 3, bgcolor: '#e0e0e0', color: '#a10f1a', fontWeight: 700, borderRadius: 8, px: 4, '&:hover': { bgcolor: '#d1d1d1' } }}
          onClick={handleReservaOpen}
        >
          RESERVAR ESPACIO DE LA UNIVERSIDAD
        </Button>
      </Box>

      {/* Modal de reserva */}
      <Modal open={openReserva} onClose={handleReservaClose}>
        <Box
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: '#a10f1a', fontWeight: 700 }}>
            Reservar espacio de la Universidad
          </Typography>
          <TextField fullWidth label="Nombre del evento" sx={{ mb: 2 }} required />
          <TextField fullWidth label="Fecha" type="date" sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} required />
          <TextField fullWidth label="Espacio solicitado" sx={{ mb: 2 }} required />
          <TextField fullWidth label="Descripción" multiline rows={3} sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={handleReservaClose} color="inherit">Cancelar</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#a10f1a', '&:hover': { bgcolor: '#7a0c14' } }}>Enviar</Button>
          </Box>
        </Box>
      </Modal>

      {/* Información relevante */}
      <Box sx={{ mt: 5, mb: 4 }}>
        <Typography variant="h4" align="center" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
          Información Relevante
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#fff', mb: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#a10f1a', fontWeight: 700 }}>¿Por qué elegir la UdeM?</Typography>
                <Typography variant="body2" sx={{ color: '#333' }}>
                  La Universidad de Medellín es reconocida por su excelencia académica, innovación y compromiso con la sociedad. Ofrecemos programas de alta calidad y un ambiente inclusivo para tu desarrollo profesional y personal.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#fff', mb: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#a10f1a', fontWeight: 700 }}>Servicios Destacados</Typography>
                <Typography variant="body2" sx={{ color: '#333' }}>
                  Biblioteca moderna, laboratorios de última tecnología, campus virtual, bienestar universitario, asesoría académica y más.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#fff', mb: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#a10f1a', fontWeight: 700 }}>Contacto</Typography>
                <Typography variant="body2" sx={{ color: '#333' }}>
                  Dirección: Cra. 87 N° 30 - 65 Medellín, Colombia<br />
                  Teléfono: (604) 340 5555<br />
                  Correo: info@udemedellin.edu.co
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Noticias y eventos */}
      <Typography variant="h3" align="center" sx={{ color: '#fff', fontWeight: 700, mb: 4 }}>
        Noticias y Eventos UdeM
      </Typography>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>Noticias</Typography>
          {data.noticias.length === 0 && !loading && (
            <Typography sx={{ color: '#fff' }}>No hay noticias disponibles.</Typography>
          )}
          {data.noticias.map((noticia, idx) => (
            <Card key={idx} sx={{ mb: 2, bgcolor: '#fff' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#a10f1a', fontWeight: 700 }}>{noticia.titulo}</Typography>
                <Typography variant="body2" sx={{ color: '#333' }}>{noticia.contenido}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>Eventos</Typography>
          {data.eventos.length === 0 && !loading && (
            <Typography sx={{ color: '#fff' }}>No hay eventos próximos.</Typography>
          )}
          {data.eventos.map((evento, idx) => (
            <Card key={idx} sx={{ mb: 2, bgcolor: '#fff' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#a10f1a', fontWeight: 700 }}>{evento.titulo}</Typography>
                {evento.fecha && (
                  <Typography variant="body2" sx={{ color: '#333', mt: 1 }}>
                    Fecha: {evento.fecha}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>

      {/* Chatbot flotante */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}>
        {!openChat && (
          <IconButton onClick={handleChatOpen} sx={{ bgcolor: '#a10f1a', color: 'white', '&:hover': { bgcolor: '#7a0c14' }, width: 64, height: 64 }}>
            <ChatIcon sx={{ fontSize: 36 }} />
          </IconButton>
        )}
        {openChat && (
          <Paper sx={{ width: 320, height: 400, p: 2, borderRadius: 3, boxShadow: 8, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ChatIcon sx={{ color: '#a10f1a', mr: 1 }} />
              <Typography variant="h6" sx={{ flexGrow: 1 }}>CHATBOT</Typography>
              <Button onClick={handleChatClose} size="small" sx={{ minWidth: 0, color: '#a10f1a' }}>X</Button>
            </Box>
            <Box sx={{ flex: 1, overflowY: 'auto', mb: 1, bgcolor: '#f9f6f6', borderRadius: 2, p: 1 }}>
              {chatMessages.map((msg, i) => (
                <Box key={i} sx={{ mb: 1, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                  <Typography variant="body2" sx={{ color: msg.sender === 'user' ? '#a10f1a' : '#222', fontWeight: msg.sender === 'user' ? 700 : 400 }}>
                    {msg.text}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Escribe tu mensaje..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleChatSend(); }}
              />
              <Button variant="contained" sx={{ bgcolor: '#a10f1a', minWidth: 0 }} onClick={handleChatSend}>Enviar</Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Inicio; 