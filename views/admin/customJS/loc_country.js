
$(document).ready(()=>{   
    
    $('#countryList').select2({tags: true,selectOnClose: true});

    loadCategoryData();
    function loadCategoryData(){
    $.ajax({
        url:'/admin/loc_country/view_all',
        type:"GET",
        success: function(data){
            if (data['data'].length>=1){

            var selectData=`<option disabled selected value="0">Add Country</option>`;
            var slNo=1;var tableData='';

            data.data.forEach(element => {
                var status=1;    
                status=element.status=='1'?'Active':'Inactive';

                selectData+=`<option value="${element.id}">${element.country}</option>`;

                tableData+=`<tr>
                <td>${slNo}</td>
                <td>${element.id}</td>
                <td>${element.country}</td>
                <td>${element.uid}</td>
                <td>
                  <button type="button" class="Activate btn ${status=="Active"?'btn-success':'btn-secondary'}" id="${"act" + element.uid}">${status}</button>
                  <button type="button" class="btn btn-primary" id=${"edit" + element.uid}">Edit</button>
                  <button type="button" class="btn btn-danger" id=${"del" + element.uid}">Delete</button>
                </td>
              </tr>`
              slNo++;
            });
                $('#countryList').html(selectData);
                $('#countryList').select2({tags: true,selectOnClose: true,width: "100%"});

                $('#tableCountry').DataTable().destroy();
                $('#tableCountry tbody').html(tableData);
            
                $("#tableCountry").DataTable({
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#tableCountry_wrapper .col-md-6:eq(0)');
            
                $('#tableCountry').DataTable().draw();
              

                
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

    


// delete ajax requests
    $(document).on("click",".btn-danger",function(){
        if (confirm("Are you sure to delete?")){
            var btnId=$(this).attr("id");
            var deleteId=btnId.substring(3,btnId.length-1)
            $.ajax({
                url:"/admin/loc_country/delete",
                type:"POST",
                data:{uid:deleteId},
                success:function(data){

                    if(data['data']=='success'){
                        alert("Deleted Successfully")
                        loadCategoryData()
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
            url:"/admin/loc_country/edit",
            type:"POST",
            // dataType : "json",
            data:JSON.stringify({editBtnId}),
            // contentType:false,
            contentType: "application/json; charset=utf-8",
            cache:false,
            processData: false,
            success:function(data){
                if(data){
                    $('#countryIdField').val(data.data[0].id);
                    $("#countryList").val(data.data[0].id).change();

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
    $(document).on("click","#btnEditCountry",function(){
        var countryValue=$("#countryList :selected").text();
        var id=$("#countryIdField").val();

        if(countryValue=='' || id==''){
        alert("Kindly update all the fields!");
        return;
        };

        var dataToSend=new FormData();
        dataToSend.append('textValue',countryValue);
        dataToSend.append('id',id);

        if (confirm("Are you sure to Update?")){
            $.ajax({
                url:"/admin/loc_country/update",
                type:"POST",
                data:dataToSend,
                contentType:false,
                cache:false,
                processData: false,
                success:function(data){

                    if(data['data']=='success'){
                        $("#countryList").val(0);
                        $("#countryIdField").val();
                        loadCategoryData()
                        alert("Data Updated Successfully")
                    }else if (data['data']=='failed'){
                        alert ("Failed while updating or already exist!");
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
            url:"/admin/loc_country/status",
            type:"POST",
            data:{uid:statusId,status:status},
            success:function(data){

                if(data['data']=='success'){
                    loadCategoryData()
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
    $("#btnAddCountry").on('click', function(){
        const countryValue=$("#countryList :selected").text();

        if (countryValue ==''){
            alert("Kindly enter country name!");
            return;
        };

        var dataToSend=new FormData();
        dataToSend.append('countryValue',countryValue)

        $.ajax({
            url:"/admin/loc_country/addNew",
            type:"POST",
            data:dataToSend,
            contentType:false,
            cahce:false,
            processData: false,
            success:function(data){
                if(data['data']=='success'){
                    loadCategoryData();
                    $("#countryList").val(0);
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
