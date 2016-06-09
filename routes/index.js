var express = require('express');
//var app = express.Router();
var csv = require("express-csv");
var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');

//psql package import
var pg = require("pg");
var conString = "postgres://c5fritz1387:password@localhost:5432/birchtest";


module.exports = function(app, passport) {

/* GET birch plots data data. */
app.get('/pg/plots', isLoggedIn, function (req, res) {
        var client = new pg.Client(conString);
        client.connect();         

        var query = client.query("SELECT row_to_json(fc) " 
            + "FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features "
            + "FROM (SELECT 'Feature' As type "
                + ", ST_AsGeoJSON(lg.wkb_geometry)::json As geometry "
                + ", row_to_json(lp) As properties "
                + "FROM public.birchplot As lg "
                    + "INNER JOIN (SELECT * FROM public.birchplot) As lp "
                    + "ON lg.ogc_fid = lp.ogc_fid  ) As f )  As fc"); 
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            res.send(result.rows[0].row_to_json);
            res.end();
        });
});

/* GET field notes data. */
/*app.get('/pg/fieldnotes', isLoggedIn, function (req, res) {
        var client = new pg.Client(conString);
        client.connect();         

        var query = client.query("SELECT row_to_json(fc) " 
            + "FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features "
            + "FROM (SELECT 'Feature' As type "
                + ", ST_AsGeoJSON(lg.wkb_geometry)::json As geometry "
                + ", row_to_json(lp) As properties "
                + "FROM public.fieldnotes As lg "
                    + "INNER JOIN (SELECT * FROM public.fieldnotes) As lp "
                    + "ON lg.ogc_fid = lp.ogc_fid  ) As f )  As fc"); 
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            res.send(result.rows[0].row_to_json);
            res.end();
        });
});*/
// show the home page (will also have our login links)
app.get('/', function(req, res) {
    res.render('index');
});


/* get new tree form */
app.get('/addTrees', isLoggedIn, function (req, res) {

      res.render('new_tree_form', {
        title: 'Add New Trees',
        user: req.user,
    })
      res.end();
});

/* get daily record data form */
app.get('/addData', isLoggedIn, function (req, res) {

      res.render('daily_record_form', {
        title: 'Add New Data',
        user: req.user,
    });
      res.end();
});

/* returm map view */
app.get('/map', isLoggedIn, function (req, res) {

      res.render('map', {
        title: 'Guardian DMS',
        user: req.user
  });
});

// LOGOUT ==============================
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/*process new tree form*/

app.post('/treeAdded',isLoggedIn, function (req, res) {

    var results = [];

    // Grab data from http request
    var data = {
        date: req.body.date, 
        complete: false,
        name: req.body.name, 
        complete: false,
        tree_id: req.body.tree_id, 
        complete: false,
        comments: req.body.comments, 
        complete: false,
        site_id: req.body.site_id,
        complete: false,
        plot_id: req.body.plot_id, 
        complete: false,
        x_coord: req.body.x_coord, 
        complete: false,
        y_coord: req.body.y_coord, 
        complete: false,
        elevation: req.body.elevation, 
        complete: false,
        distance1: req.body.distance1, 
        complete: false,
        direction1: req.body.direction1, 
        complete: false,
        species1: req.body.species1, 
        complete: false,
        dbh1: req.body.dbh1, 
        complete: false,
        distance2: req.body.distance2, 
        complete: false,
        direction2: req.body.direction2, 
        complete: false,
        species2: req.body.species2, 
        complete: false,
        dbh2: req.body.dbh2, 
        complete: false,
        distance3: req.body.distance3, 
        complete: false,
        direction3: req.body.direction3, 
        complete: false,
        species3: req.body.species3, 
        complete: false,
        dbh3: req.body.dbh3, 
        complete: false,
        dbh_tree: req.body.dbh_tree, 
        complete: false,
        height_tree: req.body.height_tree, 
        complete: false,
        growth_info: req.body.growth_info, 
        complete: false,
        height: req.body.height, 
        complete: false,
        coordinates: req.body.coordinates, 
        complete: false,
        height_crown: req.body.height_crown,
        complete: false,
        width_crown: req.body.width_crown, 
        complete: false,
        count3m: req.body.count3m, 
        complete: false,
    };

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO public.tapping(date, name, tree_id, site_id, plot_id, x_coord, y_coord, comments,elevation, distance1, direction1, species1,"
            + "dbh1,distance2, direction2, species2,dbh2,distance3, direction3, species3,dbh3,dbh_tree,height_tree,growth_info,height,coordinates,height_crown,width_crown,count3m)"
        + " values($1, $2, $3, $4, $5, $6, $7, $8, $9,$10, $11, $12, $13, $14, $15, $16, $17, $18, $19,$20, $21, $22, $23, $24, $25, $26, $27, $28, $29)", 
            [data.date, data.name, data.tree_id, data.site_id, data.plot_id, data.x_coord, data.y_coord, data.comments, data.elevation, data.distance1, data.direction1, data.species1,data.dbh1,
            data.distance2, data.direction2, data.species2,data.dbh2,data.distance3, data.direction3, data.species3,data.dbh3,data.dbh_tree,data.height_tree,data.growth_info,data.height,data.coordinates,
            data.height_crown,data.width_crown,data.count3m]);
        //client.query("INSERT INTO public.tapping(comments) values($1)", [data.text]);
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM public.tapping ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
            res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        });
    });

    res.render
});

