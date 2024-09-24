const { ObjectId } = require('mongodb');
const Today = require('../../models/mongo/today');
const ArchivementTarget = require('../../models/mongo/archivement-target');
const Subject = require('../../models/mongo/subject');
const Memo = require('../../models/mongo/memo');
const moment = require('moment');
const _ = require('lodash');

exports.get =async(req, res)=> {
    let resObj = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        let param = moment(new Date()).format('YYYY-MM-DD');
        if(req.query.startTime) param = req.query.startTime.toString();
        let query = [
            {
                $match: { startTime: param}
            }
        ];
        const response = await Today.aggregate(query).exec();
        if(response.length) {
            resObj.status = true;
            resObj.data = response;
            resObj.reason = 0;
        }
        res.json(resObj);
    } catch(err) {
        console.log(err);
        res.json(resObj)
    }
}

exports.total = async(req, res)=> {
    let resObj = {
        status: true,
        data: null,
        reason: 1
    };

    try {
        const query = [
            {
                $match: {}
            },
            {
                $lookup:{
                from: 'subjects',
                localField: '_id',
                foreignField: 'target_subject',
                as: 'subject'
                }
            },
            {
                $unwind: '$subject'
            },
            {
                $lookup: {
                from: 'todays',
                localField: 'subject._id',
                foreignField: 'subject',
                as: 'today'
                }
            },
            {
                $unwind: '$today'
            },
            {
                $project: {
                    _id: 1,
                    target: 1,
                    description: 1,
                    createAt: 1,
                    subject_name: '$subject.target_name',
                    subject_step: '$subject.target_step',
                    subject_target_val: '$subject.target_value',
                    subject_start: '$subject.createAt',
                    subject_status: '$subject_status',
                    today_id: '$today._id',
                    today_name: '$today.name',
                    today_description: '$today.description',
                    today_target: '$today.target',
                    today_status: '$today.status',
                    today_reason: '$today.reason',
                    today_start: '$today.startTime'
                }
            }
        ];

        const response = await ArchivementTarget.aggregate(query).exec();
        if(response.length) {
            resObj.status = true;
            resObj.reason = 0;
            
            // let arr1 = response.filter(item=> {
            //     return item.target == 'Pro Dev'
            // });
            // let arr2 = response.filter(item=> {
            //     return item.target == 'Pro English'
            // });
            // let arr3 = response.filter(item=> {
            //     return item.target == 'Human Relationship'
            // });
            // arr1.filter(item=> return item.status)arr1.length
            // console.log(arr1, arr1.length)
            resObj.data = response;
            res.json(resObj);
        } else {
            res.json(resObj);
        }
    } catch(err) {
        console.log(err);
        res.json(resObj);
    }
}

exports.getMainPlants = async(req, res)=> {
    let resObj = {
        status: true,
        data: null,
        reason: 1
    };
    try {
        const query = [
            {
                $match: {}
            },
            {
                $lookup:{
                from: 'subjects',
                localField: '_id',
                foreignField: 'target_subject',
                as: 'subject'
                }
            },
            {
                $unwind: '$subject'
            },
            {
                $project: {
                    _id: 1,
                    target: 1,
                    description: 1,
                    createAt: 1,
                    subject_name: '$subject.target_name',
                    subject_step: '$subject.target_step',
                    subject_target_val: '$subject.target_value',
                    subject_start: '$subject.createAt',
                    subject_status: '$subject.status',
                    
                }
            },
            
            {
              $group: {
                _id: "$target",
                 totalCnt: { $sum: 1 },
                doneCnt: {
                  $sum: {
                     $cond: [ { $eq: ["$subject_status", 1] }, 1, 0 ]
                  }
                },
                description: { $addToSet: "$description" },
                target: { $addToSet: "$target"},
                id: { $addToSet: "$_id"}
              }
            },
            { $sort: { _id: -1 } }
        ];
        const response = await ArchivementTarget.aggregate(query).exec();
        if(response.length) {
            resObj.status = true;
            resObj.reason = 0;
            resObj.data = response;
            res.json(resObj);
        } else {
            res.json(resObj);
        }

    } catch(err) {
        console.log(err);
        res.json(resObj);
    }
};

