$(document).ready( () => {
    const eventRecommender = new EventRecommender(); 
   
    $("#button").click(function(e){
         let html="";
        e.preventDefault();
        let addId=$("#add-user-id").val();
    let addNewUser=$("#add-user-name").val();
        eventRecommender.addUser(addNewUser,addId);

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
           eventRecommender.addEvent(eventName,eventId,eventDate,eventCategory)
            $.each(eventRecommender.events, function(index,item){
                html+=`<li>Event: ${item.eventName}<br> Date:${item.date}-Category:${item.category}</li>`
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
        html+=`<li>${item.eventName}</li>`
  });
  $("#eventList").html(html);

});

// Search Event By date
$("#dateBtn").click(function(e){
    e.preventDefault();
    let html="";
    let searchByDate=$("#date-search-id").val();
     eventRecommender.findEventsByDate(searchByDate);
     $.each(eventRecommender.events, function(index,item){
         if(searchByDate===item.date){
        html+=`<li>${item.eventName}</li>`
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
        html+=`<li>${item.eventName}</li>`
         }
  });
  $("#categoryResult").html(html);

});

});

