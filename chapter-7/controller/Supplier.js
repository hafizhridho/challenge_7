const { Supplier } = require('../models');

module.exports = {
  create: async (req, res, next) => {
    try {
      const { nama_supplier, alamat } = req.body;

      const createdSupplier = await Supplier.create({
        nama_supplier: nama_supplier,
        alamat: alamat
      });

      return res.status(201).json({
        status: true,
        message: 'Data supplier berhasil ditambahkan',
        data: createdSupplier
      });
    } catch (error) {
      next(error);
    }
  },

  index: async (req, res, next) => {
    try {
      const dataSupplier = await Supplier.findAll();

      return res.status(200).json({
        status: true,
        message: 'Data supplier berhasil ditemukan',
        data: dataSupplier
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const { id } = req.params;

      const supplier = await Supplier.findByPk(id);

      if (!supplier) {
        return res.status(404).json({
          status: false,
          message: `Supplier dengan ID ${id} tidak ditemukan`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Data supplier berhasil ditemukan',
        data: supplier
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nama_supplier, alamat } = req.body;

      const updatedSupplier = await Supplier.update(
        { nama_supplier, alamat },
        { where: { id } }
      );

      if (updatedSupplier[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Supplier dengan ID ${id} tidak ditemukan`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Data supplier berhasil diperbarui',
        data: null
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedSupplier = await Supplier.destroy({
        where: { id }
      });

      if (!deletedSupplier) {
        return res.status(404).json({
          status: false,
          message: `Supplier dengan ID ${id} tidak ditemukan`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Data supplier berhasil dihapus',
        data: null
      });
    } catch (error) {
      next(error);
    }
  }
};
