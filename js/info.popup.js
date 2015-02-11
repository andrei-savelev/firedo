/**
 * Created by Андрей on 11.02.2015.
 */
$(document).ready(function(){
    $('.alert').alert(
        $('#myAlert').on('close.bs.alert', function () {
                // do something…
        })
    );
    function test(){
        console.log('test');
    }
});