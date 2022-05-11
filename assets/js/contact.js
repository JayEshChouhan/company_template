$(document).ready(function(){
    // Contact Form Submition
    function checkRequire(formId , targetResp){
       targetResp.html('');
  
       var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
       var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
       var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
       var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
       var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
       var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
       var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
       var check = 0;
       $('#er_msg').remove();
       var target = (typeof formId == 'object')? $(formId):$('#'+formId);
       target.find('input , textarea , select').each(function(){
          if($(this).hasClass('require')){
             if($(this).val().trim() == ''){
                check = 1;
                $(this).focus();
                targetResp.html('You missed out some fields.');
                $(this).addClass('error');
                return false;
             }else{
                $(this).removeClass('error');
             }
          }
          if($(this).val().trim() != ''){
             var valid = $(this).attr('data-valid');
             if(typeof valid != 'undefined'){
                if(!eval(valid).test($(this).val().trim())){
                   $(this).addClass('error');
                   $(this).focus();
                   check = 1;
                   targetResp.html($(this).attr('data-error'));
                   return false;
                }else{
                   $(this).removeClass('error');
                }
             }
          }
       });
       return check;
    }
    $(".submitForm").on("click", function() {
       var _this = $(this);
       var targetForm = _this.closest('form');
       var errroTarget = targetForm.find('.response');
       var check = checkRequire(targetForm , errroTarget);
       if(check == 0){
          Email.send({
             Host: "smtp.gmail.com",
             Username : "lcy06shukla@gmail.com",
             Password : "smdfwbeawhxcdhno",
             To : 'jayeshchouhan98765@gmail.com',
             From : "lcy06shukla@gmail.com",
             Subject : "portfolio support",
             Body : `
                Name: ${targetForm[0][0].value}, <br/>
                Email: ${targetForm[0][1].value}, <br/>
                Subject: ${targetForm[0][2].value}, <br/>
                Message: ${targetForm[0][3].value}
             `,
          })
          .then((message) =>{
             if(message == "OK"){
                errroTarget[0].classList.add("green")
               errroTarget[0].innerHTML = "Mail send successfully...";
             }else{
               errroTarget[0].classList.add("red")
               errroTarget[0].innerHTML = "Something went wrong try again later...";
             }
          });
       }
    });
  });