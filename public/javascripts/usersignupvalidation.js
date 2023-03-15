$(document).ready(function(){ 
    $("#usersignup").validate({
         rules:{
            name:{required:true},
            email:{required:true, 
                    email:true},
            password:{required:true,
                    minlength: 3,
                    mypassword: true},
            reppassword:{
                    required: true, 
                    equalTo: '#password'

            }
        }, 
        messages: { 
            email:{ email:"Enter a valid E-mail" },
            
            reppassword:{equalTo:"Password don't match"

            }
    } })
/*$("#password").focus(function(){
    $("#pass").show();
})
$("#password").blur(function(){
    $("#pass").hide();
})*/
$.validator.addMethod('mypassword', function(value, element) {
        return this.optional(element) || (value.match(/[A-Z]/) && value.match(/[0-9]/));
    },
    'Password must contain at least one numeric and one alphabetic character.');

})