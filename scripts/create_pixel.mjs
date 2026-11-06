const token = 'EAAgl7zR5FK0BS2zPHZBTJBUuKAoQ4MY0W8l2PZBd4jGJD9OGeY24q560O384ZAJ6pkQYSPWttmNRO763ZAe02nhL0tBQOrj5kQFZCeTqa7rwi3kg2SlNf1LpHzBOjtZA7FqAoT2Cv68txSpw6l6d0EGBjxXOQYQ10WYjV83tZCKOqpdr4ZBnyyywYWhDX82nNwZDZD';
const adAccountId = 'act_898705452000785';
const businessId = '3566410320278451';

async function createPixel() {
  console.log('Tentando criar Pixel na Conta de Anúncios...');
  let res = await fetch(`https://graph.facebook.com/v20.0/${adAccountId}/adspixels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Kit Pastoral - Pixel Oficial',
      access_token: token
    })
  });
  let data = await res.json();
  console.log('Resultado Conta:', JSON.stringify(data, null, 2));

  if (data.error) {
    console.log('\nTentando criar Dataset/Pixel no Business Portfolio...');
    res = await fetch(`https://graph.facebook.com/v20.0/${businessId}/datasets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Kit Pastoral - Pixel Oficial',
        access_token: token
      })
    });
    data = await res.json();
    console.log('Resultado Business Dataset:', JSON.stringify(data, null, 2));
  }
}

createPixel();
