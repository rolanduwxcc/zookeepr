const router = require('express').Router();
const {filterByQuery, findById, createNewZookeeper, validateZookeeper} = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers.json');

router.get('/zookeepers', (req, res) => {
    // res.send('Meow!');
    let results = zookeepers;
    if (req.query) {
        console.log('route + ' + req.query);
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
})

//---------------------------------------------------POST REQs
router.post('/zookeepers', (req, res) => {
    //req.body is where our incoming content will be 
    // set id based on what the next index of the array will be
    req.body.id = zookeepers.length.toString();

    //if any data in req.body is incorrect, send 400 error back
    if (!validateZookeeper(req.body)) {
        res.status(400).send("The zoopkeeper is not properly formatted.");
    } else {
        //add animal to json file and animlas array to this function
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

module.exports = router;