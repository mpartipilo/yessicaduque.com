const cp = require(`cockpit-api-client`);

const host = "http://content.yessicaduque.com";
const accessToken = "account-0aaa1438863e50a40c082513a1dc16";
const collectionName = "Gallery";

const client = new cp.Cockpit({ host, accessToken });

client.collectionEntries(collectionName).then(response => {
    response.json().then(async data => {
        console.log(data);
        data.entries.forEach(i => {
            const node = Object.keys(data.fields)
                .map(f => data.fields[f].name)
                .reduce((x, y) => ({ ...x, [y]: i[y] }), {});

            console.log(JSON.stringify(node));
        });
    });
});
