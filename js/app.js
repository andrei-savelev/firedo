/* Created by Andrey Savelev on 09.02.2015. */
function TodoCtrl($scope) {
    // Функция для отслеживания ошибок
    var onComplete = function(error) {
        if (error) {
            alert('Не удалось подключиться к базе данных');
        } else {
            //alert('Синхронизация выполнена');
        }
    };

    // Изначально основа представления - объект
    $scope.todos = {};

    // создается метод для работы с базой данных Firebase
    // Единственным параметром передается адрес базы данных
    // за последним слешем в адресе указываются конретные хранилища базы
    $scope.myData = new Firebase("https://owldo.firebaseio.com/test");

    // Функция для добавления новых задач
    $scope.addTodo = function () {
            // Не добавлять пустую строку
        if($scope.todoText.length === 0){
            return;
        }
        // Создается объект который и отвечает за представление
        // так же в него обернуты данные для отправки на сервер базы
        var newTodo = {
            done: false,
            text: $scope.todoText
        };

        // Данные отправляются на сервер
        $scope.myData.push(newTodo);
        $scope.todoText = "";


    };
    // Метод .on() отвечает за синхронизацию базы с представлением в Angular
    $scope.myData.on('value', function(snapshot) {
        $scope.todos = snapshot.val();
        $scope.$apply();
    });
    // Функция для изменения свойства done в объекте todos
    $scope.activityTodo = function (index) {
        var cnt = 0;
        for(var i in $scope.todos){
            if(index == cnt){
                $scope.updateData = new Firebase("https://owldo.firebaseio.com/test/"+i);
                var newData = {
                    done: $scope.todos[i].done,
                    text: $scope.todos[i].text
                };
                $scope.updateData.update(newData, onComplete);
            }
            cnt++;
        }
    };
    // Функция для удаления задачи как из представления, так и из базы
    $scope.removeTodo = function (index) {
        var cnt = 0;
        for(var i in $scope.todos){
            if(index == cnt){
                $scope.updateData = new Firebase("https://owldo.firebaseio.com/test/"+i);
                $scope.updateData.remove(onComplete);
            }
            cnt++;
        }
    };
}
