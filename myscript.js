// Data Structure
var prices =[];
/*
{
	startDate: new Date("2017-01-04"),
	endDate: new Date("2017-01-15"),
	color: 'yellow',
	rate: '1000'
}
*/

$(function() {	
    
	$('#calendar').calendar({ 
				dataSource: prices,
				clickDay: function(e) {
					 console.log(e);
					if(e.events.length > 0) 
					{
						for(var i in e.events) {									
							$("#info-box").html("<span class='rates-legend' style='background-color:"+e.events[i].color+"'>"+e.events[i].name+"</span>");
						}
					}					
				}
	});
	
	$('input[name="daterange"]').daterangepicker({
	 autoUpdateInput: false,
		locale: {
		  format: 'YYYY-MM-DD'
		}
	}, 
	function(start, end, label) 
	{	
		$("#start").val( start.format('YYYY-MM-DD'));
		$("#end").val( end.format('YYYY-MM-DD'));
	});

	  $('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) {
		  $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
	  });

	  $('input[name="daterange"]').on('cancel.daterangepicker', function(ev, picker) {
		  $(this).val('');
	  });
	
	$("#add-price").click(function(){
		
		var row = {};
		row.startDate = $("#start").val();
		row.endDate = $("#end").val();

		if($("#daterange").val()=="")
		{
				alert("Dates are required");
				$("#daterange").focus();
				return false;
		}	
		
		if($("#rate").val()=="")
		{
				alert("Rate is required");
				$("#rate").focus();
				return false;
		}	
		
		row.rate = $("#rate").val();
		row.color= generateColor();
		
		// alert(JSON.stringify(row));
		prices.push(row);
		
		// alert(JSON.stringify(prices));		
		//alert(JSON.stringify(processData(prices)));
		
		$("#daterange").val("");
		$("#rate").val("");
		
		$('#calendar').data('calendar').setDataSource(processData(prices));		
	});
});


function generateColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function processData(data)
{
	var buffer =[];
	var row;
	
	for (var key in data) 
	{
		row = {};
		row.startDate = new Date(data[key].startDate);
		row.endDate = new Date(data[key].endDate);
		
		row.color = data[key].color;
		row.name = "Rate is : "+data[key].rate;
		
		buffer.push(row);
	}
	//alert(JSON.stringify(buffer));
	return buffer;
}