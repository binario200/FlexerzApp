var request = require('request');

var apiOptions= {
  server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.sever = "http://flexerzapp.herokuapp.com";
}

var renderHomepage = function (req, res, responseBody) {
  var message;

  if (!(responseBody instanceof Array) ) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No fueron encontrados lugares cercanos";
    }
  }

  res.render('locations-list', {
      title: 'Flexerz - Encuentra lugares cercanos a ti donde la tarjeta ticketlfex es aceptada',
      pageHeader: {
          title: 'Flexerz',
          strapline: 'Encuentra lugares donde la tarjeta ticketlfex es aceptada!'
      },
      sidebar: "Buscas por restaurantes, cafes, bares donde la tarjeta ticketflex es aceptada?  Flexerz lo encuentra por ti, en tu colonia, ciudad, ...",
      locations: responseBody,
      message: message
  });
}

/* GET 'home' page */
module.exports.homelist = function(req, res) {
  var requestOptions, path;
  path = '/api/locations';
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
    qs: {
      lng: -0.7992599,
      lat: 51.378091,
      maxdistance: 20
    }
  };
  request(
    requestOptions,
    function (err, response, body) {
      if (err) {
        console.log(err);
        _showDebugError(req, res, err);
      } else {
        var i, data;
        data = body;
        if (response.statusCode === 200 && data.length) {
          for (var i = 0; i < data.length; i++) {
            data[i].distance = _formatDistance(data[i].distance);
          }
        }

        renderHomepage(req, res, body);
      }
    }
  );
};

var _formatDistance = function (distance) {
  var numDistance, unit;
  if (distance > 1) {
    numDistance = parseFloat(distance).toFixed(1);
    unit = 'Km';
  } else {
    numDistance = parseInt(distance * 1000, 10);
    unit = 'm';
  }
  return numDistance + unit;
}

var _showDebugError = function functionName(req, res, err) {
  var title, content
  title = "Algo salió mal";
  content = err;

  res.status(500);
  res.render('generic-text', {
    title: title,
    content: content
  });
};

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, página no encontrada",
    content = "Parece que no pudimos encontrar la pagina que buscabas";
  } else {
    title = status + ", algo salió mal";
    content = "Algo, en algun lugar salio un poquito mal";
  }

  res.status(status);
  res.render('generic-text', {
    title: title,
    content: content
  });
}

var renderDetailPage = function (req, res, locDetail) {
  res.render('location-info', {
      title: locDetail.name,
      pageHeader: {
          title: locDetail.name
      },
      sidebar: {
          context: '',
          callToAction: 'Has estado ahí? Te aceptaron la tarjeta ticketflex? Cuentanos tu experiencia.'
      },
      location: locDetail
  });
};

var getLocationInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/locations/" + req.params.locationid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(
    requestOptions,
    function (err, response, body) {
      var data = body;
      if (response.statusCode === 200) {
        data.coords = {
          lng: body.coords[0],
          lat: body.coords[1]
        };
        callback(req, res, data);

      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
  getLocationInfo(req, res, function (res, req, responseData) {
    renderDetailPage(responseData);
  })
};

var renderReviewForm = function (req, res, locDetail) {
  res.render('location-review-form', {
      title: 'Review ' + locDetail.name + ' on Flexerz',
      pageHeader: {
          title: 'Review ' + locDetail.name
      },
      error: req.query.err
  });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
  getLocationInfo(req, res, function (req, res, responseData) {
    renderReviewForm(req, res, responseData);
  });
};

/* POST a review */
module.exports.doAddReview = function (req, res) {
  var requestOptions, path, locationid, postdata;
  locationid = req.params.locationid;
  path = "/api/locations/" + locationid + "reviews";
  postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };

  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect('/location/' + locationid + '/reviews/new?err=val');
  } else {
    request(
      requestOptions,
      function (err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/location/' + locationid);
        } else if (response.statusCode === 400 & body.name && body.name === "ValidationError") {
          res.redirect('/location/' + locationid + '/reviews/new?err=val');
        } else {
          console.log(body);
          _showError(req, res, response.statusCode);
        }
      }
    );
  }


};
