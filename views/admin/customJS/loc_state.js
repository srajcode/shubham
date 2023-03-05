
$(document).ready(()=>{     
    // $('#categoryList').selectize({sortField: 'text',create:true});
    $('#countryList').select2({width: "100%"});
    $('#stateList').select2({tags: true,width: "100%"});
  

    loadStateData();

    function loadStateData(){
    $.ajax({
        url:'/admin/loc_state/view_all',
        type:"GET",
        success: function(data){
            loadCountryData();         //this function will be called for category doesn't matter if err
            
            if (data['data'].length>=1){
            var selectData=`<option disabled selected value="0">Select State</option>`;
            var slNo=1;var tableData='';

            data.data.forEach(element => {
                var status=1;    
                status=element.status=='1'?'Active':'Inactive';
                selectData+=`<option value="${element.id}">${element.state}</option>`;

                tableData+=`<tr>
                <td>${slNo}</td>
                <td>${element.id}</td>
                <td>${element.countryName}</td>
                <td>${element.state}</td>
                <td>${element.uid}</td>
                <td>
                  <button type="button" class="Activate btn ${status=="Active"?'btn-success':'btn-secondary'}" id="${"act" + element.uid}">${status}</button>
                  <button type="button" class="btn btn-primary" id=${"edit" + element.uid}">Edit</button>
                  <button type="button" class="btn btn-danger" id=${"del" + element.uid}">Delete</button>
                </td>
              </tr>`
              slNo++;


            });

                $('#stateList').html(selectData);
                $('#stateList').select2({tags: true,width: "100%"});
                
                $('#tableState').DataTable().destroy();
                $('#tableState tbody').html(tableData);
                
                $("#tableState").DataTable({
                    "responsive": true, "lengthChange": false, "autoWidth": false,
                    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#tableState_wrapper .col-md-6:eq(0)');

                $('#tableState').DataTable().draw();

            }else if (data['data']=='unauthorized user') {
                window.location.replace("/admin/login");
            }else if (data['data']=='failed') {
                alert ("Failed while fetching all data");
            }else{
                alert("error occured or no data found");
            }
        }
        
    });
    };

    


// delete ajax requests
$(document).on("click",".btn-danger",function(){
    if (confirm("Are you sure to delete?")){
        var btnId=$(this).attr("id");

        var deleteId=btnId.substring(3,btnId.length-1)
        $.ajax({
            url:"/admin/loc_state/delete",
            type:"POST",
            data:{uid:deleteId},
            success:function(data){

                if(data['data']=='success'){
                    alert("Deleted Successfully")
                    loadStateData()
                }else if (data['data']=='failed'){
                    alert ("Failed while deleting");
                }else if (data['data']=='unauthorized user') {
                    window.location.replace("/admin/login");}
                else  {
                    alert("Failed while deleting")
                }
            }
        })
    }

})



// EDIT Category
$(document).on("click",".btn-primary",function(){
    var btnId=$(this).attr("id");
    var editBtnId=btnId.substring(4,btnId.length-1)
    $.ajax({
    url:"/admin/loc_state/edit",
    type:"POST",
    // dataType : "json",
    data:JSON.stringify({editBtnId}),
    // contentType:false,
    contentType: "application/json; charset=utf-8",
    cache:false,
    processData: false,
    success:function(data){
        if(data){
            $('#stateIdField').val(data.data[0].id);
            $("#countryList").val(data.data[0].countryid).change();
            $("#stateList").val(data.data[0].id).change();

        }else if (data['data']=='failed'){
            alert ("Failed while fetching datat");
        }else if (data['data']=='unauthorized user') {
            window.location.replace("/admin/login");}
        else{
            alert("Failed while updating")
        };
    }
})

})



// Update ajax requests
    $(document).on("click","#btnEditState",function(){
        var id=$("#stateIdField").val();
        var statetextValue=$("#stateList :selected").text();
        var countryValue=$("#countryList").val();

        if(countryValue=='' || statetextValue=='' || id==''){
        alert("Nothing is selected");
        return;
        };

        if (confirm("Are you sure to Update?")){
            $.ajax({
                url:"/admin/loc_state/update",
                type:"POST",
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify({id:id,countryValue:countryValue,statetextValue:statetextValue}),
                success:function(data){

                    if(data['data']=='success'){
                        alert("Item Updated Successfully")
                        $("#updateCatText").val('');
                        $("#updateCatId").val('')
                        $("#subCategoryIdField").val();
                        loadStateData()
                    }else if (data['data']=='failed'){
                        alert ("Failed while updating");
                    }else if (data['data']=='unauthorized user') {
                        window.location.replace("/admin/login");}
                    else{
                        alert("Failed while updating")
                    };
                }
            })
        }

    })



// Activate or Deactivate toggle ajax requests
    $(document).on("click",".Activate",function(){
    var status=0;
    status=$(this).hasClass('btn-secondary')?0:1

        var btnId=$(this).attr("id");
        var statusId=btnId.substring(3,btnId.length)

        $.ajax({
            url:"/admin/loc_state/status",
            type:"POST",
            data:{uid:statusId,status:status},
            success:function(data){

                if(data['data']=='success'){
                    loadStateData()
                }else if (data['data']=='failed'){
                    alert ("Failed while changing status");
                }else if (data['data']=='unauthorized user') {
                    window.location.replace("/admin/login");
                }else{
                    alert("failed while chaging status");
                }
            }
        })


    });



// add category to db
    $("#btnAddState").on('click', function(){
        const countryValue=$("#countryList").val();
        const stateValue=$("#stateList :selected").text();

        // return

        if (stateValue =='' || countryValue=='Select Country' || countryValue==''){
            alert("Kindly fill category name");
            return
        };

        $.ajax({
            url:"/admin/loc_state/addNew",
            type:"POST",
            data:{countryValue:countryValue,stateValue:stateValue},
            success:function(data){
                if(data['data']=='success'){
                    loadStateData();
                    alert("Successfully added to the list");
                }else if (data['data']=='failed'){
                    alert ("Failed while add");
                }else if (data['data']=='unauthorized user') {
                    window.location.replace("/admin/login");
                }else{
                    alert("error occured");
                }

        }
    });

    });




});




function loadCountryData(){
    $.ajax({
        url:'/admin/loc_country/view_all',
        type:"GET",
        success: function(data){

            if (data['data'].length>=1){

                var selectData=`<option disabled selected value="0">Select Country</option>`;

                data.data.forEach(element => {
                    if (element.status==1){     //if status is active in the category list.
                        var status=1;    
                        status=element.status=='1'?'Active':'Inactive';
                        selectData+=`<option value="${element.id}" ${element.country=='India'?'selected="selected"':''} >${element.country}</option>`;
                    };
                });
                $('#countryList').html(selectData);
                $('#countryList').select2({width:"100%"});
                
            }else if (data['data']=='unauthorized user') {
                window.location.replace("/admin/login");
            }else if (data['data']=='failed') {
                alert ("Failed while fetching all data");
            }else{
                alert("error occured no data found");
            }
        }
        
    });
};

