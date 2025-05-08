import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Tabs,
  Tab,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Modal,
  TextField,
  IconButton
} from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const solicitudesAcademicas = [
  {
    icon: <ScheduleIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Horarios',
    subtitle: 'Haz clic para solicitar',
    type: 'horarios',
  },
  {
    icon: <GroupIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Cambio de grupo',
    subtitle: 'Haz clic para solicitar',
    type: 'cambio-grupo',
  },
  {
    icon: <AssignmentIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Notas académicas',
    subtitle: 'Haz clic para solicitar',
    type: 'notas',
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Información programa',
    subtitle: 'Haz clic para solicitar',
    type: 'info-programa',
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Asesoría académica',
    subtitle: 'Haz clic para solicitar',
    type: 'asesoria',
  },
];

const solicitudesFinancieras = [
  {
    icon: <LocalAtmIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Becas',
    subtitle: 'Haz clic para solicitar',
    type: 'becas',
  },
  {
    icon: <MonetizationOnIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Pago de matrícula',
    subtitle: 'Haz clic para solicitar',
    type: 'pago-matricula',
  },
  {
    icon: <PaidIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Pago servicios extracurriculares',
    subtitle: 'Haz clic para solicitar',
    type: 'pago-extracurriculares',
  },
  {
    icon: <ReceiptLongIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Reembolsos',
    subtitle: 'Haz clic para solicitar',
    type: 'reembolsos',
  },
  {
    icon: <HandshakeIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Convenios financieros',
    subtitle: 'Haz clic para solicitar',
    type: 'convenios',
  },
  {
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Estado cuenta',
    subtitle: 'Haz clic para solicitar',
    type: 'estado-cuenta',
  },
];

const solicitudesAdministrativas = [
  {
    icon: <ScheduleIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Certificados',
    subtitle: 'Haz clic para solicitar',
    type: 'certificados',
  },
  {
    icon: <GroupIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Cancelación materia',
    subtitle: 'Haz clic para solicitar',
    type: 'cancelacion-materia',
  },
  {
    icon: <AssignmentIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Actualización datos',
    subtitle: 'Haz clic para solicitar',
    type: 'actualizacion-datos',
  },
];

const solicitudesPQRSF = [
  {
    icon: <AssignmentIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Peticiones',
    subtitle: 'Haz clic para solicitar',
    type: 'peticiones',
  },
  {
    icon: <ReportProblemIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Quejas',
    subtitle: 'Haz clic para solicitar',
    type: 'quejas',
  },
  {
    icon: <NotificationsActiveIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Reclamos',
    subtitle: 'Haz clic para solicitar',
    type: 'reclamos',
  },
  {
    icon: <GroupIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Solicitudes',
    subtitle: 'Haz clic para solicitar',
    type: 'solicitudes',
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Felicitaciones',
    subtitle: 'Haz clic para solicitar',
    type: 'felicitaciones',
  },
];

const drawerWidth = 260;

// Simulación de usuario (reemplaza por tu contexto real)
const user = {
  role: 'estudiante', // Cambia a 'docente' para probar el otro perfil
  name: 'Estudiante',
  email: 'correo@udem.edu.co',
};

const iconSize = 32;

const solicitudesAcademicasEstudiante = [
  {
    icon: <ScheduleIcon sx={{ fontSize: iconSize, color: '#a10f1a' }} />,
    title: 'Horarios',
    subtitle: 'Haz clic para solicitar',
    type: 'horarios',
  },
  {
    icon: <GroupIcon sx={{ fontSize: iconSize, color: '#a10f1a' }} />,
    title: 'Cambio de grupo',
    subtitle: 'Haz clic para solicitar',
    type: 'cambio-grupo',
  },
  {
    icon: <AssignmentIcon sx={{ fontSize: iconSize, color: '#a10f1a' }} />,
    title: 'Notas académicas',
    subtitle: 'Haz clic para solicitar',
    type: 'notas',
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: iconSize, color: '#a10f1a' }} />,
    title: 'Información programa',
    subtitle: 'Haz clic para solicitar',
    type: 'info-programa',
  },
  {
    icon: <SchoolIcon sx={{ fontSize: iconSize, color: '#a10f1a' }} />,
    title: 'Asesoría académica',
    subtitle: 'Haz clic para solicitar',
    type: 'asesoria',
  },
];

const solicitudesAcademicasDocente = [
  {
    icon: <SchoolIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Material aprendizaje',
    subtitle: 'Haz clic para solicitar',
    type: 'material-aprendizaje',
  },
  {
    icon: <GroupIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Tutoría académica',
    subtitle: 'Haz clic para solicitar',
    type: 'tutoria-academica',
  },
  {
    icon: <AssignmentTurnedInIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Evaluación rendimiento',
    subtitle: 'Haz clic para solicitar',
    type: 'evaluacion-rendimiento',
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Publicación de artículo',
    subtitle: 'Haz clic para solicitar',
    type: 'publicacion-articulo',
  },
  {
    icon: <ScheduleIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Horario',
    subtitle: 'Haz clic para solicitar',
    type: 'horario-docente',
  },
  {
    icon: <AssignmentIcon sx={{ fontSize: 48, color: '#a10f1a' }} />,
    title: 'Calificaciones',
    subtitle: 'Haz clic para solicitar',
    type: 'calificaciones',
  },
];

