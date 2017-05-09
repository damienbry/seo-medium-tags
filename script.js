'use strict';

const https = require('https');
let TAGS = [];
let TAGS_REPORT_AMOUNT = 25;

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function launchHack() {
  for(let i = 0; i < alphabet.length; i++) {
    const res = callApi(alphabet[i]);
  }
}

function callApi(subquery) {
  const path = `/_/api/tags?source=typeahead&q=${subquery}`;

  const options = {
   host: 'medium.com',
   port: 443,
   path: path
  };

  https.get(options, (res) => {
    let body = '';

    res.on('data', (data) => {
      body += data;
    });

    res.on('end', () => {
      handleHack(parse(body));
    });

    res.on('error', (err) => {
      console.error(err);
    });
  });
}

function parse(result) {
  return JSON.parse(result.substring('])}while(1);</x>'.length));
}

function handleHack(res) {
  const rawTags = res.payload.value;
  const tags = rawTags.map((item) => {
    return {name: item.name, followerCount: item.metadata.followerCount, postCount: item.metadata.postCount}
  });
  TAGS = TAGS.concat(tags);
  showTop(TAGS_REPORT_AMOUNT);
}

function showTop(amount) {
  console.log(`SHOW TOP-${amount}`)
  TAGS.sort((a, b) => {
    if(a.followerCount + a.postCount < b.followerCount + b.postCount) return 1;
    if(a.followerCount + a.postCount > b.followerCount + b.postCount) return -1;
    return 0;
  })
    .slice(0, amount)
    .forEach((item) => {
      console.log(item)
    });
}

launchHack();
