angular.module('irancard')
.run(function($rootScope) {
  $rootScope.username = '';
  $rootScope.username_id = 'B0DC9F70-47E2-E311-99C2-78E7D1E7FC64&format';
  $rootScope.register = false ;
    
})

.filter('filterText', function() {
  // for encode and remove space 
  return function(str) { 
    return str.replace(/[\s\u200C]/g, '_');
  };
})

.filter('filterLimit', function(){
  // for text overflow
  return function(str) { 
    return str.substr(0, 150)+'...';
  };
})
.factory('customFilter', function () {
  return {
    scrollTop: function() {
      $('html,body').animate({scrollTop: 0},300);
    }
  };
})
.controller('IrancardController' , function ($rootScope, $scope , $http, customFilter , $timeout) {

  customFilter.scrollTop();
  // for submit user
  var formData = { 
      username: "default",
      password: "default"
  };

  // $scope.submitForm = function() {
  //   formData = $scope.form;
  //   $http({
  //     url: 'http://192.168.0.75:8000/customer',
  //     method: "POST",
  //     type : "POST",
  //     data: { 'username' : formData.username , 'password' : formData.password },
  //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  //   }).success(function (data, status, headers, config) {
  //       $rootScope.username = formData.username;
  //       $rootScope.password = formData.password;

  //       if ($rootScope.username == "test" && $rootScope.password == "test") {
  //         $rootScope.username_id = 'B0DC9F70-47E2-E311-99C2-78E7D1E7FC64&format'
  //         window.location = apiBaseUrl + '#/panel'
  //       }else{
  //         alert("نام کاربری یا رمز ورود شما صحیح نمی باشد");
  //           };
  //     }).error(function (data, status, headers, config) {
  //         delete $window.sessionStorage.token;
  //         $scope.status = status;
  //     });

  // };

  // for slider in homepage
  jQuery(document).ready(function($) {

    $('.slideshow').bjqs({
      'height' : 350,
      'width' : 550,
      'showmarkers':false,
      'showcontrols':false
    });
  });

  //getting news json 
  $http({
    method: 'GET',
    url: 'http://192.168.0.75:8000/api/v1/news/?format=json'
  }).
  success(function (data) {
    $scope.news = data.objects;
    for (var i = 0; i < $scope.news.length; i++) {
      $scope.news[i].thumbnail = 'http://192.168.0.75:8000' + data.objects[i].thumbnail;
      $scope.news[i].image = 'http://192.168.0.75:8000' + data.objects[i].image;
    };
    // for slider in homepage
    $timeout(function(){
      $('.slideshow').bjqs({
        'height': 350,
        'width': 550,
        'showmarkers': false,
        'showcontrols': false
      });
    })
  }).
  error(function (data, status, headers, config) {
    console.log(status);
  });

})


.controller('NewsController' , function ($rootScope, $scope , $http ,$routeParams , $route, customFilter) {
  
  customFilter.scrollTop();
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
    url: 'http://192.168.0.75:8000/api/v1/news/' + $routeParams.id + '/?format=json'
  }).
  success(function (data) {
    // $scope.subHeader = data.subHeader;
    $scope.thumb = 'http://192.168.0.75:8000' + data.thumbnail;
    $scope.creationDate = data.creationDate;
    $scope.title = data.title;
    $scope.text = data.text;
    $scope.image = 'http://192.168.0.75:8000' + data.image;
  }).
  error(function (data, status, headers, config) {
    console.log(status);
  });
})

.controller('RegisterController' , function ($rootScope, $scope , $http , $routea, customFilter) {

//   var myList = document.getElementsByTagName('body');
// myList.setAttribute("class", "regiester");
$rootScope.register = true;

  customFilter.scrollTop();
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
})


.controller('PanelController' , function ($rootScope, $scope , $http, $timeout) {
  scrollTop();
  $scope.id = $rootScope.username_id;

  //getting events json
  $http({
    method: 'GET',
    url: 'http://192.168.0.75:8000/api/v1/transaction/?id=' + $scope.id + '=json'
  }).
  success(function (data) {
    $scope.information= {
      lastVisit: data.lastVisit,
      date: data.date,
      lastweek1: '92',
      lastweek2: '27',
      lastweek: '99',
      mehr1: '65',
      aban1: '55',
      shahrivar1: '22',
      khordad1: '46',
      dey1: '90',
      bahman1: '15',
      esfand1: '86',
      mehr2: '65',
      aban2: '55',
      shahrivar2: '27',
      khordad2: '70',
      dey2: '47',
      bahman2: '58',
      esfand2: '23',
      infoTable: data.objects,
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
