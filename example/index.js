const path = require('path');
const express = require('express');
const app = express();

const expressVueOptions = {
    views: path.join(__dirname, '/views'),
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
};
const expressVue = require('../dist').init(expressVueOptions);

app.use(expressVue);

var users = [];
var pageTitle = 'Express Vue';
users.push({ name: 'tobi', age: 12 });
users.push({ name: 'loki', age: 14  });
users.push({ name: 'jane', age: 16  });

var exampleMixin = {
    methods: {
        hello: function () {
            console.log('Hello');
        }
    }
};

app.get('/', function(req, res){
    var scope = {
        data: {
            title: pageTitle,
            message: 'Hello!',
            users: users
        },
        vue: {
            head: {
                title: pageTitle,
                meta: [
                    { property:'og:title', content: pageTitle},
                    { name:'twitter:title', content: pageTitle}
                ],
                structuredData: {
                    "@context": "http://schema.org",
                    "@type": "Organization",
                    "url": "http://www.your-company-site.com",
                    "contactPoint": [{
                        "@type": "ContactPoint",
                        "telephone": "+1-401-555-1212",
                        "contactType": "customer service"
                    }]
                }
            },
            components: ['users', 'messageComp'],
            mixins: [exampleMixin]
        }
    };
    res.renderVue('index', scope);
});

app.get('/users/:userName', function(req, res){
    var user = users.filter(function(item) {
        return item.name === req.params.userName;
    })[0];
    res.render('user', {
        data: {
            title: 'Hello My Name is',
            user: user
        }
    });
});

app.listen(3000);
console.log('Express server listening on port 3000');
