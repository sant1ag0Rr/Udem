import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  IconButton,
  Modal,
  TextField,
  InputAdornment,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChatIcon from '@mui/icons-material/Chat';

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
];

const Home = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [openReserva, setOpenReserva] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' }
  ]);

  const handleTabChange = (e, newValue) => setTab(newValue);
  const handlePrev = () => setCarouselIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () => setCarouselIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handleReservaOpen = () => setOpenReserva(true);
  const handleReservaClose = () => setOpenReserva(false);

  const handleChatOpen = () => setOpenChat(true);
  const handleChatClose = () => setOpenChat(false);
  const handleChatSend = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { sender: 'user', text: chatInput }]);
      // Respuesta simple del bot
      setTimeout(() => {
        setChatMessages((msgs) => [...msgs, { sender: 'bot', text: 'Recibido. Pronto te responderemos.' }]);
      }, 800);
      setChatInput('');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#a10f1a', pb: 6 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'white', borderBottom: '2px solid #a10f1a' }}>
        <img src={process.env.PUBLIC_URL + '/logo-udem.png'} alt="Logo UdeM" style={{ height: 60, marginRight: 24 }} />
        <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 700, textAlign: 'center', color: '#111' }}>
          DILIGENCIA DE SOLICITUDES E INFORMACIÓN
        </Typography>
        <Button sx={{ color: '#a10f1a', fontWeight: 700, mr: 2 }}>INICIAR SESIÓN</Button>
        <Button variant="contained" sx={{ bgcolor: '#a10f1a', fontWeight: 700, '&:hover': { bgcolor: '#7a0c14' } }}>REGISTRO</Button>
      </Box>

      {/* Tabs y búsqueda */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, px: 4, gap: 2 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor="inherit"
          TabIndicatorProps={{ style: { background: '#000' } }}
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            minHeight: 48,
            '.MuiTab-root': { color: '#a10f1a', fontWeight: 600 },
            '.Mui-selected': { color: '#000' },
          }}
        >
          <Tab label="Académicas" />
          <Tab label="Financieras" />
          <Tab label="Administrativas" />
          <Tab label="PQRS" />
        </Tabs>
        <TextField
          placeholder="BUSCAR"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ ml: 2, bgcolor: '#ededed', borderRadius: 2, flex: 1, maxWidth: 350 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Carrusel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
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
          Reservar espacio de la Universidad
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

export default Home; 