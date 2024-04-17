import { Box, Button, Container, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle, AiFillDelete, AiOutlineFileDone } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import styles from '../_component/css/Update.module.css'
import { toast } from 'react-toastify'
import { TiArrowBackOutline } from 'react-icons/ti';
import { useQuery, useMutation } from '@apollo/client';
import { CUSTOMER_DATA_QUERY } from '../_component/graphql/Query.jsx';
import { UPDATE_CUSTOMER_MUTATION, DELETE_CUSTOMER_MUTATION } from '../_component/graphql/Mutations.jsx';


const UpdateDetails = () => {




    const [openAlert, setOpenAlert] = useState(false);
    let authToken = localStorage.getItem('token')
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        zipCode: '',
        city: '',
        userState: '',
    })
    let navigate = useNavigate()
    const { loading, error, data } = useQuery(CUSTOMER_DATA_QUERY, {
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    });

    const [updateCustomer, { loading1, error1 }] = useMutation(UPDATE_CUSTOMER_MUTATION, {
        context: {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        },
    });

    const [deleteCustomer, { loading2, error3 }] = useMutation(DELETE_CUSTOMER_MUTATION, {
        context: {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        },
    });

    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [userPassword, setUserPassword] = useState('');


    useEffect(() => {
        if (data && data.customer) {
            setUserDetails({
                firstName: data.customer.firstname,
                lastName: data.customer.lastname,
                email: data.customer.email,
                phoneNumber: data.customer.addresses[0]?.telephone,
                address: data.customer.addresses[0]?.street,
                zipCode: data.customer.addresses[0]?.postcode,
                city: data.customer.addresses[0]?.city,
                userState: data.customer.addresses[0]?.region?.region,
            });
        }
    }, [data]);

    const handleOnchange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    let phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // let zipRegex = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!userDetails.email && !userDetails.firstName && !userDetails.phoneNumber && !userDetails.lastName && !userDetails.address && !userDetails.city && !userDetails.userState && !userDetails.zipCode) {
                toast.error("Please Fill the all Fields", { autoClose: 500, theme: 'colored' })
            }
            else if (userDetails.firstName.length < 3 || userDetails.lastName.length < 3) {
                toast.error("Please enter name with more than 3 characters", { autoClose: 500, theme: 'colored' })
            }
            else if (!emailRegex.test(userDetails.email)) {
                toast.error("Please enter valid email", { autoClose: 500, theme: 'colored' })
            }
            else if (!phoneRegex.test(userDetails.phoneNumber)) {
                toast.error("Please enter a valid phone number", { autoClose: 500, theme: 'colored' })
            }
            else if (!userDetails.address) {
                toast.error("Please add address", { autoClose: 500, theme: 'colored' })
            }
            else if (!userDetails.city) {
                toast.error("Please add city", { autoClose: 500, theme: 'colored' })
            }
            else if (!userDetails.zipCode) {
                toast.error("Please enter valid Zip code", { autoClose: 500, theme: 'colored' })
            }
            else if (!userDetails.userState) {
                toast.error("Please add state", { autoClose: 500, theme: 'colored' })
            }
            else {
                const { data } = await updateCustomer({
                    variables: {
                        firstname: userDetails.firstName,
                        lastname: userDetails.lastName,
                        email: userDetails.email,
                        // addresses: [
                        //     {
                        //         street: [userDetails.address],
                        //         city: userDetails.city,
                        //         region: {
                        //             region: userDetails.userState
                        //         },
                        //         postcode: userDetails.zipCode,
                        //         telephone: userDetails.phoneNumber,
                        //     },
                        // ],
                    },
                });

                if (data) {
                    // Handle successful update
                    toast.success('Updated Successfully', { autoClose: 500, theme: 'colored' });
                }
            }
        } catch (error) {
            console.error('Error updating customer:', error.message);
            toast.error('Something went wrong', { autoClose: 500, theme: 'colored' });
        }
    };

    const handleDeleteAccount = () => {
        setOpenConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const { data } = await deleteCustomer({
                variables: {
                    email: userDetails.email,
                    password: userPassword,
                },
            });

            if (data && data.deleteCustomerAccount.customer) {
                // Handle successful account deletion
                console.log('Customer deleted:', data.deleteCustomerAccount.customer);
                toast.success('Account deleted successfully', { autoClose: 500, theme: 'colored' });

                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error deleting customer account:', error);
            toast.error('Something went wrong', { autoClose: 500, theme: 'colored' });
        }

        setOpenConfirmation(false);
        setUserPassword('');
    };
    return (
        <>
            <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 10 }}>
                <Typography variant='h6' sx={{ margin: '30px 0', fontWeight: 'bold', color: '#1976d2' }}>Personal Information</Typography>
                <form noValidate autoComplete="off" className={styles.checkout_form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="First Name" name='firstName' value={userDetails.firstName || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Last Name" name='lastName' value={userDetails.lastName || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Contact Number" type='tel' name='phoneNumber' value={userDetails.phoneNumber || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Email" name='email' value={userDetails.email || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Address" name='address' value={userDetails.address || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="City" name='city' value={userDetails.city || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField type='tel' label="Postal/Zip Code" name='zipCode' value={userDetails.zipCode || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Province/State" name='userState' value={userDetails.userState || ''} onChange={handleOnchange} variant="outlined" fullWidth />
                        </Grid>
                    </Grid>
                    <Container sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 5 }}>
                        <Button variant='contained' endIcon={<TiArrowBackOutline />} onClick={() => navigate(-1)} >Back</Button>
                        <Button variant='contained' endIcon={<AiOutlineFileDone />} type='submit'>Save</Button>
                    </Container>
                </form >
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: "25px 0", width: '100%' }}>
                    <Typography variant='h6'>Delete Your Account?</Typography>
                    <Button variant='contained' color='error' endIcon={<AiFillDelete />} onClick={() => setOpenConfirmation(true)}>Delete</Button>
                </Box>
                <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
                    <DialogTitle>Confirm Account Deletion</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Password"
                            type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenConfirmation(false)}>Cancel</Button>
                        <Button onClick={handleConfirmDelete} color="error">
                            Delete Account
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container >
        </>
    )
}

export default UpdateDetails