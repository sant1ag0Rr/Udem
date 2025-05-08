import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function HomePortal() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mock data for recent requests
  const recentRequests = [
    { id: 1, type: 'Cambio de Materia', status: 'Pendiente', date: '2024-03-15' },
    { id: 2, type: 'Certificado', status: 'Aprobado', date: '2024-03-10' },
    { id: 3, type: 'Constancia', status: 'Rechazado', date: '2024-03-05' },
  ];

  const handleNewRequest = () => {
    // Implement new request form
    console.log('New request clicked');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h1">
              Portal Estudiantil
            </Typography>
            <Box>
              <Typography variant="subtitle1" component="span" sx={{ mr: 2 }}>
                Bienvenido, {user?.name}
              </Typography>
              <Button variant="outlined" color="primary" onClick={logout}>
                Cerrar Sesión
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Acciones Rápidas
              </Typography>
              <List>
                <ListItem button onClick={handleNewRequest}>
                  <ListItemText primary="Nueva Solicitud" />
                </ListItem>
                <ListItem button onClick={() => navigate('/foro')}>
                  <ListItemText primary="Foro Académico" />
                </ListItem>
                <ListItem button onClick={() => navigate('/asistente')}>
                  <ListItemText primary="Asistente Virtual" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Requests */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Solicitudes Recientes
              </Typography>
              <List>
                {recentRequests.map((request, index) => (
                  <React.Fragment key={request.id}>
                    <ListItem>
                      <ListItemText
                        primary={request.type}
                        secondary={`Estado: ${request.status} - Fecha: ${request.date}`}
                      />
                      <Button size="small" color="primary">
                        Ver Detalles
                      </Button>
                    </ListItem>
                    {index < recentRequests.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={handleNewRequest}>
                Ver Todas las Solicitudes
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Academic Information */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Información Académica
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1">Programa</Typography>
                  <Typography variant="body2">Ingeniería de Sistemas</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1">Semestre Actual</Typography>
                  <Typography variant="body2">6° Semestre</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1">Promedio</Typography>
                  <Typography variant="body2">4.2</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePortal; 