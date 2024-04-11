import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../_component/graphql/Mutations';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import '../_component/css/Login.css';
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { MdLockOutline } from 'react-icons/md'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        try {
            if (!email && !password) {
                toast.error("All fields are required")
            }
            else if (!emailRegex.test(email)) {
                toast.error("Please enter a valid email")
            }
            else if (email && password) {
                const { data } = await login({
                    variables: { email, password },
                });
                localStorage.setItem('token', data.generateCustomerToken.token);
                toast.success('Login successful');
                navigate('/');
            }
        } catch (err) {
            toast.error('Login failed');
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
                        <MdLockOutline />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            value={email}
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={password}
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" onClick={handleClickShowPassword} sx={{ cursor: 'pointer' }}>
                                        {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                                    </InputAdornment>
                                )
                            }}
                            autoComplete="current-password"

                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/forgotpassword" variant="body2" style={{ color: '#1976d2' }}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2" >
                                    Don't have an account?<span style={{ color: '#1976d2' }}> Sign Up</span>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Login;
