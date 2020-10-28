const Class = require('../models/Class')
const classValidator = require('../validators/class-validator')
const createValidationErrorResponse = require('../utils/create-validation-err-response')

exports.getClasses = () => async (req, res) => {
  try {
    const classes = await Class.find().populate(['instructor', 'course']).exec()
    res.json({ status: 'success', data: classes })
  } catch (error) {
    res.json({ status: 'failure', message: error.message })
  }
}

exports.createClass = () => async (req, res) => {
  try {
    const fields = req.form.fields
    const result = classValidator(fields)

    if (result.error) {
      return res.json(createValidationErrorResponse(result.error))
    }

    const $class = await Class.create({
      course: fields.course,
      instructor: fields.instructor,
      fees: fields.fees,
      timing: fields.timing,
      startedAt: fields.startedAt,
      endingAt: fields.endingAt
    })

    res.json({ status: 'success', data: $class })
  } catch (error) {
    res.json({ status: 'failure', message: error.message })
  }
}
