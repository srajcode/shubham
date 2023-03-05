
$(document).ready(()=>{     
    // $('#categoryList').selectize({sortField: 'text',create:true});
    $('#subcategoryList').select2({tags: true,selectOnClose: true});
    $('#updatecategoryList').select2({tags: true,selectOnClose: true});

    loadSubCategoryData();

    function loadSubCategoryData(){
    $.ajax({
        url:'/admin/subcategory/view_all',
        type:"GET",
        success: function(data){
            loadCategoryData();         //this function will be called for category doesn't matter if err
            
            console.log(data);
            if (data['data'].length>=1){
    
            var selectData=`<option disabled selected value="0">Select Sub-Category</option>`;
            var slNo=1;var tableData='';

            data.data.forEach(element => {
                var status=1;    
                status=element.status=='1'?'Active':'Inactive';

                selectData+=`<option value="${element.id}">${element.subcategory}</option>`;

                tableData+=`<tr>
                <th scope="row">${slNo}</th>
                <td>${element.id}</td>
                <td>${element.subcategory}</td>
                <td>${element.categoryName}</td>
                <td>${element.uid}</td>
                <td><a class="btn mybtn ml_15px status ${status}" id="${"act" + element.uid}" href="javascript: void(0)">${status}</a>
                <a class="btn btn-primary ml_15px edit-btn" id=${"edit" + element.uid}" href="javascript: void(0)">Edit</a>
                <a class="btn btn-danger ml_15px delete-btn" id=${"del" + element.uid}" href="javascript: void(0)">Delete</a></td></tr>`;
                slNo++;
            });
                $('#subcategoryList').html(selectData);
                $('#subcategoryList').select2({tags:true,selectOnClose: true});
                
                $('#dataTable').DataTable().destroy();
                $('#dataTable tbody').html(tableData);
                $('#dataTable').DataTable().draw();

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

    

// $(document).ready(()=>{  

// delete ajax requests
$(document).on("click",".delete-btn",function(){
    if (confirm("Are you sure to delete?")){
        var btnId=$(this).attr("id");

        var deleteId=btnId.substring(3,btnId.length-1)
        $.ajax({
            url:"/admin/subcategory/delete",
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
$(document).on("click",".edit-btn",function(){
    
    var btnId=$(this).attr("id");
    var editId=btnId.substring(4,btnId.length-1)
    
    ptext=$(this).parent().siblings()[2].innerText;
    pId=$(this).parent().siblings()[1].innerText;

    var select=$('#updateCatText').val(ptext);
    var select=$('#updateCatId').val(pId);

})



// Update ajax requests
$(document).on("click","#btnEditCategory",function(){
    var textValue=$("#updateCatText").val();
    var id=$("#updateCatId").val();

    if(textValue=='' || id==''){
    alert("Nothing is selected");
    return;
    };

    if (confirm("Are you sure to Update?")){
        $.ajax({
            url:"/admin/subcategory/edit",
            type:"POST",
            data:{id:id,textValue:textValue},
            success:function(data){

                if(data['data']=='success'){
                    alert("Deleted Updated Successfully")
                    $("#updateCatText").val('');
                    $("#updateCatId").val('')
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
$(document).on("click",".status",function(){

var status=0;
status=$(this).hasClass('Inactive')?0:1

    var btnId=$(this).attr("id");
    var statusId=btnId.substring(3,btnId.length)

    $.ajax({
        url:"/admin/subcategory/status",
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
            url:"/admin/subcategory/addNew",
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
                $('#categoryList').select2({tags: true,selectOnClose: true});

                
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