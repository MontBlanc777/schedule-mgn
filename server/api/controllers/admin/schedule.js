const Schedule = require('../../models/mongo/schedule');
exports.insertSchedule = async(req, res) => {
    try {
        console.log(req.body)
        const schedule = new Schedule(req.body);
        await schedule.save();
        res.json({success: true})
    } catch(err) {
        console.log(err)
    }
};