exports.getSubPlants = async(req, res)=> {
    let resObj = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        const query = [
            // { $match: {}},
            // { $lookup: {
            //     from: 'todays',
            //     localField: '_id',
            //     foreignField: 'subject',
            //     as: 'today'
            // }},
            // { $unwind: '$today'},
            // {
            //     $lookup: {
            //     from: 'archivementtargets',
            //     localField: 'target_subject',
            //     foreignField: '_id',
            //     as: 'archive'
            //     }
            // },
            // { $unwind: '$archive'},
            // {
            //     $project: {
            //     _id: 1,
            //     target_name: 1,
            //     target_step: 1,
            //     target_value: 1,
            //     status: 1,
            //     today_name: '$today.name',
            //     today_description: '$today.description',
            //     today_target: '$today.target',
            //     today_status: '$today.status',
            //     archive_id: '$archive._id',
            //     archive_target: '$archive.target'
            //     }
            // },
            // {
            //     $group: {
            //         _id:  '$target_name',
            //         subjectCnt: { $sum: 1 },
            //         totalTarget: { $first: "$target_value" },
            //         todayTarget: { $sum: "$today_target"},
            //         doneCnt: {
            //             $sum: {
            //             $cond: [ { $eq: ["$today_status", 1] }, 1, 0 ]
            //             }
            //         },
            //         doneTodayTarget: {
            //             $sum: {
            //             $cond: [{$eq: ['$today_status', 1]}, '$today_target', 0]
            //             }
            //         },
            //         id: { $addToSet: "$archive_id"},
            //         archive_target: { $addToSet: "$archive_target"}
            //     },
            // },
            // { $sort: { _id: 1} }

            { $match: {}},
            {
                $lookup: {
                from: 'archivementtargets',
                localField: 'target_subject',
                foreignField: '_id',
                as: 'archive'
                }
            },
            { $unwind: '$archive'},
            { $lookup: {
                from: 'todays',
                localField: '_id',
                foreignField: 'subject',
                as: 'today'
            }},
            { $unwind: { path: "$today", preserveNullAndEmptyArrays: true } },
            {
              $unionWith: {
                coll: "todays",
                pipeline: [
                  {
                    $lookup: {
                      from: "subjects",
                      localField: "_id",
                      foreignField: "subject",
                      as: "today"
                    }
                  },
                  {
                    $match: { matched: { $eq: [] } }
                  },
                  { $project: { matched: 0 } }
                ]
              }
            },
            { $project: {
                _id: 1,
                target_name: 1,
                target_step: 1,
                target_value: 1,
                status: 1,
                today_name: {
                  $cond: {
                    if: { $or: [
                      { $eq: ["$status", null] },
                      { $eq: ["$status", "N/A"] }
                    ] },
                    then: 'null',
                    else: "$today.name"
                  }
                },
                today_description: '$today.description',
                today_target: '$today.target',
                today_status: '$today.status',
                archive_id: '$archive._id',
                archive_target: '$archive.target'
                }
            },
            
            {
                $group: {
                    _id:  '$target_name',
                    subjectCnt: { $sum: 1 },
                    totalTarget: { $first: "$target_value" },
                    todayTarget: { $sum: "$today_target"},
                    doneCnt: {
                        $sum: {
                        $cond: [ { $eq: ["$today_status", 1] }, 1, 0 ]
                        }
                    },
                    doneTodayTarget: {
                        $sum: {
                        $cond: [{$eq: ['$today_status', 1]}, '$today_target', 0]
                        }
                    },
                    id: { $addToSet: "$archive_id"},
                    archive_target: { $addToSet: "$archive_target"},
                    step: {$addToSet: '$target_step'}
                },
            },
            { $sort: { 
                step: 1,
                _id: 1
            } }
        ];
        const response = await Subject.aggregate(query).exec();
        if(response.length) {
            resObj.status = true;
            resObj.reason = 0;
            resObj.data = response;
            res.json(resObj);
        } else {
            res.json(resObj);
        }

    } catch(err) {
        cosnole.log(err);
        res.json(resObj);
    }
}

