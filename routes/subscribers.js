const express = require('express');
const router = express.Router();

const Subscriber = require('../models/subscriber')


router.get('/', async (req , res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.json({message: err.message})
    }
})

router.get('/:id', getSubscriber,  (req , res) => {
    res.json(res.subscriber)
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
        // console.log("new request")
        // console.log(single_sub)
        if (single_sub !== null) {
            res.json(single_sub)
        } else {
            res.status(404).json({ message: "Cannot find sub" })
        }
    })
    .catch( (err) => {
        res.status(500).json({ message: err.message })
    })
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