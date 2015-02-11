/* Created by Andrey Savelev on 09.02.2015. */
function TodoCtrl($scope) {
    /*$scope.done = false;
    $scope.text = "";*/
    var onComplete = function(error) {
        if (error) {
            alert('Не удалось подключиться к базе данных');
        } else {
            alert('Задача полностью удалена');
        }
    };
    //$scope.setTimeout(changeStat(), 5000);

    $scope.todos = {};

    $scope.myData = new Firebase("https://owldo.firebaseio.com/todolist");

    $scope.addTodo = function () {
            // Не добавлять пустые строки
        if($scope.todoText.length === 0){
            return;
        }
        var newTodo = {
            done: false,
            text: $scope.todoText
        };

        $scope.myData.push(newTodo);
        $scope.todoText = "";


    };
    $scope.myData.on('value', function(snapshot) {
        $scope.todos = snapshot.val();
        $scope.$apply();
    });
    $scope.activityTodo = function (index) {
        var cnt = 0;
        for(var i in $scope.todos){
            if(index == cnt){
                $scope.updateData = new Firebase("https://owldo.firebaseio.com/todolist/"+i);
                var newData = {
                    done: $scope.todos[i].done,
                    text: $scope.todos[i].text
                };
                $scope.updateData.update(newData, onComplete);
            }
            cnt++;
        }
    };
    $scope.removeTodo = function (index) {
        var cnt = 0;
        for(var i in $scope.todos){
            if(index == cnt){
                $scope.updateData = new Firebase("https://owldo.firebaseio.com/todolist/"+i);
                $scope.updateData.remove(onComplete);
            }
            cnt++;
        }
    };
}
