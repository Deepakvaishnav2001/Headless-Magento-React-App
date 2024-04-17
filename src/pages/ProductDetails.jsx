import '../_component/css/Products.css'
import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    Box,
    Button,
    Container,
    Tooltip,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Chip,
    Rating,
    ButtonGroup,
    Skeleton,
    IconButton,
} from '@mui/material';
import { MdAddShoppingCart } from 'react-icons/md'
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_SKU_QUERY } from '../_component/graphql/Query';
import { AiFillHeart, AiFillCloseCircle, AiOutlineLogin, AiOutlineShareAlt } from 'react-icons/ai'
import { TbDiscount2 } from 'react-icons/tb'
import axios from 'axios';
import { toast } from 'react-toastify';

const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

const ProductDetail = () => {
    const [openAlert, setOpenAlert] = useState(false);
    const [productQuantity, setProductQuantity] = useState(1)


    let authToken = localStorage.getItem('token')
    let setProceed = authToken ? true : false
    const param = useParams();
    const sku = param.id;
    console.log(param.id);
    const { loading, error, data } = useQuery(GET_PRODUCT_BY_SKU_QUERY, {
        variables: { sku: sku },
    });

    if (loading) return <></>;
    if (error) return <></>;

    const { products } = data;
    const product = products.items[0];
    /*  const addToCart = async (product) => {
         if (setProceed) {
             try {
 
 
                 const { data } = await axios.post(`${process.env.REACT_APP_ADD_CART}`, { _id: product._id, quantity: productQuantity }, {
                     headers: {
                         'Authorization': authToken
                     }
                 })
                 setCart(data)
                 setCart([...cart, product])
                 toast.success("Added To Cart", { autoClose: 500, theme: 'colored' })
             } catch (error) {
                 toast.error(error.response.data.msg, { autoClose: 500, theme: 'colored' })
             }
         }
         else {
             setOpenAlert(true);
         }
     }
     const addToWhishList = async (product) => {
         if (setProceed) {
             try {
                 const { data } = await axios.post(`${process.env.REACT_APP_ADD_WISHLIST}`, { _id: product._id }, {
                     headers: {
                         'Authorization': authToken
                     }
                 })
                 setWishlistData(data)
                 setWishlistData([...wishlistData, product])
                 toast.success("Added To Wishlist", { autoClose: 500, theme: 'colored' })
             }
             catch (error) {
                 toast.error(error.response.data.msg, { autoClose: 500, theme: 'colored' })
             }
         }
         else {
             setOpenAlert(true);
         }
 
     };
     const shareProduct = (product) => {
 
         const data = {
             text: product.name,
             title: "e-shopit",
             url: `https://e-shopit.vercel.app/Detail/type/${cat}/${id}`
         }
         if (navigator.canShare && navigator.canShare(data)) {
             navigator.share(data);
         }
         else {
             toast.error("browser not support", { autoClose: 500, theme: 'colored' })
         }
 
     }
     const getSimilarProducts = async () => {
         const { data } = await axios.post(`${process.env.REACT_APP_PRODUCT_TYPE}`, { userType: cat })
         setSimilarProduct(data)
     } */
    const increaseQuantity = () => {
        setProductQuantity((prev) => prev + 1)
        if (productQuantity >= 5) {
            setProductQuantity(5)
        }
    }
    const decreaseQuantity = () => {
        setProductQuantity((prev) => prev - 1)
        if (productQuantity <= 1) {
            setProductQuantity(1)
        }
    }
    return (
        <>
            <Container maxWidth='xl' >
                <Dialog
                    open={openAlert}
                    /* TransitionComponent={Transition} */
                    keepMounted
                    onClose={() => setOpenAlert(false)}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 } }}>
                        <DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-slide-description">
                            Please Login To Proceed
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Link to="/login"> <Button variant='contained' endIcon={<AiOutlineLogin />} color='primary'>Login</Button></Link>
                        <Button variant='contained' color='error'
                            onClick={() => setOpenAlert(false)} endIcon={<AiFillCloseCircle />}>Close</Button>
                    </DialogActions>
                </Dialog>

                <main className='main-content'>
                    {loading ? (
                        <Skeleton variant='rectangular' height={400} />
                    ) : (
                        <div className="product-image">
                            <div className='detail-img-box'  >
                                <img alt={product.name} src={product.image.url} className='detail-img' />
                                <br />
                            </div>
                        </div>
                    )}
                    {loading ? (
                        <section style={{ display: 'flex', flexWrap: "wrap", width: "100%", justifyContent: "space-around", alignItems: 'center' }}>
                            <Skeleton variant='rectangular' height={200} width="200px" />
                            <Skeleton variant='text' height={400} width={700} />

                        </section>

                    ) : (
                        <section className='product-details'>
                            <Typography variant='h4'>{product.name}</Typography>
                            <Typography variant='h6'>{stripHtmlTags(product.description.html)}</Typography>
                            <Chip
                                label={product.price_range.minimum_price.final_price.value > 1000 ? "Upto 9% off" : "Upto 38% off"}
                                variant="outlined"
                                sx={{ background: '#1976d2', color: 'white', width: '150px', fontWeight: 'bold' }}
                                avatar={<TbDiscount2 color='white' />}
                            />
                            <div style={{ display: 'flex', gap: 20 }}>
                                <Typography variant="h6" color="red"><s> ${product.price_range.minimum_price.final_price.value > 1000 ? product.price_range.minimum_price.final_price.value + 1000 : product.price_range.minimum_price.final_price.value + 300}</s> </Typography>
                                <Typography variant="h6" color="primary">
                                ${product.price_range.minimum_price.final_price.value}
                                </Typography>
                            </div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // background: 'red',
                                    '& > *': {
                                        m: 1,
                                    },
                                }}
                            >
                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                    <Button onClick={increaseQuantity}>+</Button>
                                    <Button>{productQuantity}</Button>
                                    <Button onClick={decreaseQuantity}>-</Button>
                                </ButtonGroup>
                            </Box>
                            {/* <Rating name="read-only" value={Math.round(product.rating)} readOnly precision={0.5} /> */}
                            <div style={{ display: 'flex' }} >
                                <Tooltip title='Add To Cart'>
                                    <Button variant='contained' className='all-btn' startIcon={<MdAddShoppingCart />} /* onClick={(() => addToCart(product))} */>Buy</Button>
                                </Tooltip>
                                <Tooltip title='Add To Wishlist'>
                                    <Button style={{ marginLeft: 10, }} size='small' variant='contained' className='all-btn' /* onClick={(() => addToWhishList(product))} */>
                                        {<AiFillHeart fontSize={21} />}
                                    </Button>

                                </Tooltip>
                                <Tooltip title='Share'>
                                    <Button style={{ marginLeft: 10 }} variant='contained' className='all-btn' startIcon={<AiOutlineShareAlt />} /* onClick={() => shareProduct(product)} */>Share</Button>
                                </Tooltip>

                            </div>
                        </section>

                    )}
                </main>
                {/* <ProductReview setProceed={setProceed} authToken={authToken} id={id} setOpenAlert={setOpenAlert} /> */}


                {/* <Typography sx={{ marginTop: 10, marginBottom: 5, fontWeight: 'bold', textAlign: 'center' }}>Similar Products</Typography>
                <Box>
                    <Box className='similarProduct' sx={{ display: 'flex', overflowX: 'auto', marginBottom: 10 }}>
                        {
                            similarProduct.filter(prod => prod._id !== id).map(prod => (
                                <Link to={`/Detail/type/${prod.type}/${prod._id}`} key={prod._id}>
                                    <ProductCard prod={prod} />
                                </Link>
                            ))
                        }
                    </Box>
                </Box> */}

            </Container >

        </>
    )
}

export default ProductDetail