const Solicitudes = () => {
  const [tab, setTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [form, setForm] = useState({ motivo: '', descripcion: '' });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleCardClick = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setForm({ motivo: '', descripcion: '' });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    handleCloseModal();
  };

  // Selección de tarjetas según la pestaña activa y el rol
  let solicitudesData = solicitudesAcademicasEstudiante;
  if (tab === 0) {
    solicitudesData = user.role === 'docente' ? solicitudesAcademicasDocente : solicitudesAcademicasEstudiante;
  }
  if (tab === 1) solicitudesData = solicitudesFinancieras;
  if (tab === 2) solicitudesData = solicitudesAdministrativas;
  if (tab === 3) solicitudesData = solicitudesPQRSF;
  // (Puedes agregar más arrays para Administrativas y PQRS si lo deseas)

  // Tarjeta de acceso al foro
  const foroCard = {
    icon: <MenuBookIcon sx={{ fontSize: iconSize, color: '#a10f1a' }} />,
    title: 'Foro Académico',
    subtitle: 'Haz clic para participar',
    type: 'foro',
    onClick: () => navigate('/foro'),
  };

  // Añadir la tarjeta del foro solo en la pestaña Académicas
  let tarjetas = [...solicitudesData];
  if (tab === 0) tarjetas.push(foroCard);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#a10f1a', position: 'relative' }}>
      {/* Logo, Tabs y botón de menú */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pb: 0, position: 'relative' }}>
        <img
          src={process.env.PUBLIC_URL + '/logo-udem.png'}
          alt="Logo UdeM"
          style={{ height: 40, marginRight: 24 }}
        />
        <Tabs
          value={tab}
          onChange={(e, newValue) => {
            if (newValue === 0) navigate('/inicio');
            else if (newValue === 1) setTab(0); // FINANCIERAS
            else if (newValue === 2) setTab(1); // ADMINISTRATIVAS
            else if (newValue === 3) setTab(2); // PQRS
            else if (newValue === 4) setTab(3); // ACADÉMICAS
            else if (newValue === 5) navigate('/foro');
          }}
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
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{ position: 'absolute', right: 16, top: 8, color: '#a10f1a' }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Título */}
      <Typography variant="h3" align="center" sx={{ color: '#000', fontWeight: 700, mt: 2, mb: 3 }}>
        Solicitudes
      </Typography>

      {/* Contenido principal: Solicitudes y Foro */}
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 1 }}>
        <Grid item xs={12} md={7}>
          <Grid container spacing={4}>
            {tarjetas.map((solicitud, idx) => (
              <Grid item xs={12} sm={6} key={solicitud.type}>
                <Card
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 4,
                    boxShadow: 4,
                    p: 2,
                    minHeight: 180,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '2px solid #e0e0e0',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.04)', boxShadow: 8, borderColor: '#a10f1a' },
                  }}
                  onClick={solicitud.onClick ? solicitud.onClick : () => handleCardClick(solicitud)}
                >
                  <Box sx={{ mb: 2 }}>{solicitud.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#222', mb: 1 }}>
                    {solicitud.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    {solicitud.subtitle}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Menú lateral solo como Drawer temporal */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#fff',
            p: 2,
            borderLeft: '2px solid #a10f1a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#a10f1a', mr: 1 }}><PersonIcon /></Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Estudiante</Typography>
            <Typography variant="body2" color="text.secondary">{user.email}</Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem button>
            <ListItemIcon><EditIcon sx={{ color: '#a10f1a' }} /></ListItemIcon>
            <ListItemText primary="Editar perfil" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><SettingsIcon sx={{ color: '#a10f1a' }} /></ListItemIcon>
            <ListItemText primary="Configuración" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><InfoIcon sx={{ color: '#a10f1a' }} /></ListItemIcon>
            <ListItemText primary="Información" />
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          sx={{ mt: 2, fontWeight: 700 }}
        >
          Cerrar sesión
        </Button>
      </Drawer>

      {/* Modal de formulario */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
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
          <Typography id="modal-title" variant="h6" sx={{ mb: 2, color: '#a10f1a', fontWeight: 700 }}>
            Solicitud: {selectedSolicitud?.title}
          </Typography>
          <TextField
            fullWidth
            label="Motivo"
            name="motivo"
            value={form.motivo}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={form.descripcion}
            onChange={handleFormChange}
            multiline
            rows={4}
            sx={{ mb: 2 }}
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={handleCloseModal} color="inherit">Cancelar</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#a10f1a', '&:hover': { bgcolor: '#7a0c14' } }}>Enviar</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Solicitudes; 