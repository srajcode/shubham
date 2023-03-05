
$(document).ready(()=>{     
    // $('#categoryList').selectize({sortField: 'text',create:true});
    $('#countryList').select2({width: "100%"});
    $('#stateList').select2({width: "100%"});
    $('#cityList').select2({tags: true,width: "100%"});
  

    loadCityData();

    function loadCityData(){
        $.ajax({
            url:'/admin/loc_city/view_all',
            type:"GET",
            success: function(data){
                loadStateData();         //this function will be called for category doesn't matter if err
                
                if (data['data'].length>=1){
                var selectData=`<option disabled selected value="0">Select City</option>`;
                var slNo=1;var tableData='';
    
                data.data.forEach(element => {
                    var status=1;    
                    status=element.status=='1'?'Active':'Inactive';
                    selectData+=`<option value="${element.id}">${element.city}</option>`;
    
                    tableData+=`<tr>
                    <td>${slNo}</td>
                    <td>${element.id}</td>
                    <td>${element.countryName}</td>
                    <td>${element.stateName}</td>
                    <td>${element.city}</td>
                    <td>${element.pincode}</td>
                    <td>${element.uid}</td>
                    <td>
                      <button type="button" class="Activate btn ${status=="Active"?'btn-success':'btn-secondary'}" id="${"act" + element.uid}">${status}</button>
                      <button type="button" class="btn btn-primary" id=${"edit" + element.uid}">Edit</button>
                      <button type="button" class="btn btn-danger" id=${"del" + element.uid}">Delete</button>
                    </td>
                  </tr>`
                  slNo++;
    
    
                });
    
                    $('#cityList').html(selectData);
                    $('#cityList').select2({tags: true,width: "100%"});
                    
                    $('#tableCity').DataTable().destroy();
                    $('#tableCity tbody').html(tableData);
                    
                    $("#tableCity").DataTable({
                        "responsive": true, "lengthChange": false, "autoWidth": false,
                        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                        }).buttons().container().appendTo('#tableCity_wrapper .col-md-6:eq(0)');
    
                    $('#tableCity').DataTable().draw();
                    $('#pincode').val('').trigger('change');

    
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
            url:"/admin/loc_city/delete",
            type:"POST",
            data:{uid:deleteId},
            success:function(data){

                if(data['data']=='success'){
                    alert("Deleted Successfully")
                    loadCityData();
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
    url:"/admin/loc_city/edit",
    type:"POST",
    // dataType : "json",
    data:JSON.stringify({editBtnId}),
    // contentType:false,
    contentType: "application/json; charset=utf-8",
    cache:false,
    processData: false,
    success:function(data){
        console.log(data);
        if(data){
            $('#cityIdField').val(data.data[0].id);
            $("#countryList").val(data.data[0].countryid).change();
            $("#stateList").val(data.data[0].stateid).change();
            $("#cityList").val(data.data[0].id).change();
            $("#pincode").val(data.data[0].pincode);

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
    $(document).on("click","#btnEditCity",function(){
        var id=$("#cityIdField").val();
        var countryValue=$("#countryList").val();
        var stateValue=$("#stateList").val();
        var citytextValue=$("#cityList :selected").text();
        var pincodetextValue=$("#pincode").val();

        if(stateValue=='' || countryValue=='' || id=='' || citytextValue=='' || pincodetextValue==''){
        alert("Nothing is selected");
        return;
        };

        if (confirm("Are you sure to Update?")){
            $.ajax({
                url:"/admin/loc_city/update",
                type:"POST",
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify({id,countryValue,stateValue,citytextValue,pincodetextValue}),
                success:function(data){

                    if(data['data']=='success'){
                        alert("Item Updated Successfully")
                        $("#updateCatText").val('');
                        $("#updateCatId").val('')
                        $("#subCategoryIdField").val();
                        loadCityData()
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
            url:"/admin/loc_city/status",
            type:"POST",
            data:{uid:statusId,status:status},
            success:function(data){

                if(data['data']=='success'){
                    loadCityData()
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



// add city to db
    $("#btnAddCity").on('click', function(){
        const countryValue=$("#countryList").val();
        const stateValue=$("#stateList").val();
        const cityTextValue=$("#cityList :selected").text();
        const pincodeValue=$("#pincode").val();

        if (stateValue =='' || countryValue==0 || stateValue==0 || countryValue=='' || cityTextValue==''){
            alert("Kindly fill all the mandatory fields!");
            return
        };

        $.ajax({
            url:"/admin/loc_city/addNew",
            type:"POST",
            data:{countryValue,stateValue,cityTextValue,pincodeValue},
            success:function(data){
                if(data['data']=='success'){
                    loadCityData();
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



    function loadStateData(){
    $.ajax({
        url:'/admin/loc_state/view_all',
        type:"GET",
        success: function(data){
            loadCountryData();         //this function will be called for category doesn't matter if err
            // loadStateData();
            if (data['data'].length>=1){
            var selectData=`<option disabled selected value="0">Select State</option>`;

            data.data.forEach(element => {
                var status=1;    
                status=element.status=='1'?'Active':'Inactive';
                selectData+=`<option value="${element.id}">${element.state}</option>`;

            });

                $('#stateList').html(selectData);
                $('#stateList').select2({width: "100%"});
                

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

