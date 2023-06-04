const express = require('express');
const router = express.Router();
const Produk = require('../controller/Produk');
const Komponen = require('../controller/Komponen');
const Supplier = require('../controller/Supplier');
const user = require('../controller/user');
const storage = require('../utils/storage');
const multer = require('multer')();

const media = require('../controller/media')

const middlewares = require('../utils/middlewares');


router.get('/', (req, res) => res.status(200).json({message: "selamat datang"}));


router.post('/produk', Produk.create);
router.get('/produk', Produk.index);
router.get('/produk/:id', Produk.show);
router.put('/produk/:id', Produk.update);
router.delete('/produk/:id', Produk.delete);


router.post('/komponen', Komponen.create);
router.get('/komponen', Komponen.index);
router.get('/komponen/:id', Komponen.show);
router.put('/komponen/:id', Komponen.update);
router.delete('/komponen/:id', Komponen.delete);


router.post('/supplier', Supplier.create);
router.get('/supplier', Supplier.index);
router.get('/supplier/:id', Supplier.show);
router.put('/supplier/:id', Supplier.update);
router.delete('/supplier/:id', Supplier.delete);

router.post('/register', user.register);
router.post('/login', user.login);
router.get('/whoami', middlewares.auth, user.whoami);


router.post('/storage/images', storage.image.single('media'), media.strogeSingle);
router.post('/storage/multi/images', storage.image.array('media'), media.storageArray);
router.post('/imagekit/upload', multer.single('media'), media.imagekitUpload);


module.exports = router;
