import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Chip,
  IconButton,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplyIcon from '@mui/icons-material/Reply';

// Mock data for requests
const mockRequests = [
  {
    id: 1,
    student: 'Juan Pérez',
    type: 'Cambio de Materia',
    status: 'Pendiente',
    date: '2024-03-15',
    description: 'Solicitud de cambio de materia de Programación I a Programación II'
  },
  {
    id: 2,
    student: 'María López',
    type: 'Certificado',
    status: 'Aprobado',
    date: '2024-03-10',
    description: 'Certificado de notas del semestre actual'
  },
  {
    id: 3,
    student: 'Carlos Gómez',
    type: 'Constancia',
    status: 'Rechazado',
    date: '2024-03-05',
    description: 'Constancia de estudios'
  }
];

function AdminPanel() {
  const { user, logout } = useAuth();
  const [requests, setRequests] = useState(mockRequests);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    search: ''
  });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseDialog, setResponseDialog] = useState(false);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (field) => (event) => {
    setFilters({
      ...filters,
      [field]: event.target.value
    });
  };

  const handleRequestAction = (request, action) => {
    setSelectedRequest(request);
    if (action === 'respond') {
      setResponseDialog(true);
    } else {
      const updatedRequests = requests.map(req =>
        req.id === request.id
          ? { ...req, status: action === 'approve' ? 'Aprobado' : 'Rechazado' }
          : req
      );
      setRequests(updatedRequests);
    }
  };

  const handleResponseSubmit = () => {
    const updatedRequests = requests.map(req =>
      req.id === selectedRequest.id
        ? { ...req, status: 'Aprobado', response }
        : req
    );
    setRequests(updatedRequests);
    setResponseDialog(false);
    setResponse('');
    setSelectedRequest(null);
  };

  const filteredRequests = requests.filter(request => {
    return (
      (filters.status === '' || request.status === filters.status) &&
      (filters.type === '' || request.type === filters.type) &&
      (filters.search === '' ||
        request.student.toLowerCase().includes(filters.search.toLowerCase()) ||
        request.description.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendiente':
        return 'warning';
      case 'Aprobado':
        return 'success';
      case 'Rechazado':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Paper 
        sx={{ 
          p: 2, 
          bgcolor: 'primary.main', 
          color: 'white',
          borderRadius: 0
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h1">
              Panel de Administración
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="subtitle1">
                {user?.name || 'Administrador'}
              </Typography>
              <Button 
                variant="outlined" 
                color="inherit" 
                onClick={logout}
                sx={{ borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                Cerrar Sesión
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Buscar"
                value={filters.search}
                onChange={handleFilterChange('search')}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filters.status}
                  onChange={handleFilterChange('status')}
                  label="Estado"
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                  <MenuItem value="Aprobado">Aprobado</MenuItem>
                  <MenuItem value="Rechazado">Rechazado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={filters.type}
                  onChange={handleFilterChange('type')}
                  label="Tipo"
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="Cambio de Materia">Cambio de Materia</MenuItem>
                  <MenuItem value="Certificado">Certificado</MenuItem>
                  <MenuItem value="Constancia">Constancia</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Requests List */}
        <Paper>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : filteredRequests.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                No hay solicitudes {filters.status ? `en estado ${filters.status}` : ''}
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Estudiante</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.id}</TableCell>
                      <TableCell>{request.student}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>
                        <Chip 
                          label={request.status}
                          color={getStatusColor(request.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>
                        {request.status === 'Pendiente' && (
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              color="success"
                              onClick={() => handleRequestAction(request, 'approve')}
                              size="small"
                            >
                              <CheckCircleIcon />
                            </IconButton>
                            <IconButton
                              color="primary"
                              onClick={() => handleRequestAction(request, 'respond')}
                              size="small"
                            >
                              <ReplyIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleRequestAction(request, 'reject')}
                              size="small"
                            >
                              <CancelIcon />
                            </IconButton>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>

      {/* Response Dialog */}
      <Dialog 
        open={responseDialog} 
        onClose={() => setResponseDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedRequest?.type} - {selectedRequest?.student}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" gutterBottom>
            Descripción:
          </Typography>
          <Typography variant="body2" paragraph>
            {selectedRequest?.description}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Respuesta"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResponseDialog(false)}>Cancelar</Button>
          <Button 
            onClick={handleResponseSubmit} 
            variant="contained" 
            color="primary"
            disabled={!response.trim()}
          >
            Enviar Respuesta
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminPanel; 