
$(document).ready(()=>{     
    // $('#categoryList').selectize({sortField: 'text',create:true});
    $('#categoryList').select2({tags: true,width: "100%"});
    $('#subcategoryList').select2({width: "100%"});
    loadSubCategoryData();
    

    function loadSubCategoryData(){
    $.ajax({
        url:'/admin/sub_category/view_all',
        type:"GET",
        success: function(data){
            loadCategoryData();         //this function will be called for category doesn't matter if err
            
            if (data['data'].length>=1){
    
            var selectData=`<option disabled selected value="0">Select Sub-Category</option>`;
            var slNo=1;var tableData='';

            data.data.forEach(element => {
                var status=1;    
                status=element.status=='1'?'Active':'Inactive';

                selectData+=`<option value="${element.id}">${element.subcategory}</option>`;

                tableData+=`<tr>
                <td>${slNo}</td>
                <td>${element.id}</td>
                <td>${element.subcategory}</td>
                <td>${element.categoryName}</td>
                <td>${element.uid}</td>
                <td>
                  <button type="button" class="Activate btn ${status=="Active"?'btn-success':'btn-secondary'}" id="${"act" + element.uid}">${status}</button>
                  <button type="button" class="btn btn-primary" id=${"edit" + element.uid}">Edit</button>
                  <button type="button" class="btn btn-danger" id=${"del" + element.uid}">Delete</button>
                </td>
              </tr>`
              slNo++;


            });

                $('#subcategoryList').html(selectData);
                $('#subcategoryList').select2({tags: true,width: "100%"});
                
                $('#tableSubCategory').DataTable().destroy();
                $('#tableSubCategory tbody').html(tableData);
                
                $("#tableSubCategory").DataTable({
                    "responsive": true, "lengthChange": false, "autoWidth": false,
                    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#tableSubCategory_wrapper .col-md-6:eq(0)');

                $('#tableSubCategory').DataTable().draw();

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
            url:"/admin/sub_category/delete",
            type:"POST",
            data:{uid:deleteId},
            success:function(data){

                if(data['data']=='success'){
                    alert("Deleted Successfully")
                    loadSubCategoryData()
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
    url:"/admin/sub_category/edit",
    type:"POST",
    // dataType : "json",
    data:JSON.stringify({editBtnId}),
    // contentType:false,
    contentType: "application/json; charset=utf-8",
    cache:false,
    processData: false,
    success:function(data){
        if(data){

            $('#subCategoryIdField').val(data.data[0].id);
            $("#categoryList").val(data.data[0].categoryId).change();
            $("#subcategoryList").val(data.data[0].id).change();

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
$(document).on("click","#btnEditCategory",function(){
    var id=$("#subCategoryIdField").val();
    var subCategorytextValue=$("#subcategoryList :selected").text();
    var categoryValue=$("#categoryList").val();

    if(categoryValue=='' || subCategorytextValue=='' || id==''){
    alert("Nothing is selected");
    return;
    };

    if (confirm("Are you sure to Update?")){
        $.ajax({
            url:"/admin/sub_category/update",
            type:"POST",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({id:id,subCategorytextValue:subCategorytextValue,categoryValue:categoryValue}),
            success:function(data){

                if(data['data']=='success'){
                    alert("Item Updated Successfully")
                    $("#updateCatText").val('');
                    $("#updateCatId").val('')
                    $("#subCategoryIdField").val();
                    loadSubCategoryData()
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
        url:"/admin/sub_category/status",
        type:"POST",
        data:{uid:statusId,status:status},
        success:function(data){

            if(data['data']=='success'){
                loadSubCategoryData()
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
$("#btnAddSubCategory").on('click', function(){
        const categoryValue=$("#categoryList :selected").val();
        const subcategoryValue=$("#subcategoryList :selected").text();

        // return

        if (categoryValue =='' || categoryValue=='Select Category' || subcategoryValue==''){
            alert("Kindly fill category name");
            return
        };

        $.ajax({
            url:"/admin/sub_category/addNew",
            type:"POST",
            data:{categoryValue:categoryValue,subcategoryValue:subcategoryValue},
            success:function(data){
                if(data['data']=='success'){
                    loadSubCategoryData();
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






function loadCategoryData(){
    $.ajax({
        url:'/admin/category/view_all',
        type:"GET",
        success: function(data){

            if (data['data'].length>=1){

                var selectData=`<option disabled selected value="0">Select Category</option>`;

                data.data.forEach(element => {
                    if (element.status==1){     //if status is active in the category list.
                    var status=1;    
                    status=element.status=='1'?'Active':'Inactive';
    
                    selectData+=`<option value="${element.id}">${element.category}</option>`;
                    };
                });
                $('#categoryList').html(selectData);
                $('#categoryList').select2({width:"100%"});

                
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



function validateImage(element,size){
    // $(document).on('change',element,()=>{
        var name = element.files[0].name;
        var ext = name.split('.').pop().toLowerCase();
        if(jQuery.inArray(ext, ['gif','png','jpg','jpeg']) == -1) 
        {
         alert("Invalid Image File");
         element.value="";
         return;
        }; 
        var oFReader = new FileReader();
        oFReader.readAsDataURL(element.files[0]);
        var f = element.files[0];
        var fsize = f.size||f.fileSize;
        if(fsize > size) //1000000
        {
        alert("Image File Size is very big");
        element.value="";
        return;
        } 
    // });
};