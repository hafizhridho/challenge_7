const  {Produk}  = require('../models/');

module.exports = {
  create: async (req, res, next) => {
    try {
      const { nama, kuantitas } = req.body;

      const createdProduk = await Produk.create({
        nama: nama,
        kuantitas: kuantitas
      });

      return res.status(201).json({
        status: true,
        message: 'Data produk berhasil ditambahkan',
        data: createdProduk
      });
    } catch (error) {
      next(error);
    }
  },

  index: async (req, res, next) => {
    try {
      const dataProduk = await Produk.findAll();

      return res.status(200).json({
        status: true,
        message: 'Data produk berhasil ditemukan',
        data: dataProduk
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const { id } = req.params;

      const produk = await Produk.findByPk(id);

      if (!produk) {
        return res.status(404).json({
          status: false,
          message: `Produk dengan ID ${id} tidak ditemukan`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Data produk berhasil ditemukan',
        data: produk
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nama, kuantitas } = req.body;

      const updatedProduk = await Produk.update(
        { nama, kuantitas },
        { where: { id } }
      );

      if (updatedProduk[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Produk dengan ID ${id} tidak ditemukan`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Data produk berhasil diperbarui',
        data: null
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedProduk = await Produk.destroy({
        where: { id }
      });

      if (!deletedProduk) {
        return res.status(404).json({
          status: false,
          message: `Produk dengan ID ${id} tidak ditemukan`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Data produk berhasil dihapus',
        data: null
      });
    } catch (error) {
      next(error);
    }
  }
};
