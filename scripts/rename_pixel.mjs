const token = 'EAAgl7zR5FK0BS2zPHZBTJBUuKAoQ4MY0W8l2PZBd4jGJD9OGeY24q560O384ZAJ6pkQYSPWttmNRO763ZAe02nhL0tBQOrj5kQFZCeTqa7rwi3kg2SlNf1LpHzBOjtZA7FqAoT2Cv68txSpw6l6d0EGBjxXOQYQ10WYjV83tZCKOqpdr4ZBnyyywYWhDX82nNwZDZD';

async function renamePixel() {
  const res = await fetch(`https://graph.facebook.com/v20.0/7862991820414968`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Kit Pastoral - Pixel Oficial',
      access_token: token
    })
  });
  const data = await res.json();
  console.log('Resultado Rename Pixel:', data);
}

renamePixel();
