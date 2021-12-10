//express
const express = require('express')
const app = express()
// port
const port = 3000
// handlebars
const exphbs = require('express-handlebars')
// json
const restaurants = require('./restaurant.json')

// // static resource
app.use(express.static('public'))

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurants.results })
})
app.get('/search', (req, res) => {
    // console.log(req.query.keyword)
    const restaurantList = restaurants.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
    })
    res.render('index', { restaurants: restaurantList ,keyword: req.query.keyword })
})

app.get('/restaurants/:restaurants_id', (req, res) => {
    const restaurantOne = restaurants.results.find(restaurant => {
        return restaurant.id.toString() === req.params.restaurants_id
    })
    res.render('page', { restaurant : restaurantOne })
})

app.listen(port, () => {
    console.log('this server is build on locallhost:3000')
})