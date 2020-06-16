const ObjectId = require('mongoose').Types.ObjectId
const routineModel = require('../models/routine')

module.exports = {
  getById: function (req, res, next) {
    routineModel.aggregate(
      [
        { $match: { _id: ObjectId(req.params.routineId) } },
        {
          $unwind: '$exercises',
        },
        {
          $lookup: {
            from: 'exercises',
            localField: 'exercises.ref',
            foreignField: '_id',
            as: 'exercise_list',
          },
        },
        {
          $unwind: '$exercise_list',
        },
        {
          $project: {
            name: '$name',
            mergedList: {
              $mergeObjects: ['$exercise_list', '$exercises'],
            },
          },
        },
        {
          $group: {
            _id: '$_id',
            name: {
              $first: '$name',
            },
            exercises: {
              $push: '$mergedList',
            },
          },
        },
      ],
      function (err, routine) {
        if (err) {
          next(err)
        } else {
          res.json({
            status: 'success',
            message: 'routine found',
            data: { routine },
          })
        }
      },
    )
  },
  getAll: function (req, res, next) {
    routineModel.find({}, function (err, routines) {
      if (err) {
        next(err)
      } else {
        res.json({
          status: 'success',
          message: 'routines list found',
          data: { routines },
        })
      }
    })
  },

  updateById: function (req, res, next) {
    routineModel.findOneAndUpdate(
      {
        _id: req.params.routineId,
        created_by: req.body.userId,
      },
      {
        duration: req.body.duration,
        order: req.body.order,
        edited_on: new Date(),
      },
      function (err, dbRes) {
        if (err) {
          next(err)
        } else {
          if (dbRes && dbRes.updatedCount === 1) {
            res.json({
              status: 'success',
              message: 'routine updated successfully',
            })
          } else {
            res.json({
              status: 'error',
              message: 'routine was not updated',
            })
          }
        }
      },
    )
  },

  deleteById: function (req, res, next) {
    // make sure user only deletes their own routine
    routineModel.deleteOne(
      {
        _id: req.params.routineId,
        created_by: req.body.userId,
      },
      function (err, dbRes) {
        if (err) {
          next(err)
        } else {
          // parse db response
          if (dbRes && dbRes.deletedCount !== 1) {
            res.json({
              status: 'error',
              message: 'routine not found',
            })
          } else {
            res.json({
              status: 'success',
              message: 'routine deleted successfully',
            })
          }
        }
      },
    )
  },

  create: function (req, res, next) {
    routineModel.create(
      {
        created_by: req.body.userId,
        created_on: new Date(),
        name: req.body.name,
      },
      function (err, routine) {
        if (err) {
          next(err)
        } else {
          res.json({
            status: 'success',
            message: 'routine added successfully',
            data: routine,
          })
        }
      },
    )
  },
}
