function setIsLoggedIn(req, res) {
  req.session.set('loggedIn', true);
  return res.json({ loggedIn: true });
}

export default function(server) {
  server.post('/api/login', async (req, res) => {
    await req.session.start();
    const loggedIn = req.session.get('loggedIn');

    if (loggedIn) {
      return res.json({ loggedIn: true });
    }

    return setIsLoggedIn(req, res);
  });
}
