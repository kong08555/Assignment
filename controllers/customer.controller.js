const customer = require("../models/customer.js")

exports.index = (req,res) => {
    res.send('<h1>custommer aplication</h1><hr><a href="/api/customer">รายชื่อลูกค้า</a>')
}

exports.findAll = (req,res)=> {
    customer.find().then(data=> {
        res.json(data)
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        })
    })
}

exports.create = (req, res) => {
    const c = new customer(req.body)

    c.save().then(data => {
        res.json(data)
    }).catch(err => {
        return res.status(500).json({
            msg: "ไม่สามารถเพิ่มข้อมูลได้ เนื่องจาก :" + err.message
        })
    })
}

exports.update = (req, res) => {
    customer.findByIdAndUpdate(req.params.customerId,{$set: req.body}, {new: true})
    .then(data => {
        if(!data){
            return res.status(404).json({
                msg: "ไม่พบ record รหัส" + req.params.customerId
            })
        }
        res.json(data)
    }).catch(err => {
        return res.status(500).json({
            msg: "ไม่สามารถ Update ข้อมูลได้ เนื่องจาก :" +err.message
        })
    })
}

exports.delete = (req, res) => {
    customer.findByIdAndDelete(req.params.customerId)
    .then(data => {
        if(!data){
            return res.status(404).json({
                msg: "ไม่พบ Record รหัส : " + req.params.customerId
            })
        }
        res.json({ msg: "delete data complete!"})
    }).catch(err => {
        return res.status(500).json({
            msg: "ไม่สามารถลยข้อมูลได้ เนื่องจาก : " + err.message
        })
    })
}