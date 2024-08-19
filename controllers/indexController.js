function getIndex(req, res) {
  res.send('Got index!');
}

function getNew(req, res) {
  res.send('Got new!');
}

module.exports = { getIndex, getNew };
