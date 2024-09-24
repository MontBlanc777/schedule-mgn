const Subject = require('../../models/mongo/subject');
const { replaceOne } = require('../../models/mongo/today');

exports.insertSubject = async(req, res, next)=> {
    let resData = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        let reqData = {
            target_name: req.body.name,
            target_step: req.body.step,
            target_value: req.body.value,
            target_subject: req.body.target
        }
        let subject = new Subject(reqData);
        await subject.save();
        resData.status = true;
        resData.reason = 0;
        res.json(resData);
    } catch(err) {
        console.log(err);
        res.json(resData)
    }
};

exports.modifySubject = async(req, res)=> {
    let resData = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        console.log(req.body)
        let id = req.body._id;
        let reqData = {
            target_name: req.body.name,
            target_step: req.body.step,
            target_value: req.body.value,
            target_subject: req.body.target
        }
        
        let response = await Subject.updateOne(
            { _id: id},
            {$set: reqData}
        );
        resData.status = true;
        resData.data = null;
        resData.reason = 0;
        res.json(resData);
    } catch(err) {
        console.log(err);
        res.json(resData)
    }
};

exports.removeSubject = async(req, res)=> {
    let resData = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        const subject = await Subject.findByIdAndDelete(req.body._id);
        if(subject) {
            resData.status = true;
            resData.reason = 0;
            res.json(resData)
        }
    } catch (err) {
        console.log(err);
        res.json(resData)
    }
};

exports.getSubject = async(req, res)=> {
    let resData = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        let filter = req.query;
        const query = [
                {
                    $match: { target_subject: { $ne: null}},
                },
                {
                    $lookup:{
                    from: 'archivementtargets',
                    localField: "target_subject",
                    foreignField: "_id",
                    as: "target_subject_name"
                    }
                },
                {$sort: {'target_subject': 1}},
                {
                    $unwind: '$target_subject_name'
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
                // { $sort: {'data.target_subject': 1}}
                // {
                //     $project: {

                //     }
                // }
         ];  
        
        const response = await Subject.aggregate(query).exec();
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

exports.getNormalSubject =async(req, res)=> {
    let resObj = {
        status: false,
        data: null,
        reason: 1
    }
    try {
        let response = await Subject.find({});
        if(response) {
            resObj.status = true;
            resObj.reason = 0;
            resObj.data = response;
            res.json(resObj)
        }
    } catch(err) {
        console.log(err);
        res.json(resObj);
    }
}