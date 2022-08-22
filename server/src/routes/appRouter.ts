import express from 'express';
const router = express.Router();

router.get('/', async function (r, res) {
    return res.json({key:"test"});
});

export default router;