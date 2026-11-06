const token = 'EAAgl7zR5FK0BS2zPHZBTJBUuKAoQ4MY0W8l2PZBd4jGJD9OGeY24q560O384ZAJ6pkQYSPWttmNRO763ZAe02nhL0tBQOrj5kQFZCeTqa7rwi3kg2SlNf1LpHzBOjtZA7FqAoT2Cv68txSpw6l6d0EGBjxXOQYQ10WYjV83tZCKOqpdr4ZBnyyywYWhDX82nNwZDZD';
const adAccountId = 'act_898705452000785';

async function check() {
  const res = await fetch(`https://graph.facebook.com/v20.0/${adAccountId}/adspixels?fields=id,name,creation_time&access_token=${token}`);
  const data = await res.json();
  console.log('Pixels:', JSON.stringify(data, null, 2));

  const actRes = await fetch(`https://graph.facebook.com/v20.0/${adAccountId}?fields=id,name,business,account_status,currency&access_token=${token}`);
  const actData = await actRes.json();
  console.log('Ad Account Details:', JSON.stringify(actData, null, 2));
}

check();