exports.insert =async(req, res)=> {
    let resObj = {
        status: true,
        data: null,
        reason: 1
    };

    try {

        res.json(resObj);
    } catch(err) {
        console.log(err);
        res.json(resObj)
    }
}

exports.modify =async(req, res)=> {
    let resObj = {
        status: true,
        data: null,
        reason: 1
    };
    
    try {

        res.json(resObj);
    } catch(err) {
        console.log(err);
        res.json(resObj)
    }
}

exports.remove =async(req, res)=> {
    let resObj = {
        status: true,
        data: null,
        reason: 1
    };
    
    try {

        res.json(resObj);
    } catch(err) {
        console.log(err);
        res.json(resObj)
    }
}

exports.modifyReason = async(req, res)=> {
    let resObj = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        let response = await Today.updateOne(
            { _id: new ObjectId(req.params.reasonId) },
            [
                {$set: {reason: {$concat: [{ $ifNull: ["$reason", ""] },
                req.body.reason.toString()]}}}
            ]
        );
        if(response.acknowledged == true) {
            resObj.status = true;
            resObj.reason = 0;
            res.json(resObj);
        }
        else {
            res.json(resObj);
        }
    } catch(err) {
        console.log(err);
        res.json(resObj);
    }
}

exports.modifyStatus =async(req, res)=> {
    let resObj = {
        reason: 1,
        data: null,
        status: false
    };
    try {
        let response = await Today.updateOne(
            {_id: req.params.id},
            { $set: { 'status': 1}}
        );
        if(response.acknowledged == true) {
            let today = await Today.find({_id: req.params.id});
            let subjectId = null;
            let curValue = null;
            if(today.length) {
                subjectId = today[0].subject;
                curValue = today[0].target;    // today target value
            }
            if(subjectId) {
                let subject = await Subject.findById(subjectId);
                if(subject.target_value <= curValue + subject.target_cur_value) {
                    subject.target_cur_value = subject.target_value;
                    subject.status = 1;
                    let subjectRes1 = await subject.save();
                } else {
                    subject.target_cur_value = curValue + subject.target_cur_value;
                    let subjectRes2 = await subject.save();
                    
                }
            }
            resObj.reason = 0;
            resObj.status = true;
            res.json(resObj);
        } else {
            res.json(resObj);
        }
    } catch(err) {
        console.log(err);
        res.json(resObj);
    }
};

exports.getMemo = async(req, res)=>{
    let resObj = {
        status: false,
        reason: 1,
        data: null
    };
    try {
        let query = [
            { $match: {}},
            { $sort: { date: -1}},
            { $limit: 1 }
        ]
        let response = await Memo.aggregate(query).exec();
        if(response.length) {
            resObj.data = {
                content: response[0].content,
                _id: response[0]._id
            };
            resObj.reason = 0;
            resObj.status = true;
            res.json(resObj);
        } else {
            res.json(resObj);
        }
    } catch(err) {
        console.log(err);
        res.json(resObj);
    }
}

exports.createMemo = async(req, res)=>{
    let resObj = {
        status: true,
        reason: 1,
        data: null
    };
    try {
        let response = await Memo.create(req.body);
        console.log(response)
    } catch(err) {
        console.log(err);
        res.json(resObj);
    }
}
exports.modifyMemo = async(req, res)=>{
    let resObj = {
        status: true,
        reason: 1,
        data: null
    };
    try {
        let response = await Memo.updateOne(
            { _id: new ObjectId(req.params.memoId) },
            { $set: {content: req.body.content }}
        );
        if(response.modifiedCount == 1) {
            resObj.status = true;
            resObj.reason = 0;
            res.json(resObj);
        } else {
            res.json(resObj);
        }
        console.log(response)
    } catch(err) {
        console.log(err);
        res.json(resObj);
    }
}