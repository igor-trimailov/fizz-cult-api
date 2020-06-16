module.exports = {
  // add localhost fallbacks
  // prod: mongodb+srv://fizz-cult-root:Qe5QxqaALc8z8D51@cluster0-zl0je.mongodb.net/test?retryWrites=true&w=majority
  url: process.env.PROD_MONGODB || 'mongodb://127.0.0.1:27017/fizz-cult-db',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
}
