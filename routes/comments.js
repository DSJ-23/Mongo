const express = require('express');
const router = express.Router();

const comments = require('../models/comment');

router.get('/', (req, res) => {
    comments.find()
    .then(all_comments => {
        res.json(all_comments)
    })
    .catch(err => {
        res.json(err)
    })
})

router.post("/", (req, res) => {
    let new_comment = new comments({
        text: req.body.text,
        author: req.body.author
    }) 
    new_comment.save()
    .then(new_thing => {
        res.json(new_thing)
    })
    .catch(err => {
        res.json(err)
    })
})

router.get("/:id", (req, res) => {
    comments.findById(req.params.id)
    .then(to => {
        res.json(to)
    })
    .catch(err => {
        res.json(err)
    })
})

router.delete("/:id", (req, res) => {
    comments.findOneAndDelete({_id: req.params.id})
    .then(to_delete => {
        res.json(to_delete)
    })
    .catch(err => {
        res.json(err)
    })
})

router.put("/:id", (req, res) => {

    comments.findByIdAndUpdate({_id: req.params.id}, {text: req.body.text})
    .then(updated => {
        console.log(updated)
        res.json(updated)
    })
    .catch( (err) => {
        res.json(err)
    })
})


module.exports = router;