import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  Divider,
  IconButton
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../contexts/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});

function Login() {
  const { login } = useAuth();
  const [error, setError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await login(values);
      if (!result.success) {
        setError(result.error || 'Error al iniciar sesión');
      }
    },
  });

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Lado izquierdo: logo */}
      <Grid item xs={12} md={6} sx={{
        bgcolor: '#a10f1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <img
            src={process.env.PUBLIC_URL + '/logo-udem.png'}
            alt="Universidad de Medellín"
            style={{ maxWidth: 350, width: '90%', marginBottom: 16 }}
          />
        </Box>
      </Grid>

      {/* Lado derecho: formulario */}
      <Grid item xs={12} md={6} sx={{
        bgcolor: '#a10f1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
        <Paper elevation={6} sx={{
          p: 5,
          width: '100%',
          maxWidth: 400,
          borderRadius: 2,
          bgcolor: '#f9f6f6',
        }}>
          <Typography variant="h5" sx={{ color: '#a10f1a', fontWeight: 700, mb: 1, textAlign: 'center' }}>
            Bienvenido a la Universidad de Medellín
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 500, mb: 3, textAlign: 'center' }}>
            Iniciar Sesión
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email*"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
              autoComplete="username"
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Contraseña*"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              autoComplete="current-password"
            />
            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Link href="#" underline="hover" sx={{ color: '#a10f1a', fontWeight: 500, fontSize: 14 }}>
                ¿Olvidaste la contraseña?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#a10f1a', '&:hover': { bgcolor: '#7a0c14' }, fontWeight: 600 }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <Divider sx={{ my: 2 }}>O conéctate con</Divider>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <IconButton color="inherit" aria-label="Facebook">
              <FacebookIcon sx={{ color: '#3b5998' }} />
            </IconButton>
            <IconButton color="inherit" aria-label="Instagram">
              <InstagramIcon sx={{ color: '#E4405F' }} />
            </IconButton>
            <IconButton color="inherit" aria-label="Google">
              <GoogleIcon sx={{ color: '#DB4437' }} />
            </IconButton>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login; 