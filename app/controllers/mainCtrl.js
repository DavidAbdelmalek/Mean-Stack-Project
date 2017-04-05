angular.module('mainController',['authServices'])
.controller('mainCtrl',function(Auth,$timeout,$location,$rootScope)
{
var app=this;
$rootScope.$on('$routeChangeStart',function()
{
if(Auth.isLoggedIn())
{
    app.isLoggedIn=true;
    Auth.getUser().then(function(data)
    {
        console.log(data.data.username);
        app.username=data.data.username;
        app.useremail=data.data.email;
    }); 
}
else{
    app.isLoggedIn=false;
    app.username='';
}
});

this.doLogin=function(loginData)
{
    app.doLogin=true;
    app.errorMsg=false;
        Auth.login(app.loginData).then(function(data)
    {
        console.log(data.data.success);
        console.log(data.data.message);
        if(data.data.success)
        {
            app.successMsg=data.data.message+'.....Redirecting';
            $timeout(function(){ $location.path('/about');
            app.loginData='';
            app.successMsg=false;
    },2000);
        }
        else
        {
            app.errorMsg=data.data.message;
        }
    });
};
this.logout=function()
{
    Auth.logout();
    $location.path('/logout');
    $timeout(function(){
        $location.path('/');
    },2000);
};
});

  