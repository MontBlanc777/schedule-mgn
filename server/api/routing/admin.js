const express = require('express');
const router = express.Router();



// const scheduleCtrl = require('../controllers/admin/schedule');

// router.route('/schedule')
//     .post(scheduleCtrl.insertSchedule);

const todayTaskCtrl = require('../controllers/admin/today');
const subjectCtrl = require('../controllers/admin/subject');
const archivementCtrl = require('../controllers/admin/archivement-target');
const progressCtrl = require('../controllers/admin/progress');


const { adminUrl } = require('../config/url');

router.route(adminUrl.today)
                .get(todayTaskCtrl.getTodayTask)
                .post(todayTaskCtrl.insertTodayTask)
                .put(todayTaskCtrl.modifyTodayTask)
                .delete(todayTaskCtrl.removeTodayTask);

router.route(adminUrl.subject)
                .get(subjectCtrl.getSubject)
                .post(subjectCtrl.insertSubject)
                .put(subjectCtrl.modifySubject)
                .delete(subjectCtrl.removeSubject);
router.route(adminUrl.normalSubject)
                .get(subjectCtrl.getNormalSubject);

router.route(adminUrl.archivement)
                .get(archivementCtrl.getArchive)
                .post(archivementCtrl.insertArchive)
                .put(archivementCtrl.modifyArchive)
                .delete(archivementCtrl.deleteArchive);

router.route(adminUrl.progress)
                .get(progressCtrl.get)
                .post(progressCtrl.insert)
                .put(progressCtrl.modify)
                .delete(progressCtrl.remove);

router.route(adminUrl.total)
                .get(progressCtrl.total);

router.route(adminUrl.mainPlants)
                .get(progressCtrl.getMainPlants);

router.route(adminUrl.subPlants)
                .get(progressCtrl.getSubPlants);

router.route(adminUrl.reason)
                .put(progressCtrl.modifyReason);

router.route(adminUrl.status)
                .put(progressCtrl.modifyStatus);

router.route(adminUrl.memo)
                .get(progressCtrl.getMemo)
                .post(progressCtrl.createMemo);
                
router.route(adminUrl.modifyMemo)
                .put(progressCtrl.modifyMemo);

router.route(adminUrl.description)
                .put(todayTaskCtrl.modifyTodayDescription);

router.route(adminUrl.review)
                .get(todayTaskCtrl.getReview);


module.exports = router;
