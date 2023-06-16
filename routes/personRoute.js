const express = require('express');
const { addPerson, getallPersons, getOnePerson, getPersonById, getPersonByIdAndEdit, deletePerson, Delete_m, chainSearch } = require('../controllers/person');
const router = express.Router();
//add person
router.post('/addPerson', addPerson)
// get all persons 
router.get('/getallpersons', getallPersons)
// get one person
router.post('/getOnePerson', getOnePerson )
// get person by id
router.get('/getPersonById/:_id', getPersonById)
// get person by id and edit
router.post('/getPersonByIdAndEdit/:_id', getPersonByIdAndEdit)
// delete person
router.delete('/deletePerson/:_id', deletePerson)
// delete many persons
router.delete('/Delete_m', Delete_m)
//querychain
router.get('/chainSearch', chainSearch)

module.exports = router 