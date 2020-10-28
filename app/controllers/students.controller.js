const bcrypt = require('bcrypt')
const Student = require('../models/Student')
const isUnique = require('../utils/is-unique')
const studentValidator = require('../validators/student-validator')
const createValidationErrorResponse = require('../utils/create-validation-err-response')

exports.getStudents = () => async (req, res) => {
  try {
    const students = await Student.find().select([
      'name', '_id', 'email', 'photo', 'createdAt'
    ]).exec();
    res.json({ status: 'success', data: students });
  } catch (error) {
    res.json({ status: 'failure', message: error.message })
  }
}

exports.createStudent = () => async (req, res) => {
  try {
    const fields = req.form.fields
    const result = studentValidator(fields);

    if (result.error) {
      return res.json(createValidationErrorResponse(result.error))
    }

    if (!(await isUnique(Student, 'email', fields.email))) {
      return res.json({
        status: 'failure',
        data: { errors: { email: 'Email is already registered' } }
      })
    }

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(fields.password, salt);

    const student = await Student.create({
      name: { first: fields.firstName, last: fields.lastName },
      email: fields.email,
      photo: '',
      password: hash
    });

    res.json({ status: 'success', data: student });
  } catch (error) {
    res.json({ status: 'failure', message: error.message })
  }
}
