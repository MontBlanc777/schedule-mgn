const { ObjectId } = require('mongodb');
const Today = require('../../models/mongo/today');

exports.insertTodayTask = async(req, res, next)=> {
    let resData = {
        status: false,
        data: null,
        reason: 1 // operate error
    }
    
    try {
        let today = new Today(req.body);
        await today.save();
        resData.status = true;
        resData.reason = 0;
        res.json(resData);
    } catch(err) {
        console.log(err)
        resData.status = false;
        resData.reason = 1;
        res.json(resData);
    }
};

exports.modifyTodayTask = async(req, res)=> {
    let resData = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        let id = req.body._id;
        delete req.body._id;
       
        await Today.updateOne(
            { _id: id},
            {$set: req.body}
        );
        resData.status = true;
        resData.data = null;
        resData.reason = 0;
        res.json(resData);
    } catch(err) {
        console.log(err)
    }
};

exports.modifyTodayDescription = async(req, res)=> {
    let resData = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        let response = await Today.updateOne(
            { _id: new ObjectId(req.params.id) },
            {$set: {description: req.body.description}}
        );
        if(response.acknowledged == true) {
            resData.status = true;
            resData.reason = 0;
            res.json(resData);
        }
        else {
            res.json(resData);
        }
    } catch(err) {
        console.log(err);
        res.json(resData)
    }
}

exports.removeTodayTask = async(req, res)=> {
    let resData = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        const today = await Today.findByIdAndDelete(req.body._id);
        if(today) {
            resData.status = true;
            resData.data = null;
            resData.reason = 0;
            res.json(resData);
        }
        else {
            res.json(resData);
        }
    } catch(err) {
        console.log(err);
        res.json(resData)
    }
};

exports.getTodayTask = async(req, res, next)=> {
    let resData = {
        status: false,
        data: null,
        reason: 1
    };

    try {
        let filter = req.query;
        // const response = await Today.find({});
        const query = [
            {
                $match: { subject: { $ne: null}}
            },
            {
                $lookup: {
                    from: 'subjects',
                    localField: 'subject',
                    foreignField: '_id',
                    as: 'subject_info'
                }
            },
            {$sort: {'subject': 1}},
            {
                $unwind: '$subject_info'
            },
            
            {
                $facet: {
                  metadata: [{ $count: "totalItems" }],
                  data: [
                    { $skip: (parseInt(filter.pn) - 1) * parseInt(filter.pc) },
                    { $limit: parseInt(filter.pc) }
                  ]
                }
            },
            { $unwind: '$metadata'},
            { $unwind: '$data'},
        ]
        const response = await Today.aggregate(query).exec();
        if(response.length) {
            resData.status = true;
            resData.data = response;
            resData.reason = 0;
            res.json(resData);
        } else {
            res.json(resData);
        }
    } catch(err) {
        console.log(err);
        res.json(resData);
    }
};


exports.getReview = async(req, res)=> {
    let resObj = {
        status: false,
        data: null,
        reason: 1
    }
    try {
        console.log(req.query)
        console.log(req.body)
        let query = [
            { $match: {'startTime': req.query.date}},
            { 
              $lookup: {
                from: 'subjects',
                localField: 'subject',
                foreignField: '_id',
                as: 'subject'
              }
            },
            { $unwind: '$subject'},
            { $lookup: {
                from: 'archivementtargets',
                localField: 'subject.target_subject',
                foreignField: '_id',
                as: 'archive'
            }},
            { $unwind: '$archive'},
            { $sort: { 'archive._id':  1}}
        ];
        let response = await Today.aggregate(query).exec();
        if(response) {
            resObj.status = true;
            resObj.reason = 0;
            resObj.data = response;
            res.json(resObj);
        } else {
            res.json(resObj)
        }
    } catch(err) {
        console.log(err);
        res.json(resObj);
    }
}