$(document).ready( () => {
    const eventRecommender = new EventRecommender(); 
   
    // console.log(recommandation)
    // let html="";
    // $.each(recommandation.users, function(index,item){
    //       html+=`<li>${item.newUser}</li>`
    // });
    // $("#all-users").html(html);
   
    $("#button").click(function(e){
         let html="";
        e.preventDefault();
        let addId=$("#add-user-id").val();
    let addNewUser=$("#add-user-name").val();
        eventRecommender.addUser(addNewUser,addId);
        console.log(eventRecommender.users)
        $.each(eventRecommender.users, function(index,item){
          html+=`<li>${item.newUser}</li>`
    });
    
    $("#all-users").html(html);

       
    })
    
// detele user block 
    $("#deleteBtn").click(function(e){
        e.preventDefault();
        let html="";
        let valueOfdeleteUserId=$("#delete-user-id").val();
        eventRecommender.deleteUser(valueOfdeleteUserId);
        $.each(eventRecommender.users, function(index,item){
            html+=`<li>${item.newUser}</li>`
      });
      $("#all-users").html(html);
     
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
           eventRecommender.addEvent(eventName,eventId,eventDate,eventCategory,eventKeyword);
            $.each(eventRecommender.events, function(index,item){
                html+=`<li>Event: ${item.eventName}<br> Date:${item.date}-Category:${item.category}-Keyword:${item.keyword}</li>`
          });
          
          $("#eventList").html(html);
        
          
     })

//Delete event 
$("#deleteEventBtn").click(function(e){
    e.preventDefault();
    let html="";
    let deleteEventId=$("#delete-event-id").val();
    eventRecommender.deleteEvent(deleteEventId);
    $.each(eventRecommender.events, function(index,item){
        html+=`<li>Event: ${item.eventName}<br> Date:${item.date}-Category:${item.category}-Keyword:${item.keyword}</li>`
  });
  $("#eventList").html(html);

});


// Search Event By keyWord
$("#keywordBtn").click(function(e){
    e.preventDefault();
    let searchByKeyword=$("#keyword").val();
    $.ajax({
        type:"GET",
        url:`https://app.ticketmaster.com/discovery/v2/events.json?apikey=EJg3WOdWSxuVHGJ9hGXDByqmJU9jiJAl&keyword=${searchByKeyword}&locale=*`,
        async:true,
        dataType: "json",
        success: function(json) {
            var ticketMasterEvents = json._embedded.events;
            
            let searchByKeyword=$("#keyword").val();
            html="";
          
           for (let i=0; i<ticketMasterEvents.length; i++){
               if (ticketMasterEvents[i].name.includes(searchByKeyword)){
                        
                 html+=`<li>${ticketMasterEvents[i].name}<br>Event type:${ticketMasterEvents[i].type}---Date:${ticketMasterEvents[i].dates.start.localDate}</li>`;
                 eventRecommender.addEvent(ticketMasterEvents[i].name,ticketMasterEvents[i].id,ticketMasterEvents[i].dates.start.localDate,ticketMasterEvents[i].type)
               }
           }
         
           if(html.length===0){
               html= `No Result`
           }
           $("#keywordResult").append(html);
        }    
        
      });


})	




// Search Event By date
$("#dateBtn").click(function(e){
    e.preventDefault();
    let html="";
    let searchByDate=$("#date-search-id").val();
     eventRecommender.findEventsByDate(searchByDate);
     $.each(eventRecommender.events, function(index,item){
         if(searchByDate===item.date){
        html+=`<li>Event: ${item.eventName}<br> Date:${item.date}-Category:${item.category}-Keyword:${item.keyword}</li>`
         }
  });
  $("#result").html(html);

});

// Search By Category
$("#categoryBtn").click(function(e){
    e.preventDefault();
    let html="";
    let searchByCategory=$("#category-search-id").val();
     eventRecommender.findEventsByDate(searchByCategory);
     $.each(eventRecommender.events, function(index,item){
         if(searchByCategory===item.category){
        html+=`<li>Event: ${item.eventName}<br> Date:${item.date}-Category:${item.category}-Keyword:${item.keyword}</li>`
         }
  });
  $("#categoryResult").html(html);

});

 //Save Event for user
 $("#savePersonalEvent").click(function(e){
    e.preventDefault();
   
     let userId=$("#save-user-id").val();
     let eventId=$("#save-event-id").val();
     eventRecommender.saveUserEvent(userId,eventId);
    
})
});



