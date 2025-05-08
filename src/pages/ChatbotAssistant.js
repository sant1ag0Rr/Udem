import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

// Mock responses for the chatbot
const mockResponses = {
  'hola': '¡Hola! ¿En qué puedo ayudarte hoy?',
  'horario': 'Los horarios de atención son de lunes a viernes de 8:00 AM a 6:00 PM.',
  'certificado': 'Para solicitar un certificado, debes dirigirte al módulo de solicitudes en el portal estudiantil.',
  'matricula': 'El proceso de matrícula se realiza a través del portal estudiantil. ¿Necesitas ayuda con algún paso específico?',
  'pagos': 'Los pagos se pueden realizar a través de la plataforma de pagos en línea o en la oficina de tesorería.',
  'default': 'Lo siento, no entiendo tu pregunta. ¿Podrías reformularla o contactar a un asesor?'
};

function ChatbotAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy el asistente virtual de la Universidad de Medellín. ¿En qué puedo ayudarte?',
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    for (const [key, value] of Object.entries(mockResponses)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }
    return mockResponses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, height: '80vh' }}>
      <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h5" component="h1">
            Asistente Virtual
          </Typography>
        </Box>

        {/* Messages */}
        <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                gap: 1
              }}
            >
              <Avatar
                sx={{
                  bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main'
                }}
              >
                {message.sender === 'user' ? user?.name?.[0] || 'U' : 'B'}
              </Avatar>
              <Paper
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.100'
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
              </Paper>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>

        {/* Input */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default ChatbotAssistant; 