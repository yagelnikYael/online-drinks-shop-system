import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddProductModal } from './AddProductModal'
import axios from 'axios';
import { deleteProduct } from './ProductSlice';
import AddIcon from '@mui/icons-material/Add';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField,
    Modal
} from '@mui/material';
import {
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Box,
    CardActions,
    Button,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Fab,
    Badge,
    Drawer,
    IconButton,
    Divider
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { addItem, removeItem, clearCart } from '../cart/CartSlice';
import { useLocation } from 'react-router-dom';

const ProductPage = ({ onOpenLogin }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedConeTypes, setSelectedConeTypes] = useState({});
    const [selectedScoopCounts, setSelectedScoopCounts] = useState({});
    const [selectedExtras, setSelectedExtras] = useState({});
    const [selectedDrinkSizes, setSelectedDrinkSizes] = useState({});
    const [selectedIceOptions, setSelectedIceOptions] = useState({});
    const [selectedWhippedCream, setSelectedWhippedCream] = useState({});
    const [selectedDoubleChocolate, setSelectedDoubleChocolate] = useState({});
    const [selectedShakeBase, setSelectedShakeBase] = useState({});
    const [selectedIceBase, setSelectedIceBase] = useState({});
    const [selectedIceSize, setSelectedIceSize] = useState({});
    const [openCart, setOpenCart] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [addCategory, setAddCategory] = useState("ice cream");

    const location = useLocation(); // מופע של useLocation לקבלת פרמטרי ה-URL
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const currentUser = useSelector((state) => state.login.currentUser);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/product');
                setProducts(response.data);
                setLoading(false);

                const initialConeTypes = response.data
                    .filter(product => product.name === 'ice cream')
                    .reduce((acc, product) => {
                        acc[product.id] = 'אמריקאי';
                        return acc;
                    }, {});
                setSelectedConeTypes(initialConeTypes);

                const initialScoopCounts = response.data
                    .filter(product => product.name === 'ice cream')
                    .reduce((acc, product) => {
                        acc[product.id] = "כדור 1";
                        return acc;
                    }, {});
                setSelectedScoopCounts(initialScoopCounts);

                const initialExtras = response.data
                    .filter(product => product.name === 'ice cream')
                    .reduce((acc, product) => {
                        acc[product.id] = '';
                        return acc;
                    }, {});
                setSelectedExtras(initialExtras);

                const initialDrinkSizes = response.data
                    .filter(product => product.name === 'drinks')
                    .reduce((acc, product) => {
                        acc[product.id] = 'M';
                        return acc;
                    }, {});
                setSelectedDrinkSizes(initialDrinkSizes);

                const initialIceOptions = response.data
                    .filter(product => product.name === 'drinks')
                    .reduce((acc, product) => {
                        acc[product.id] = 'עם קרח';
                        return acc;
                    }, {});
                setSelectedIceOptions(initialIceOptions);
                const initialWhippedCream = response.data
                    .filter(product => product.name === 'shakes')
                    .reduce((acc, product) => {
                        acc[product.id] = false;
                        return acc;
                    }, {});
                setSelectedWhippedCream(initialWhippedCream);

                const initialDoubleChocolate = response.data
                    .filter(product => product.name === 'shakes')
                    .reduce((acc, product) => {
                        acc[product.id] = false;
                        return acc;
                    }, {});
                setSelectedDoubleChocolate(initialDoubleChocolate);

                const initialShakeBase = response.data
                    .filter(product => product.name === 'shakes')
                    .reduce((acc, product) => {
                        acc[product.id] = 'יוגורט';
                        return acc;
                    }, {});
                setSelectedShakeBase(initialShakeBase);
                const initialIceBase = response.data
                    .filter(product => product.name === 'ices')
                    .reduce((acc, product) => {
                        acc[product.id] = 'חלב';
                        return acc;
                    }, {});
                setSelectedIceBase(initialIceBase);

                const initialIceSize = response.data
                    .filter(product => product.name === 'ices')
                    .reduce((acc, product) => {
                        acc[product.id] = 'M';
                        return acc;
                    }, {});
                setSelectedIceSize(initialIceSize);


            } catch (err) {
                console.error('שגיאה בטעינת המוצרים:', err);
                setError('אירעה שגיאה בטעינת המוצרים. אנא נסה שוב מאוחר יותר.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const hash = location.hash;
        if (hash) {
            const elementId = hash.substring(1); // מוריד את ה-#
            const element = document.getElementById(elementId);
            if (element) {
                setTimeout(() => {
                    const offset = 100; // מרווח מהחלק העליון
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }, [location.hash]);


    const handleConeTypeChange = (productId, value) => {
        setSelectedConeTypes(prev => ({ ...prev, [productId]: value }));
    };

    const handleScoopCountChange = (productId, value) => {
        setSelectedScoopCounts(prev => ({ ...prev, [productId]: value }));
    };

    const handleExtrasChange = (productId, value) => {
        setSelectedExtras(prev => ({ ...prev, [productId]: value }));
    };
    const handleDrinkSizeChange = (productId, value) => {
        setSelectedDrinkSizes(prev => ({ ...prev, [productId]: value }));
    };

    const handleIceOptionChange = (productId, value) => {
        setSelectedIceOptions(prev => ({ ...prev, [productId]: value }));
    };
    const handleWhippedCreamChange = (productId, value) => {
        setSelectedWhippedCream(prev => ({ ...prev, [productId]: value }));
    };

    const handleDoubleChocolateChange = (productId, value) => {
        setSelectedDoubleChocolate(prev => ({ ...prev, [productId]: value }));
    };

    const handleShakeBaseChange = (productId, value) => {
        setSelectedShakeBase(prev => ({ ...prev, [productId]: value }));
    };
    const handleIceBaseChange = (productId, value) => {
        setSelectedIceBase(prev => ({ ...prev, [productId]: value }));
    };

    const handleIceSizeChange = (productId, value) => {
        setSelectedIceSize(prev => ({ ...prev, [productId]: value }));
    };

    const handleRemoveItem = (index) => {
        dispatch(removeItem(index));
    };

    const calculateTotal = () => {
        return cart.items.reduce((total, item) => total + item.finalPrice, 0);
    };

    const productsByCategory = products.reduce((acc, product) => {
        if (!acc[product.name]) {
            acc[product.name] = [];
        }
        acc[product.name].push(product);
        return acc;
    }, {});

    if (loading) {
        return (
            <Container sx={{ textAlign: 'center', mt: 5 }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ mt: 2, color: "#2b4f3f" }}>... טוען מוצרים</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ textAlign: 'center', mt: 5, }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Container>
        );
    }

    const calculateFinalPrice = (product) => {

        let finalPrice = product.price;
        if (product.name === 'ice cream') {
            const scoops = selectedScoopCounts[product.id] || 1;
            if (scoops === "כדורים 2") finalPrice += 10;
            else if (scoops === "כדורים 3") finalPrice += 17;

            const extra = selectedExtras[product.id];
            if (extra) finalPrice += 3;

        }

        if (product.name === 'drinks') {
            const size = selectedDrinkSizes[product.id];
            if (size === 'S') finalPrice += 10;
            else if (size === 'L') finalPrice += 20;
            else finalPrice += 15
        }

        if (product.name === 'shakes') {
            if (selectedWhippedCream[product.id]) {
                finalPrice += 3;
            }
            if (selectedDoubleChocolate[product.id]) {
                finalPrice += 5;
            }
        }

        if (product.name === 'ices') {
            const size = selectedIceSize[product.id];
            if (size === 'S') finalPrice += 6;
            else if (size === 'L') finalPrice += 18;
            else finalPrice += 12;
        }

        return finalPrice;
    }
    const getSelectedToppings = (productId) => {
        const toppings = [];
        if (selectedConeTypes[productId]) toppings.push(selectedConeTypes[productId]);
        if (selectedIceSize[productId]) toppings.push(selectedIceSize[productId]);
        if (selectedDoubleChocolate[productId]) toppings.push(selectedDoubleChocolate[productId]);
        if (selectedIceBase[productId]) toppings.push(selectedIceBase[productId]);
        if (selectedShakeBase[productId]) toppings.push(selectedShakeBase[productId]);
        if (selectedWhippedCream[productId]) toppings.push(selectedWhippedCream[productId]);
        if (selectedIceOptions[productId]) toppings.push(selectedIceOptions[productId]);
        if (selectedExtras[productId]) toppings.push(selectedExtras[productId]);
        if (selectedScoopCounts[productId] && selectedScoopCounts[productId] !== 'כדור 1') {
            toppings.push(selectedScoopCounts[productId]);
        }
        if (selectedDrinkSizes[productId]) toppings.push(selectedDrinkSizes[productId]);

        return toppings.filter(Boolean);
    }
    const adminDeleteItem = async (id) => {
        dispatch(deleteProduct(id));
        setProducts((prevProducts) => prevProducts.filter(p => p.id !== id));
    };
    const adminUpdatingProduct = async (id, updatedData) => {
        try {
            const response = await axios.put(`/api/product/${id}`, updatedData);
            // עדכון ה-state אחרי הצלחה
            setProducts(prevProducts => prevProducts.map(p => p.id === id ? response.data : p));
        } catch (error) {
            console.error('שגיאה בעדכון מוצר:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const newProduct = {
            name: addCategory,
            description: form.description.value,
            price: parseFloat(form.price.value),
            imgUrl: form.imgUrl.value,
        };

        try {
            await axios.post("/api/product", newProduct);
            alert("המוצר נוסף בהצלחה!");
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            setShowAddProductModal(false);
            form.reset();
            setAddCategory("ice cream");
        } catch (err) {
            console.error(err);
            alert("שגיאה בהוספת המוצר");
        }
    };

    return (
        <Container dir="rtl" sx={{ mt: 4, mb: 4 }} >
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: " #2b4f3f", fontWeight: 700, fontSize: "60px" }}>
                המוצרים שלנו
            </Typography>
            <AddProductModal
                open={showAddProductModal}
                handleClose={() => setShowAddProductModal(false)}
                handleSubmit={handleSubmit}
                addCategory={addCategory}
                setAddCategory={setAddCategory}
            />
            {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
                <Box
                    key={category}
                    id={category === 'ice cream' ? 'ice-cream' : category}
                    sx={{
                        mb: 5,
                        scrollMarginTop: '100px' // מוסיף מרווח לגלילה
                    }}
                >
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: " #2b4f3f" }}>
                        {category === 'ice cream' ? 'גלידות' :
                            category === 'drinks' ? 'משקאות קלים' :
                                category === 'shakes' ? 'שייקים' :
                                    category === 'ices' ? 'אייסים' : category}
                    </Typography>

                    <Stack spacing={2}>
                        {categoryProducts.map((product) => (
                            <Card key={product.id} sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textAlign: 'right',
                                p: 1,
                                minHeight: 120
                            }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        objectFit: 'contain',
                                        flexShrink: 0,
                                        ml: 1
                                    }}
                                    image={`http://localhost:4000${product.imgUrl}`}
                                    alt={product.description}
                                />
                                <CardContent sx={{ flexGrow: 1, py: '16px !important' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexGrow: 1, mr: 2 }}>
                                        <CardContent sx={{ flexGrow: 1, p: 0, '&:last-child': { pb: 0 } }}>
                                            <Typography gutterBottom variant="h6" component="h3" sx={{ mb: 0.5 }}>
                                                {product.description}
                                            </Typography>
                                            <Typography variant="h6" color="#2b4f3f" >
                                                ₪{product.price.toFixed(2)}
                                            </Typography>
                                        </CardContent>
                                        {!currentUser || currentUser.username !== "admin" ? <>
                                            {product.name === 'ice cream' && (
                                                <Box sx={{ display: 'flex', gap: 2 }}>
                                                    <FormControl size="small" sx={{ minWidth: 120 }}>
                                                        <InputLabel id={`cone-type-label-${product.id}`}>סוג גביע</InputLabel>
                                                        <Select
                                                            labelId={`cone-type-label-${product.id}`}
                                                            id={`cone-type-select-${product.id}`}
                                                            value={selectedConeTypes[product.id] || 'אמריקאי'}
                                                            label="סוג גביע"
                                                            onChange={(e) => handleConeTypeChange(product.id, e.target.value)}
                                                        >
                                                            <MenuItem value="אמריקאי">אמריקאי</MenuItem>
                                                            <MenuItem value="משולש">משולש</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl size="small" sx={{ minWidth: 120 }}>
                                                        <InputLabel id={`scoop-count-label-${product.id}`}>כמות כדורים</InputLabel>
                                                        <Select
                                                            labelId={`scoop-count-label-${product.id}`}
                                                            id={`scoop-count-select-${product.id}`}
                                                            value={selectedScoopCounts[product.id] || "כדור 1"}
                                                            label="כמות כדורים"
                                                            onChange={(e) => handleScoopCountChange(product.id, e.target.value)}
                                                        >
                                                            <MenuItem value="כדור 1">1 - 0₪</MenuItem>
                                                            <MenuItem value="כדורים 2">2 - 10₪</MenuItem>
                                                            <MenuItem value="כדורים 3">3 - 17₪</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl size="small" sx={{ minWidth: 120 }}>
                                                        <InputLabel id={`extras-label-${product.id}`}>תוספות - 3₪</InputLabel>
                                                        <Select
                                                            labelId={`extras-label-${product.id}`}
                                                            id={`extras-select-${product.id}`}
                                                            value={selectedExtras[product.id] || ''}
                                                            label="תוספות - 3₪"
                                                            onChange={(e) => handleExtrasChange(product.id, e.target.value)}
                                                        >
                                                            <MenuItem value="">ללא</MenuItem>
                                                            <MenuItem value="שוקולדים">שוקולדים</MenuItem>
                                                            <MenuItem value="עוגיות">עוגיות</MenuItem>
                                                            <MenuItem value="סוכריות">סוכריות</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                </Box>
                                            )}
                                            {product.name === 'drinks' && (
                                                <Box sx={{ display: 'flex', gap: 2 }}>
                                                    <FormControl size="small" sx={{ minWidth: 100, ml: 2 }}>
                                                        <InputLabel id={`drink-size-label-${product.id}`}>גודל</InputLabel>
                                                        <Select
                                                            labelId={`drink-size-label-${product.id}`}
                                                            id={`drink-size-select-${product.id}`}
                                                            value={selectedDrinkSizes[product.id] || 'M'}
                                                            label="גודל"
                                                            onChange={(e) => handleDrinkSizeChange(product.id, e.target.value)}
                                                        >
                                                            <MenuItem value="S">S - 10₪</MenuItem>
                                                            <MenuItem value="M">M - 15₪</MenuItem>
                                                            <MenuItem value="L">L - 20₪</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl size="small" sx={{ minWidth: 100 }}>
                                                        <InputLabel id={`ice-option-label-${product.id}`}>קרח</InputLabel>
                                                        <Select
                                                            labelId={`ice-option-label-${product.id}`}
                                                            id={`ice-option-select-${product.id}`}
                                                            value={selectedIceOptions[product.id] || 'עם קרח'}
                                                            label="קרח"
                                                            onChange={(e) => handleIceOptionChange(product.id, e.target.value)}
                                                        >
                                                            <MenuItem value="עם קרח">עם קרח</MenuItem>
                                                            <MenuItem value="בלי קרח">בלי קרח</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            )}
                                            {product.name === 'shakes' && (
                                                <Box sx={{ display: 'flex', gap: 2 }}>
                                                    <FormControl size="small" sx={{ minWidth: 140 }}>
                                                        <InputLabel id={`shake-base-label-${product.id}`}>בסיס</InputLabel>
                                                        <Select
                                                            labelId={`shake-base-label-${product.id}`}
                                                            id={`shake-base-select-${product.id}`}
                                                            value={selectedShakeBase[product.id] || 'יוגורט'}
                                                            label="בסיס"
                                                            onChange={(e) => handleShakeBaseChange(product.id, e.target.value)}
                                                        >
                                                            <MenuItem value="יוגורט">יוגורט</MenuItem>
                                                            <MenuItem value="חלב">חלב</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl size="small" sx={{ minWidth: 140 }}>
                                                        <InputLabel id={`whipped-cream-label-${product.id}`}>קצפת</InputLabel>
                                                        <Select
                                                            labelId={`whipped-cream-label-${product.id}`}
                                                            id={`whipped-cream-select-${product.id}`}
                                                            value={selectedWhippedCream[product.id] ? 'כן' : 'לא'}
                                                            label="קצפת"
                                                            onChange={(e) => handleWhippedCreamChange(product.id, e.target.value === 'כן' ? 'עם קצפת' : null)}
                                                        >
                                                            <MenuItem value="לא">לא</MenuItem>
                                                            <MenuItem value="כן">כן - 3₪</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl size="small" sx={{ minWidth: 140 }}>
                                                        <InputLabel id={`double-choco-label-${product.id}`}>כפול שוקולד</InputLabel>
                                                        <Select
                                                            labelId={`double-choco-label-${product.id}`}
                                                            id={`double-choco-select-${product.id}`}
                                                            value={selectedDoubleChocolate[product.id] ? 'כן' : 'לא'}
                                                            label="כפול שוקולד"
                                                            onChange={(e) => handleDoubleChocolateChange(product.id, e.target.value === 'כן' ? 'כפול שוקולד' : null)}
                                                        >
                                                            <MenuItem value="לא">לא</MenuItem>
                                                            <MenuItem value="כן">כן - 5₪</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            )}
                                            {product.name === 'ices' && (
                                                <Box sx={{ display: 'flex', gap: 2 }}>
                                                    <FormControl size="small" sx={{ minWidth: 140 }}>
                                                        <InputLabel id={`ice-base-label-${product.id}`}>בסיס</InputLabel>
                                                        <Select
                                                            labelId={`ice-base-label-${product.id}`}
                                                            id={`ice-base-select-${product.id}`}
                                                            value={selectedIceBase[product.id] || 'חלב'}
                                                            label="בסיס"
                                                            onChange={(e) => handleIceBaseChange(product.id, e.target.value)}
                                                        >
                                                            <MenuItem value="חלב">חלב</MenuItem>
                                                            <MenuItem value="סויה">סויה</MenuItem>
                                                            <MenuItem value="מים">מים</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl size="small" sx={{ minWidth: 140 }}>
                                                        <InputLabel id={`ice-size-label-${product.id}`}>גודל</InputLabel>
                                                        <Select
                                                            labelId={`ice-size-label-${product.id}`}
                                                            id={`ice-size-select-${product.id}`}
                                                            value={selectedIceSize[product.id] || 'M'}
                                                            label="גודל"
                                                            onChange={(e) => handleIceSizeChange(product.id, e.target.value)}
                                                        >
                                                            <MenuItem value="S">S - 6₪</MenuItem>
                                                            <MenuItem value="M">M - 12₪</MenuItem>
                                                            <MenuItem value="L">L - 18₪</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            )}
                                        </> : null}
                                    </Box>
                                </CardContent>

                                <CardActions sx={{ flexShrink: 0 }}>
                                    {!currentUser || currentUser.username !== "admin" ? <Button
                                        size="medium"
                                        variant="contained"
                                        onClick={() => {
                                            const price = calculateFinalPrice(product);
                                            const selectedToppings = getSelectedToppings(product.id);
                                            dispatch(addItem({ product, finalPrice: price, toppings: selectedToppings }));
                                        }}
                                        sx={{
                                            bgcolor: '#2B4F3F',
                                            '&:hover': {
                                                bgcolor: '#1e3a2d'
                                            }
                                        }}
                                    >
                                        הוסף לסל
                                    </Button> : <Button size="medium"
                                        variant="contained" sx={{
                                            bgcolor: '#2B4F3F',
                                            '&:hover': {
                                                bgcolor: '#1e3a2d'
                                            }
                                        }} onClick={() => {
                                            setCurrentProductId(product.id);
                                            setNewName(product.description);
                                            setNewPrice(product.price);
                                            setOpenModal(true);
                                        }}>
                                        עדכון מוצר
                                    </Button>}
                                    {currentUser && currentUser.username === "admin" ? <Button size="medium"
                                        variant="contained" sx={{
                                            bgcolor: '#2B4F3F',
                                            marginRight: "10px",
                                            '&:hover': {
                                                bgcolor: '#1e3a2d'
                                            }
                                        }} onClick={() => { adminDeleteItem(product.id) }}>מחיקת מוצר</Button> : null}

                                </CardActions>
                            </Card>
                        ))}
                    </Stack>
                </Box>
            ))}

            <Fab
                color="primary"
                aria-label="cart"
                onClick={() => { if (!currentUser || currentUser.username !== "admin") setOpenCart(true); else setShowAddProductModal(true); }}
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 1000,
                    bgcolor: '#2B4F3F',
                    '&:hover': {
                        bgcolor: '#1e3a2d'
                    }
                }}
            >
                <Badge badgeContent={cart.items.length} color="error">
                    {currentUser && currentUser.username === "admin" ? <AddIcon /> : <ShoppingCartIcon />}
                </Badge>
            </Fab>

            <Drawer
                anchor="left"
                open={openCart}
                onClose={() => setOpenCart(false)}
                PaperProps={{
                    sx: {
                        width: 400,
                        p: 2
                    }
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" component="h2" fontWeight="bold">
                        סל הקניות
                    </Typography>
                    <IconButton onClick={() => setOpenCart(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />

                {cart.items.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            הסל ריק
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Stack spacing={2}>
                            {cart.items.map((item, index) => (
                                <Card key={index} elevation={1}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box
                                                    component="img"
                                                    src={`http://localhost:4000${item.product.imgUrl}`}
                                                    alt={item.product.description}
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        objectFit: 'contain',
                                                        borderRadius: 1
                                                    }}
                                                />
                                                <Box>
                                                    <Typography variant="subtitle1" fontWeight="medium">
                                                        {item.product.description}
                                                    </Typography>
                                                    {item.toppings && item.toppings.length > 0 && (
                                                        <Typography variant="body2" color="text.secondary">
                                                            {item.toppings.filter(Boolean).join(', ')}
                                                        </Typography>
                                                    )}
                                                    <Typography variant="subtitle1" color="#2b4f3f" fontWeight="bold">
                                                        ₪{item.finalPrice.toFixed(2)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <IconButton onClick={() => handleRemoveItem(index)} color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                        <Box sx={{ mt: 3, p: 2, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" color="#2b4f3f" fontWeight="bold">
                                ₪{calculateTotal().toFixed(2)}
                            </Typography>
                            <Typography variant="h6" fontWeight="bold" >
                                :סך הכל
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 2,
                                bgcolor: '#2B4F3F',
                                '&:hover': {
                                    bgcolor: '#1e3a2d'
                                }
                            }}
                            onClick={() => {
                                if (!currentUser) {
                                    onOpenLogin();
                                    return;
                                }
                                else {
                                    dispatch(clearCart());
                                    setOpenCart(false);
                                    alert('ההזמנה נשלחה בהצלחה!');
                                }
                            }}
                            disabled={cart.items.length === 0}
                        >
                            לתשלום
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                                mt: 1, color: "#1a3328",
                                borderColor: "#1a3328",
                                backgroundColor: "#ffffff",
                                border: "1px solid",
                                '&:hover': {
                                    backgroundColor: "#e8f5e9",
                                }
                            }}
                            onClick={() => dispatch(clearCart())}
                            disabled={cart.items.length === 0}
                        >
                            נקה סל
                        </Button>
                    </>
                )}
            </Drawer>
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>עדכון מוצר</DialogTitle>
                <DialogContent>
                    <TextField
                        label="שם חדש"
                        fullWidth
                        margin="normal"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <TextField
                        label="מחיר חדש"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>ביטול</Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            adminUpdatingProduct(currentProductId, {
                                description: newName,
                                price: Number(newPrice)
                            });
                            setOpenModal(false);
                        }}
                    >
                        שמור שינויים
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
};

export default ProductPage;
