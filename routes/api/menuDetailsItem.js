const {Router} = require('express');
let menuDetails = require('./../../menuDetails');

const router = Router();

//add item[create]

router.post('/', async (req, res) => {
    let newItem = new menuDetails(req.body);
    newItem.itemName = req.body.name;
    newItem.itemPrice = req.body.price;
    try {
        const menuListItem = await newItem.save()
        if (!newItem) throw new Error('Something went wrong saving the Menu Details')
        res.status(200).json(newItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//fetch item data[read]
router.get('/', async (req,res)=>{
    try {
        const menu = await menuDetails.find();
        if (!menu) {
            throw new Error('Items list is blank');
        }
        res.status(200).json(menu)
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

//update item[update]
router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await menuDetails.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//delete item[delete]
router.delete('/:id',(req,res)=>{
    let query = {_id:req.params.id}

    menuDetails.deleteOne(query,(err)=>{
        if (err) {
            res.send("Error while deleting selected data.");
        }else{
            res.send("Selected item deleted successfully");
        }
    });
});

module.exports = router