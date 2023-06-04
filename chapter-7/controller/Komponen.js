const { Komponen } = require('../models');

module.exports = {
  create: async (req, res, next) => {
    try {
      const { nama_komponen, deskripsi } = req.body;

      const createdKomponen = await Komponen.create({
        nama_komponen: nama_komponen,
        deskripsi: deskripsi
      });

      return res.status(201).json({
        status: true,
        message: 'Data komponen berhasil ditambahkan',
        data: createdKomponen
      });
    } catch (error) {
      next(error);
    }
  },

  index: async (req, res, next) => {
    try {
      const dataKomponen = await Komponen.findAll();

      return res.status(200).json({
        status: true,
        message: 'Data komponen berhasil ditemukan',
        data: dataKomponen
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const { id } = req.params;

      const komponen = await Komponen.findByPk(id);

      if (!komponen) {
        return res.status(404).json({
          status: false,
          message: `Komponen dengan ID ${id} tidak ditemukan`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Data komponen berhasil ditemukan',
        data: komponen
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nama_komponen, deskripsi } = req.body;

      const updatedKomponen = await Komponen.update(
        { nama_komponen, deskripsi },
        { where: { id } }
      );

      if (updatedKomponen[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Komponen dengan ID ${id} tidak ditemukan`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Data komponen berhasil diperbarui',
        data: null
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedKomponen = await Komponen.destroy({
        where: { id }
      });

      if (!deletedKomponen) {
        return res.status(404).json({
          status: false,
          message: `Komponen dengan ID ${id} tidak ditemukan`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Data komponen berhasil dihapus',
        data: null
      });
    } catch (error) {
      next(error);
    }
  }
};