/*process new data form */
app.post('/dataAdded', isLoggedIn, function (req, res) {

    var results = [];

    // Grab data from http request
    var data = {
        date: req.body.date, 
        complete: false,
        time: req.body.time, 
        complete: false,
        name: req.body.name, 
        complete: false,
        tree_id: req.body.tree_id, 
        complete: false,
        flow: req.body.flow, 
        complete: false,
        sugar: req.body.sugar, 
        complete: false,
        color: req.body.color, 
        complete: false,


    };

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO public.tappingdata(date, time, name, tree_id, flow, sugar, color) values($1, $2, $3, $4, $5, $6, $7)", [data.date, data.time, data.name, data.tree_id, data.flow, data.sugar, data.color]);  
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM public.tappingdata ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
            res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        });
    });

    res.render
});

app.get('/exportData',/*isLoggedIn,*/ function (req, res){
    
    var exportResults = [];

      // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
    var columns = ['date', 'time','name','tree_id', 'flow', 'sugar', 'color'];

    var query = client.query('SELECT '+columns.join(', ')+' FROM public.tappingdata');
    // Stream results back one row at a time
        query.on('row', function(row) {
            exportResults.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
        var headers = {};
            for (header in exportResults[0]) {
            headers[header] = header;
          }
        var resultWithHeaders = [];
        resultWithHeaders.push(headers);
        resultWithHeaders = resultWithHeaders.concat(exportResults);
        res.csv(resultWithHeaders);
        res.write('received the data:\n\n');
        });
    });

    res.render
});

app.get('/exportTrees',/*isLoggedIn*/ function (req, res){
    
    var exportResults = [];

      // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
    var columns = ['date', 'name', 'tree_id', 'site_id', 'plot_id', 'x_coord', 'y_coord', 'comments','elevation', 'distance1', 'direction1', 'species1',
'dbh1','distance2', 'direction2', 'species2','dbh2','distance3', 'direction3', 'species3','dbh3','dbh_tree','height_tree','growth_info','height','coordinates','height_crown','width_crown','count3m'];

    var query = client.query('SELECT '+columns.join(', ')+' FROM public.tapping');
    // Stream results back one row at a time
        query.on('row', function(row) {
            exportResults.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
        var headers = {};
            for (header in exportResults[0]) {
            headers[header] = header;
          }
        var resultWithHeaders = [];
        resultWithHeaders.push(headers);
        resultWithHeaders = resultWithHeaders.concat(exportResults);
        res.csv(resultWithHeaders);
        res.write('received the data:\n\n');
        });
    });

    res.render
});


// locally --------------------------------
// LOGIN ===============================
// show the login form
    app.get('/login', function(req, res) {
        res.render('index', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/map', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    /*
    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function(req, res) {
        res.render('signup', { message: req.flash('loginMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));*/

    /*app.get('/forgot', function(req, res) {
      res.render('forgot', {
        user: req.user
      });
    });

    app.post('/forgot', function(req, res) {
          async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ localemail: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'gmail',
        auth: {
          user: '!!! YOUR SENDGRID USERNAME !!!',
          pass: '!!! YOUR SENDGRID PASSWORD !!!'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'charles@ecotrust.ca',
        subject: 'Guardian DMS Password Reset Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });

});*/



/* GET home page. */
/*app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

}

//module.exports = app;
