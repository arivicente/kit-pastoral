const token = 'EAAgl7zR5FK0BS2zPHZBTJBUuKAoQ4MY0W8l2PZBd4jGJD9OGeY24q560O384ZAJ6pkQYSPWttmNRO763ZAe02nhL0tBQOrj5kQFZCeTqa7rwi3kg2SlNf1LpHzBOjtZA7FqAoT2Cv68txSpw6l6d0EGBjxXOQYQ10WYjV83tZCKOqpdr4ZBnyyywYWhDX82nNwZDZD';

async function checkPixel(pixelId) {
  const res = await fetch(`https://graph.facebook.com/v20.0/${pixelId}?fields=id,name,last_fired_time,is_unavailable&access_token=${token}`);
  const data = await res.json();
  console.log(`Pixel ${pixelId}:`, data);
}

async function run() {
  await checkPixel('7862991820414968');
  await checkPixel('1126219502289471');
  await checkPixel('1463153222400890');
}

run();
