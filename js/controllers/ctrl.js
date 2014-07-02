angular.module('irancard')
.run(function($rootScope) {
  $rootScope.username = 'saghar';
    
})

.filter('filterText', function() {
  // for encode and remove space 
  return function(str) { 
    return str.replace(/[\s\u200C]/g, '_') 
  };
})

.filter('filterLimit', function(){
  return function(str) { 
    return str.substr(0, 185)+'...'
  };
})

.controller('IrancardController' , function ($rootScope, $scope , $http) {
  // for submit user
  var formData = { 
      username: "default",
      password: "default"
  };

  $scope.submitForm = function() {
    formData = $scope.form; 
    $http({
      url: 'http://irancard.local',
      method: "POST",
      data: { 'username' : formData.username , 'password' : formData.password },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        var masalan = true;
        if (masalan) {
          $rootScope.username = formData.username;
          $rootScope.password = formData.password;
                    
          window.location = apiBaseUrl + '#/panel'
          // unescape(window.location);
        };
      }).error(function (data, status, headers, config) {
          $scope.status = status;
      });
  };


  // for slider in homepage
  jQuery(document).ready(function($) {

    $('.slideshow').bjqs({
      'height' : 350,
      'width' : 550,
      'showmarkers':false,
      'showcontrols':false
    });
  });


  //getting events json
  $http({
    method: 'GET',
    url: apiBaseUrl + '/js/json/news.json'
  }).
  success(function (data) {
    $scope.news = data;
  }).
  error(function (data, status, headers, config) {
    console.log(status);
  });
})


.controller('NewsController' , function ($rootScope, $scope , $http ,$routeParams , $route)
{
  // for fix header
  jQuery(document).ready(function($) {
    var newStickies = new stickyTitles(jQuery(".stickyHeader"));
    newStickies.load();
    $(window).on("scroll", function() {
      newStickies.scroll();
    });
  });

  //getting events json
  $http({
    method: 'GET',
    url: apiBaseUrl + '/js/json/json'+$routeParams.id+'.php'
  }).
  success(function (data) {
    $scope.subHeader = data.subHeader;
    $scope.date = data.date;
    $scope.header = data.header;
    $scope.content = data.content;
    $scope.src = data.src;
  }).
  error(function (data, status, headers, config) {
    console.log(status);
  });
})

.controller('RegisterController' , function ($rootScope, $scope , $http , $route)
{

  // for submit user(login)
  var formData = {
      username: "default",
      password: "default"
  };
  $scope.submitForm = function() {
    formData = $scope.form;
    $http({
        url: 'http://irancard.local',
        method: "POST",
        data: { 'username' : formData.username , 'password' : formData.password },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        var masalan = true;
        if (masalan) {
          $rootScope.username = formData.username;
          $rootScope.password = formData.password;
          window.location = apiBaseUrl + "#/panel"
        };
      }).error(function (data, status, headers, config) {
        $scope.status = status;
      });
  };


  // for register form
  var formDataRegister = {
    username: "default",
    family: "default",
    birthday : "default",
    phone: "default",
    usercode: "default",
    email : "default",
    address : "default",
    charge : "default",
  };

  $scope.registerForm = function() {
    formDataRegister = $scope.formRegister;
    $http({
      url: 'http://irancard.local',
      method: "POST",
      data: { 
        'name': formDataRegister.username,
        'family': formDataRegister.family,
        'birthday': formDataRegister.birthday,
        'usercode': formDataRegister.usercode,
        'phone': formDataRegister.phone,
        'email': formDataRegister.email,
        'address': formDataRegister.address,
        'charge': formDataRegister.charge
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).
    success(function (data, status, headers, config) {
      var masalan = true;
      if (masalan) {
        $rootScope.username = formDataRegister.username;
        $rootScope.password = formDataRegister.family;
        window.location = apiBaseUrl + "#/panel"
      };
    }).
    error(function (data, status, headers, config) {
      $scope.status = status;
    });
  };

  // for slider in homepage
  jQuery(document).ready(function($) {
    $('.slideshow').bjqs({
      'height': 350,
      'width': 550,
      'showmarkers': false,
      'showcontrols': false
    });
  });

})


.controller('PanelController' , function ($rootScope, $scope , $http, $timeout){
  $scope.name = $rootScope.username;
  
  //getting events json
  $http({
    method: 'GET',
    url: apiBaseUrl + '/js/json/'+$scope.name+'.json'
  }).
  success(function (data) {
    $scope.information= {
      lastVisit: data.lastVisit,
      date: data.date,
      lastweek1: data.lastweek1,
      lastweek2: data.lastweek2,
      lastweek: data.lastweek,
      mehr1: data.mehr1,
      aban1: data.aban1,
      shahrivar1: data.shahrivar1,
      khordad1: data.khordad1,
      dey1: data.dey1,
      bahman1: data.bahman1,
      esfand1: data.esfand1,
      mehr2: data.mehr2,
      aban2: data.aban2,
      shahrivar2: data.shahrivar2,
      khordad2: data.khordad2,
      dey2: data.dey2,
      bahman2: data.bahman2,
      esfand2: data.esfand2,
      infoTable: data.table,
    }


    $timeout(function ()  {
      // Panel ProgressBar
      var progressPaneWidth = function() {
          var windowsWidth = $(window).width(),
              progressMinWidth = (windowsWidth - 960) / 2;

          $('.progressbar .progresspane').width(progressMinWidth);

      }
      progressPaneWidth();

      $(window).resize(function() {
          progressPaneWidth();
      })

        // Calling DataTables
        $('#dataTable').dataTable({
            "scrollX": true,
            "language": {
                "url": "/js/dataTablesPersian.json"
            },
            "initComplete": function(settings, json) {
              selectInit();
            }
        });
      
      // Adding Custom Select Boxes to entire page
      var selectInit = function() {
        $('select').each(function() {
          $(this).parent().append("<div class='customselect'></div>");
          var selectClone = $(this).clone();
          $(this).parent().children('.customselect').append(selectClone);
          $(this).remove()
        });
      }
      selectInit();



    // Bar Charts Settings
    var lineChartDataTwo = {
      labels: ["مهر", "آبان", "شهریور", "خرداد", "دی", "بهمن", "اسفند"],
      datasets: [{
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        data: [$scope.information.mehr1, $scope.information.aban1, $scope.information.shahrivar1, $scope.information.khordad1, $scope.information.dey1, $scope.information.bahman1, $scope.information.esfand1]
      }, {
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        data: [$scope.information.mehr2, $scope.information.mehr2, $scope.information.shahrivar2, $scope.information.khordad2, $scope.information.dey2, $scope.information.bahman2, $scope.information.mehr2]
      }]
    }
    var lineChartData = {
      labels: ["مهر", "شهریور", "خرداد"],
      datasets: [{
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        data: [$scope.information.lastweek1, $scope.information.lastweek2, $scope.information.lastweek]
      }]
    }

    // Calling BarCharts
    var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData);
    var myLine3 = new Chart(document.getElementById("canvasthree").getContext("2d")).Line(lineChartDataTwo);
    });

  }).
  error(function (data, status, headers, config) {
    console.log(status);
  });
})
