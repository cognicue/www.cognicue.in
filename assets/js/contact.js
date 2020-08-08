(function($){
    function myPopup(myURL, title, myWidth, myHeight) {
            var left = (screen.width - myWidth) / 2;
            var top = (screen.height - myHeight) / 4;
            var myWindow = window.open(myURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + myWidth + ', height=' + myHeight + ', top=' + top + ', left=' + left);
    }

    function sendMail() {
        var yourMessage = document.getElementById("message").value;
        var subject = document.getElementById("subject").value;
        var email = document.getElementById("email").value;
        var name = document.getElementById("name").value;

        if (yourMessage.length && subject.length && name.length){
          var message = "CogniCue, \n\n"+yourMessage+"\n\n"+name;
          var mailString = "mailto:info@cognicue.in?subject="
              + encodeURIComponent(subject)
              + "&body=" + encodeURIComponent(message);
          myPopup(mailString, 'mail', 1050, 550);
        }
    }


    $(document).ready(function() {
        $('#contactForm').submit(function(event){
            if (this.checkValidity()) {
                event.preventDefault();
                sendMail();
                this.reset();
            }
        });

        $('#site_contact_info').click(function(event){
            event.preventDefault();
            var message = "CogniCue, \n\n";
            var subject = "Inquiring about your services";
            var mailString = "mailto:info@cognicue.in?subject="
              + encodeURIComponent(subject)
              + "&body=" + encodeURIComponent(message);
            myPopup(mailString, 'mail', 1050, 550);            
        });
    });

})($)