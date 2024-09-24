const ArchivementTarget = require('../../models/mongo/archivement-target');

exports.insertArchive =async(req, res)=> {
    let resData = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        let archivement = new ArchivementTarget(req.body);
        await archivement.save();
        resData.status = true;
        resData.reason = 0;
        res.json(resData);
    } catch(err) {
        console.log(err);
        res.json(resData);
    }
};

exports.modifyArchive = async(req, res)=> {
    let resData = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        let id = req.body._id;
        delete req.body._id;
       
        await ArchivementTarget.updateOne(
            { _id: id},
            {$set: req.body}
        );
        resData.status = true;
        resData.data = null;
        resData.reason = 0;
        res.json(resData);
    } catch(err) {
        console.log(err);
        res.json(resData);
    }
};

exports.deleteArchive = async(req, res)=> {
    let resData = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        const archive = await ArchivementTarget.findByIdAndDelete(req.body._id);
        if(archive) {
            resData.status = true;
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

exports.getArchive = async(req, res)=> {
    let resData = {
        status: false,
        data: null,
        reason: 1
    };
    try {
        let filter = req.query;
        const response = await ArchivementTarget.find({});
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