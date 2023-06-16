const person = require('../models/person');

exports.addPerson = async (req, res) => {
    try {
        const {name, age, favoriteFoods} = req.body
        const newPerson = new person({
            ...req.body
        })
        await newPerson.save()
        res.status(200).send({msg: 'person added successfully', newPerson})

    } catch (error) {
        res.status(500).send({msg: 'add person failed', error})

    }
}
exports.getallPersons = async (req, res) => {
    try {
        const Persons = await person.find()
        res.status(200).send({msg: 'Person found successfully', Persons})
    } catch (error) {
        res.status(500).send({msg: 'find person failed', error})
    }
}
exports.getOnePerson = async (req, res) => {
    try {
        const Persons = await person.findOne(req.body)
        Persons ? res.status(200).send({msg: 'Person founded successfully', Persons}) : res.status(400).send({msg: 'person not found'})
    } catch (error) {
        res.status(500).send({msg: 'person not exist', error})
    }
}

exports.getPersonById = async (req, res) => {
    try {
        const {_id} = req.params
        const Persons = await person.findById(req.params)
        Persons ? res.status(200).send({msg: 'Person found successfully', Persons}) : res.status(400).send({msg: 'person not found'})
    } catch (error) {
        res.status(500).send({msg: 'person not exist', error})
    }
}
exports.getPersonByIdAndEdit = async (req, res) => {
    try {
        const {_id} = req.params
        const newPerson = req.body
        const persons = await person.updateOne({
            _id
        }, {$set: newPerson})
        if (! persons) {
            res.status(400).send({msg: 'person not found'})
        } else {
            res.status(200).send({msg: 'updated successfully'})
        }
    } catch (error) {
        res.status(400).send({msg: 'error on editing ', error})
    }
}
exports.deletePerson = async (req, res) => {
    try {
        const {_id} = req.params
        const persons = await person.findByIdAndDelete({_id})
        if (! persons) {
            res.status(400).send({msg: 'person not found'})
        } else {
            res.status(200).send({msg: 'removed successfully'})
        }
    } catch (error) {
        res.status(400).send({msg: 'error on deleting ', error})
    }
}

exports.Delete_m = async (req, res) => {
    try {
        const searched = req.body
        const persons = await person.remove(searched)
        if (! persons) {
            res.status(400).send({msg: 'person not found'})
        } else {
            res.status(200).send({msg: 'deleted successfully'})
        }
    } catch (error) {
        res.status(400).send({msg: 'error on get one & delete', error})
    }
}

exports.chainSearch = async (req, res) => {
    try {
        var foodToSearch = ["burrito"];
        const queryChain = await person.find({favoriteFoods: foodToSearch}).sort({name: "desc"}).limit(2).select("-age").exec((error, data) => {
            if (error) {
                done(err)
            }
            done(null, data)
        });;
        if (! queryChain) {
            res.status(400).send('not found')
        }
        res.status(200).send(queryChain)
    } catch (error) {
        res.status(400).send({msg: 'error on chain search', error})
    }
}
