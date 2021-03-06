$(document).ready( () => {
    const eventRecommender = new EventRecommender(); 


    $("#button").click(function(e){
        let html="";
        e.preventDefault();
        let addId=$("#add-user-id").val();
        let addNewUser=$("#add-user-name").val();
        console.log('<<<<<');
        console.log(`what is addID and addnewUser ${addNewUser}`)
         $.ajax({
            url:"/users",
            type: "POST",
            async: false,
            data: {id: addId, user: addNewUser},
            // dataType:"text",
            success:function (res){
                console.log("you received some data" +JSON.stringify(res)) 
                $.each(res, function(index,item){
                            html+=`<li>${item.newUser}</li>`
                      });
                      $("#all-users").html(html);
            
            }
           
           
        })
       
    })
    
    
// detele user block 
    $("#deleteBtn").click(function(e){
        e.preventDefault();
        let html="";
        let valueOfdeleteUserId=$("#delete-user-id").val();
        $.ajax({
            url:"/deleteUser",
            type: "DELETE",
            async: false,
            data: {deleteId:valueOfdeleteUserId},
            // dataType:"text",
            success:function (res){
                console.log("successful delete the id. this is the rest of the users" +JSON.stringify(res)) 
                $.each(res, function(index,item){
                            html+=`<li>${item.newUser}</li>`
                      });
                      $("#all-users").html(html);
            }
           
           
        })
    
     
    })

    // Add Event 
     $("#eventBtn").click(function(e){
         e.preventDefault();
         let html="";
         let eventId=$("#add-event-id").val();
          let eventName=$("#add-event-name").val();
          let eventDate=$("#add-event-date").val();
         let  eventCategory=$("#add-event-category").val();
         let  eventKeyword=$("#add-event-keyword").val();
         $.ajax({
            url:"/events",
            type: "POST",
            async: false,
            data: {id:eventId, event: eventName, date:eventDate,category:eventCategory, keyword:eventKeyword},
            // dataType:"text",
            success:function (res){
                console.log("received new event" +JSON.stringify(res)) 
                $.each(res, function(index,item){
                            html+=`<li>Event: ${item.eventName}<br> Date:${item.date}-Category:${item.category}-Keyword:${item.keyword}</li>`
                      });
                      
                      $("#eventList").html(html);
           
          
     }
    })
})

//Delete event 
$("#deleteEventBtn").click(function(e){
    e.preventDefault();
    let html="";
    let deleteEventId=$("#delete-event-id").val();
    $.ajax({
        url:"/deleteEvent",
        type: "DELETE",
        async: false,
        data: {deleteId:deleteEventId},
        // dataType:"text",
        success:function (res){
            console.log("successful delete the id. this is the rest of the events" +JSON.stringify(res)) 
            $.each(res, function(index,item){
                        html+=`<li>Event: ${item.eventName}<br> Date:${item.date}-Category:${item.category}-Keyword:${item.keyword}</li>`
                  });
                  $("#eventList").html(html);
        }
       
       
    })


});


// Search Event By keyWord
$("#keywordBtn").click(function(e){
    e.preventDefault();
    let name;
    let id;
    let date;
    let category;
    let searchByKeyword=$("#keyword").val();

    $.ajax({
        type:"GET",
        url:`https://app.ticketmaster.com/discovery/v2/events.json?apikey=EJg3WOdWSxuVHGJ9hGXDByqmJU9jiJAl&keyword=${searchByKeyword}&locale=*&countryCode=US&preferredCountry=us`,
        async:true,
        dataType: "json",
        success: function(json) {
            console.log(`get some api data ${JSON.stringify(json._embedded.events)}`)
            var ticketMasterEvents = json._embedded.events;
            for (let i=0; i<ticketMasterEvents.length; i++){
                name=ticketMasterEvents[i].name;
                id=ticketMasterEvents[i].id;
             date="N/A";
            category=ticketMasterEvents[i].type;
                
            }
            $.ajax({
                type:"POST",
                url:"/keyword",
                async:true,
                data:{apiName:name,apiId:id,apiDate:date,apiCategory:category},
                dataType: "json",
                success: function(res) {
               
                    console.log("successful delete the id. this is the keyword" +JSON.stringify(res)) 
                }
            })
        }
    })
})
        

// Search Event By date
$("#dateBtn").click(function(e){
    e.preventDefault();
    let html="";
    let searchByDate=$("#date-search-id").val();
    $.ajax({
        url:"/date",
        type: "GET",
        async: false,
        data: {date:searchByDate},
        // dataType:"text",
        success:function (res){
            console.log("match the date" +JSON.stringify(res)) 
       $.each(res, function(index,item){
         if(searchByDate===item.date){
        html+=`<li>Event: ${item.eventName}<br> Date:${item.date}-Category:${item.category}-Keyword:${item.keyword}</li>`
         }
  });
  $("#result").html(html);
        }
       
       
    })
   

});

// Search By Category
$("#categoryBtn").click(function(e){
    e.preventDefault();
    let html="";
    let searchByCategory=$("#category-search-id").val();
    $.ajax({
        url:"/category",
        type: "GET",
        async: false,
        data: {category:searchByCategory},
        // dataType:"text",
        success:function (res){
            console.log("match the category" +JSON.stringify(res)) 
            $.each(res, function(index,item){
                         if(searchByCategory===item.category){
                        html+=`<li>Event: ${item.eventName}<br> Date:${item.date}-Category:${item.category}-Keyword:${item.keyword}</li>`
                         }
                  });
                  $("#categoryResult").html(html);
        }


});
})
 //Save Event for user: use nested loop
 $("#savePersonalEvent").click(function(e){
    e.preventDefault();
   
     let userId=$("#save-user-id").val();
     let eventId=$("#save-event-id").val();
     $.ajax({
        url:"/personalEvent",
        type: "POST",
        async: false,
        data: {id:userId,event:eventId},
        // dataType:"text",
        success:function (res){
           console.log(`what is the personalEvent ${JSON.stringify(res)}`);
           
        } 
});
  
    
})

})