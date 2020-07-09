const express = require('express');
const router = express.Router();

const Subscriber = require('../models/subscriber')

router.get('/all', (req, res ) => {
    Subscriber.find()
    .then(all => {
        
        // all.testing('hello')
        // console.log(all.testing('hello'))
        res.json(all)
    })
    .catch(err => {
        res.json(err)
    })
})


router.get('/', async (req , res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.json({message: err.message})
    }
})

router.get('/:id',  (req , res) => {
    // Subscriber.findOne('_id': req.params.id)
    Subscriber.findById(req.params.id)
    .then(single_sub => {
        single_sub.testing()
        res.json(single_sub)
    })
    // res.json(res.subscriber)
})

router.post('/', async (req, res ) => {
    let sub = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await sub.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


router.put('/:id', (req, res) => {
    Subscriber.findById(req.params.id)
    .then( (single_sub) => {
        if (single_sub == null){
            res.json(false)
        } else {
            res.json(single_sub)
        }
        
    })
    .catch((err) => {res.json( { message: err.message }) })
})

router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Deleted Subscriber' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
}) 

async function getSubscriber(req, res, next ){
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        console.log(subscriber)
        if (subscriber == null){
            return res.status(404).json({ message: "Cannot find sub" })
        }
    } catch (err){
        return res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber
    next()
}



module.exports = router;