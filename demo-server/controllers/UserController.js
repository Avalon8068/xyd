const jwt = require('jsonwebtoken');

module.exports = {
  login: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(`${username} ${password}`);

    if (username === 'admin' && password === '123456') {
      // 注意默认情况 Token 必须以 Bearer+空格 开头
      const token = jwt.sign(
        {
          _id: 1,
          username,
        },
        'secret12345',
        {
          expiresIn: 3600 * 24 * 3,
        },
      );
      res.json({
        status: 'ok',
        code: 10000,
        data: {token: token},
      });
    } else {
      res.json({
        status: 'ok',
        code: 10001,
        message: 'Wrong password',
      });
    }
  },
  my: (req, res) => {
    console.log(req.user);
    res.json({
      status: 'ok',
      code: 10000,
      data: {...req.user},
    });
  },
};
