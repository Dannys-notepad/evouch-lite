const Joi = require('joi')


// SIGNUP SCHEMA
exports.signupSchema = async (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(50).required(),
    lastName: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string().trim().email().required(),
  })
  
  const { error } = schema.validate(req.body, {abortEarly: false})
  if (error) {
    const errors = error.details.map(err => ({
      field: err.context.key,
      message: err.message.replace(/['"]/g, '')
    }));
    
    return res.status(400).json({ errors });
  }
  next()
}


// SIGNIN SCHEMA
exports.signinSchema = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
  })
  
  const { error } = schema.validate(req.body, {abortEarly: false})
  if (error) {
    const errors = error.details.map(err => ({
      field: err.context.key,
      message: err.message.replace(/['"]/g, '')
    }));
    
    return res.status(400).json({ errors });
  }
  next()
}