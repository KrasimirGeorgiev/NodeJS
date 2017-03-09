'use strict';
// --------- IMPORTS ---------
var fs = require('fs-then');
var path = require('path');
var jade = require('jade');

var dbData = require('./data');
// ===========================

function generateHtmlFile(templatePath, resultPath, jsonData) {
    fs.readFile(templatePath, 'utf8')
        .then(function (file) {
            var generateHtml = jade.compile(file, {
                filename: path.join(process.cwd(), templatePath),
                pretty: true
            });

            return generateHtml;
        })
        .then(function (generateHtml) {
            var resultHtml = generateHtml(jsonData);

            return fs.writeFile(resultPath, resultHtml, 'utf8');
        })
        .then(function () {
            console.log('%s saved successfully', path.parse(resultPath).name);
        }, function (err) {
            console.log('Failed for %s', path.parse(resultPath).name);
            console.log(err);
        });
}

// --------- MAIN ------------
var nav = {
    home: {
        url: './home.html',
        text: 'HOME'
    },
    links: {
        smart: {
            url: './smart-phones.html',
            text: 'Smart-phones'
        },
        tablets: {
            url: './tablets.html',
            text: 'Tablets'
        },
        wearable: {
            url: './wearable.html',
            text: 'Wearable'
        }
    }
};

var footer = {
    body: 'Super website footer 5000'
};

var home = {
    heading: 'Howdy there cowboy!',
    body: 'Might I interest you in some fancy gadgets?'
};

generateHtmlFile('./templates/home.jade', path.join('./html', nav.home.url), {
    headTitle: 'Home',
    nav: nav,
    main: home,
    footer: footer
});

var productsTemplatePath = './templates/products.jade';

generateHtmlFile(productsTemplatePath, path.join('./html', nav.links.smart.url), {
    headTitle: 'Smart-phones',
    nav: nav,
    main: dbData.getMobiles(),
    footer: footer
});

generateHtmlFile(productsTemplatePath, path.join('./html', nav.links.tablets.url), {
    headTitle: 'Tablets',
    nav: nav,
    main: dbData.getTablets(),
    footer: footer
});

generateHtmlFile(productsTemplatePath, path.join('./html', nav.links.wearable.url), {
    headTitle: 'Wearable',
    nav: nav,
    main: dbData.getWearable(),
    footer: footer
});

// ===========================