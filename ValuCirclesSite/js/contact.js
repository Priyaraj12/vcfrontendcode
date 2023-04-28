	 $('#email-form').submit(function(event) {
		 event.preventDefault();
		 var data = $( this ).serializeArray();
		 $.ajax({
	         url: 'https://valucircles.com/StagingService/user/sendMailToContact',
//		     url: 'http://13.127.114.89/StagingService/user/sendMailToContact',
//		     url: 'http://13.235.118.32/StagingService/user/sendMailToContact',
	         type : "post",
	         crossDomain : true,
	         headers: {
	             'Content-Type': 'application/x-www-form-urlencoded'
	         },
	         dataType: "text",
	         data: $.param({
	             'Fname': data[0].value,
	             'email' : data[1].value,
	             'subject' : data[2].value,
	             'msg': data[3].value
	         }),
	         success : function(data) {
				//	setUserCookies(data);
			//	$('#success_message').addClass('success');
			//	$('#success_message.text-block').html('<p>'+data.message+'<p>');
					alert("We have received your query and will get back to you soon");
				},
				error : function(e) {
				//	$('#error_message').addClass('Error');
				//	$('#error_message.text-block').html('<p>'+data.error+'<p>');
					alert("Something went wrong please check back after sometime");
				},
				cache : false,
				processData : false,
				contentType : false
 
		 });
 });
		 
		
