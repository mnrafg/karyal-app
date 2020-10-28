module.exports = error => {
  let messages = []

  if (error.details) {
    messages = error.details.map(msg => ({
      [msg.context.key]: msg.message
    }))
  }

  return {
    status: 'failure',
    data: { errors: messages }
  }
}
