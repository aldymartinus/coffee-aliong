const {Router} = require('express');
let cartDetails = require('../../cartDetails');

const router = Router();

//add item[create]

router.post('/', async (req, res) => {
    let newTransaction = new cartDetails(req.body);
    newTransaction.details = req.body.details;
    newTransaction.paid = req.body.paid;
    try {
        const transaction = await newTransaction.save()
        if (!newTransaction) throw new Error('Something went wrong saving the Record')
        res.status(200).json(newTransaction)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//fetch item data[read]
router.get('/', async (req,res)=>{
    try {
        const transactionRecord = await cartDetails.find();
        if (!transactionRecord) {
            throw new Error('Items list is blank');
        }
        res.status(200).json(transactionRecord)
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

module.exports = router