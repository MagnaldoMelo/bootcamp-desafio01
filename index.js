const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

const AgeMiddleware = (req, res, next) => {
  const age = req.query.age

  if (!age) return res.redirect('/')

  return next()
}

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  const { age } = req.body
  const select = req.body.age >= 18 ? `/major?age=${age}` : `/minor?age=${age}`

  return res.redirect(select)
})

app.get('/minor', AgeMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.get('/major', AgeMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.listen(3000)
