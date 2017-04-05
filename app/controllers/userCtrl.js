angular.module('userControllers',['userServices'])
.controller("regCtrl",function($http,$location,$timeout,User)
{
    var app=this;
this.regUser=function(regData)
{
    app.loading=true;
    app.errorMsg=false;
        User.create(app.regData).then(function(data)
    {
        console.log(data.data.success);
        console.log(data.data.message);
        if(data.data.success)
        {
            $timeout(function(){ app.loading=false;},1000);
            app.successMsg=data.data.message+'.....Redirecting';
            $timeout(function(){ $location.path('/');},2000);
        }
        else
        {
             app.loading=false;           
            app.errorMsg=data.data.message;
        }
    });
}
});


